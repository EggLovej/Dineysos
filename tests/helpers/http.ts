import type { NextApiRequest, NextApiResponse } from "next";
import { vi } from "vitest";

/** Minimal NextApiRequest/NextApiResponse pair for handler tests. */
export function mockRequest(
  overrides: { method?: string; body?: unknown; headers?: Record<string, string> } = {}
) {
  const req = {
    method: overrides.method ?? "POST",
    body: overrides.body ?? {},
    headers: overrides.headers ?? {},
    socket: { remoteAddress: "127.0.0.1" },
  } as unknown as NextApiRequest;

  const res = {
    statusCode: 200,
    body: undefined as unknown,
    status: vi.fn(function (this: { statusCode: number }, code: number) {
      this.statusCode = code;
      return this;
    }),
    json: vi.fn(function (this: { body: unknown }, payload: unknown) {
      this.body = payload;
      return this;
    }),
    end: vi.fn(function (this: unknown) {
      return this;
    }),
  };

  return { req, res: res as unknown as NextApiResponse & typeof res };
}
