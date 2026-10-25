import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mockRequest } from "../helpers/http";
import {
  resendSend,
  resetSupabase,
  sentryMock,
  supabaseMock,
  supabaseState,
} from "../helpers/mocks";

vi.mock("@sentry/nextjs", () => sentryMock);
vi.mock("@/lib/supabaseClient", () => ({ supabase: supabaseMock }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: resendSend };
  },
}));
vi.mock("fs", () => ({ default: { readFileSync: () => Buffer.from("%PDF-test") } }));

const { default: handler } = await import("@/pages/api/requestBrochure");

const validBody = { email: "Guest@Example.com ", language: "de", turnstileToken: "tok" };

function mockTurnstile(success: boolean, ok = true) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok, json: async () => ({ success }) }))
  );
}

describe("POST /api/requestBrochure", () => {
  beforeEach(() => {
    resetSupabase();
    resendSend.mockReset().mockResolvedValue({ data: { id: "email-1" }, error: null });
    sentryMock.captureException.mockReset();
    mockTurnstile(true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects non-POST requests", async () => {
    const { req, res } = mockRequest({ method: "GET" });
    await handler(req, res);
    expect(res.statusCode).toBe(405);
    expect(res.end).toHaveBeenCalled();
  });

  it("pretends success when the honeypot field is filled and stores nothing", async () => {
    const { req, res } = mockRequest({ body: { ...validBody, website: "spam" } });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });
    expect(supabaseState.inserts).toHaveLength(0);
    expect(resendSend).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects an invalid email before verifying Turnstile", async () => {
    const { req, res } = mockRequest({ body: { ...validBody, email: "not-an-email" } });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects a missing Turnstile token without calling Cloudflare", async () => {
    const { req, res } = mockRequest({ body: { ...validBody, turnstileToken: "" } });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Verification failed" });
    expect(fetch).not.toHaveBeenCalled();
    expect(supabaseState.inserts).toHaveLength(0);
  });

  it("rejects when Turnstile says the token is invalid", async () => {
    mockTurnstile(false);
    const { req, res } = mockRequest({ body: validBody });
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(supabaseState.inserts).toHaveLength(0);
  });

  it("returns 500 when Turnstile itself is unreachable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("network down");
      })
    );
    const { req, res } = mockRequest({ body: validBody });
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Verification unavailable" });
    expect(sentryMock.captureException).toHaveBeenCalledTimes(1);
  });

  it("returns 500 and stores nothing when Supabase rejects the insert", async () => {
    supabaseState.insertResult = { data: null, error: { message: "db down", code: "XX000" } };
    const { req, res } = mockRequest({ body: validBody });
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(resendSend).not.toHaveBeenCalled();
    expect(sentryMock.captureException).toHaveBeenCalledTimes(1);
  });

  it("keeps the lead, emails the admin a failure notice and returns 500 when Resend fails", async () => {
    resendSend
      .mockRejectedValueOnce(new Error("Resend quota exceeded"))
      .mockResolvedValueOnce({ data: { id: "notice" }, error: null });
    const { req, res } = mockRequest({ body: validBody });
    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Failed to send brochure" });
    expect(supabaseState.inserts).toHaveLength(1);
    expect(supabaseState.updates).toHaveLength(0);
    expect(resendSend).toHaveBeenCalledTimes(2);
    const failureMail = resendSend.mock.calls[1][0];
    expect(failureMail.to).toBe("admin@test.invalid");
    expect(failureMail.subject).toMatch(/FAILED/);
    expect(failureMail.html).toContain("guest@example.com");
    expect(failureMail.html).toContain("Resend quota exceeded");
    expect(sentryMock.captureException).toHaveBeenCalledTimes(1);
  });

  it("stores the lead, sends the brochure, marks it sent and notifies the admin", async () => {
    const { req, res } = mockRequest({
      body: { ...validBody, wantsUpdates: true },
      headers: { "x-forwarded-for": "203.0.113.9, 10.0.0.1" },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true });

    // Turnstile was asked with the secret, the token and the client IP.
    const turnstileBody = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][1]
      .body as URLSearchParams;
    expect(turnstileBody.get("secret")).toBe("turnstile-test-secret");
    expect(turnstileBody.get("response")).toBe("tok");
    expect(turnstileBody.get("remoteip")).toBe("203.0.113.9");

    // Lead row: normalised email, explicit opt-in, language, not yet sent.
    expect(supabaseState.inserts[0]).toMatchObject({
      email: "guest@example.com",
      wantsUpdates: true,
      sentBrochure: false,
      language: "de",
    });
    expect(supabaseState.updates[0]).toMatchObject({ sentBrochure: true });

    // Brochure to the visitor, then the success notice to the admin.
    expect(resendSend).toHaveBeenCalledTimes(2);
    expect(resendSend.mock.calls[0][0]).toMatchObject({
      to: "guest@example.com",
      subject: "Ihre Dineysos Broschüre",
    });
    expect(resendSend.mock.calls[0][0].attachments[0].filename).toBe("DineysosBrochure.pdf");
    expect(resendSend.mock.calls[1][0]).toMatchObject({ to: "admin@test.invalid" });
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it("treats a missing wantsUpdates flag as opt-out", async () => {
    const { req, res } = mockRequest({ body: validBody });
    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(supabaseState.inserts[0]).toMatchObject({ wantsUpdates: false });
  });
});
