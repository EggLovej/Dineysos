import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "..");
const namespaces = ["common", "imprint", "privacy", "terms"];

function flatKeys(value: unknown, prefix = ""): string[] {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([k, v]) => flatKeys(v, `${prefix}${k}.`));
  }
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => flatKeys(v, `${prefix}${i}.`));
  }
  return [prefix.slice(0, -1)];
}

function loadKeys(locale: string, ns: string) {
  const file = path.join(root, "public/locales", locale, `${ns}.json`);
  return new Set(flatKeys(JSON.parse(fs.readFileSync(file, "utf8"))));
}

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

describe("translations", () => {
  it.each(namespaces)("%s has identical keys in de and en", (ns) => {
    const de = loadKeys("de", ns);
    const en = loadKeys("en", ns);
    expect(
      [...de].filter((k) => !en.has(k)),
      "only in de"
    ).toEqual([]);
    expect(
      [...en].filter((k) => !de.has(k)),
      "only in en"
    ).toEqual([]);
  });

  it('every literal t("...") key in src/ exists in the common namespace', () => {
    const common = loadKeys("en", "common");
    // Pages using another namespace pass it to useTranslation; their keys live elsewhere.
    const otherNamespaces = /useTranslation\("(imprint|privacy|terms)"\)/;
    const missing: string[] = [];

    for (const file of sourceFiles(path.join(root, "src"))) {
      const source = fs.readFileSync(file, "utf8");
      if (otherNamespaces.test(source)) continue;
      for (const match of source.matchAll(/\bt\(\s*"([^"$`]+)"/g)) {
        if (!common.has(match[1])) missing.push(`${path.relative(root, file)}: ${match[1]}`);
      }
    }

    expect(missing).toEqual([]);
  });
});
