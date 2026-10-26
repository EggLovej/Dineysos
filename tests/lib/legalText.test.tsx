import { describe, expect, it } from "vitest";

import { renderPrivacyText } from "@/lib/legalText";

function render(parts: ReturnType<typeof renderPrivacyText>) {
  return parts
    .map((part) => {
      if (typeof part === "string") return part;
      const tag = part.type as string;
      const href = part.props.href ? ` href=${part.props.href}` : "";
      return `<${tag}${href}>${part.props.children}</${tag}>`;
    })
    .join("");
}

describe("renderPrivacyText", () => {
  it("renders bold and italic markup", () => {
    expect(render(renderPrivacyText("Use **care** and *judgement*."))).toBe(
      "Use <strong>care</strong> and <em>judgement</em>."
    );
  });

  it("links the contact email, the regulator domain and the phone number", () => {
    expect(
      render(
        renderPrivacyText("Mail info@dineysos.com, see www.edoeb.admin.ch, call +41 78 944 90 95.")
      )
    ).toBe(
      "Mail <a href=mailto:info@dineysos.com>info@dineysos.com</a>, see <a href=https://www.edoeb.admin.ch>www.edoeb.admin.ch</a>, call <a href=tel:+41789449095>+41 78 944 90 95</a>."
    );
  });

  it("returns plain text unchanged", () => {
    expect(render(renderPrivacyText("Nothing special here"))).toBe("Nothing special here");
  });
});
