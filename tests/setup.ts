import { vi } from "vitest";

// Environment the API routes read at import time.
vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-test-key");
vi.stubEnv("RESEND_API_KEY", "re_test");
vi.stubEnv("ADMIN_EMAIL", "admin@test.invalid");
vi.stubEnv("TURNSTILE_SECRET_KEY", "turnstile-test-secret");

// The log helper writes JSON lines; keep test output readable.
vi.spyOn(console, "info").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});
