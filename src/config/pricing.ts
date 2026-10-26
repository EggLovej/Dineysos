// Guide prices shown in the pricing section. Amounts are CHF.
export type Price = { kind: "onRequest" } | { kind: "amount"; amount: number; from?: boolean };

const ON_REQUEST: Price = { kind: "onRequest" };
const chf = (amount: number, from = false): Price => ({ kind: "amount", amount, from });

export const participants = [
  { key: "pricing.table.sGroup", label: "4–7", basePrice: chf(70) },
  { key: "pricing.table.mGroup", label: "8–15", basePrice: chf(50) },
  { key: "pricing.table.lGroup", label: "16–30", basePrice: chf(35) },
  { key: "pricing.table.xlGroup", label: "31+", basePrice: ON_REQUEST },
];

export const pricingData: {
  labelKey: string;
  descriptionKey?: string;
  prices: Price[];
  per?: string;
}[] = [
  {
    labelKey: "pricing.table.basePrice",
    descriptionKey: "pricing.table.basePriceDescription",
    prices: participants.map((p) => p.basePrice),
    per: "pricing.table.perPerson",
  },
  {
    labelKey: "pricing.table.winePairing",
    descriptionKey: "pricing.table.winePairingDescription",
    prices: participants.map(() => chf(35, true)),
    per: "pricing.table.perPerson",
  },
  {
    labelKey: "pricing.table.food",
    descriptionKey: "pricing.table.foodDescription",
    prices: participants.map(() => ON_REQUEST),
  },
  {
    labelKey: "pricing.table.venue",
    prices: participants.map(() => ON_REQUEST),
  },
  {
    labelKey: "pricing.table.extension",
    descriptionKey: "pricing.table.extensionDescription",
    prices: participants.map(() => chf(90)),
    per: "pricing.table.perHour",
  },
];
