import { describe, expect, it } from "vitest";

import { participants, pricingData } from "@/config/pricing";

describe("pricing data", () => {
  it("has one price per participant group in every row", () => {
    for (const row of pricingData) {
      expect(row.prices, row.labelKey).toHaveLength(participants.length);
    }
  });

  it("only uses translation keys under pricing.table", () => {
    const keys = [
      ...participants.map((p) => p.key),
      ...pricingData.flatMap((row) => [row.labelKey, row.descriptionKey, row.per]),
    ].filter((key): key is string => typeof key === "string");
    for (const key of keys) {
      expect(key).toMatch(/^pricing\.table\./);
    }
  });

  it("marks only the wine pairing as a from-price", () => {
    for (const row of pricingData) {
      for (const price of row.prices) {
        if (price.kind === "amount" && price.from) {
          expect(row.labelKey).toBe("pricing.table.winePairing");
        }
      }
    }
  });
});
