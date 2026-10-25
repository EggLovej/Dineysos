import { vi } from "vitest";

// Shared mocks for the third-party clients the API routes talk to. Each test file
// calls `vi.mock(...)` with these factories so no network, database or email is touched.

export const sentryMock = {
  wrapApiHandlerWithSentry: <T>(handler: T) => handler,
  captureException: vi.fn(),
  logger: { info: vi.fn(), error: vi.fn() },
};

export const resendSend = vi.fn();

export const supabaseState = {
  insertResult: { data: { id: 42 } as { id: number } | null, error: null as unknown },
  updateResult: { error: null as unknown },
  inserts: [] as unknown[],
  updates: [] as unknown[],
};

export function resetSupabase() {
  supabaseState.insertResult = { data: { id: 42 }, error: null };
  supabaseState.updateResult = { error: null };
  supabaseState.inserts = [];
  supabaseState.updates = [];
}

export const supabaseMock = {
  from: () => ({
    insert: (rows: unknown[]) => {
      supabaseState.inserts.push(rows[0]);
      const result = Promise.resolve(supabaseState.insertResult);
      return Object.assign(result, {
        select: () => ({ single: () => Promise.resolve(supabaseState.insertResult) }),
      });
    },
    update: (values: unknown) => ({
      eq: () => {
        supabaseState.updates.push(values);
        return Promise.resolve(supabaseState.updateResult);
      },
    }),
  }),
};
