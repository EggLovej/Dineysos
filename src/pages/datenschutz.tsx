import type { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";

import LegalPage from "@/components/layout/LegalPage";
import { getI18nStaticProps } from "@/lib/getStaticProps";
import styles from "@/styles/Legal.module.css";

type PrivacyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "links"; items: { label: string; href: string }[] }
  | { type: "details"; lines: string[] };

type PrivacySection = {
  title: string;
  blocks: PrivacyBlock[];
};

function renderPrivacyText(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|info@dineysos\.com|www\.edoeb\.admin\.ch|\+41 78 944 90 95)/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      if (part === "info@dineysos.com") {
        return (
          <a key={index} href={`mailto:${part}`}>
            {part}
          </a>
        );
      }
      if (part === "www.edoeb.admin.ch") {
        return (
          <a key={index} href={`https://${part}`}>
            {part}
          </a>
        );
      }
      if (part === "+41 78 944 90 95") {
        return (
          <a key={index} href="tel:+41789449095">
            {part}
          </a>
        );
      }
      return part;
    });
}

export default function PrivacyPage() {
  const { t } = useTranslation("privacy");
  const sections = t("sections", { returnObjects: true }) as PrivacySection[];

  return (
    <LegalPage document="privacy">
      <div className={`${styles.document} ${styles.privacy}`}>
        <p className={styles.introduction}>{renderPrivacyText(t("introduction"))}</p>

        {sections.map((section, sectionIndex) => (
          <section key={section.title} aria-labelledby={`privacy-${sectionIndex + 1}`}>
            <h2 id={`privacy-${sectionIndex + 1}`}>{renderPrivacyText(section.title)}</h2>
            {section.blocks.map((block, blockIndex) => {
              if (block.type === "links") {
                return (
                  <ul key={blockIndex}>
                    {block.items.map((item) => (
                      <li key={item.href}>
                        <a href={item.href}>{item.label}</a>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={blockIndex}>
                    {block.items.map((item) => (
                      <li key={item}>{renderPrivacyText(item)}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "details") {
                return (
                  <div key={blockIndex} className={styles.privacyDetails}>
                    {block.lines.map((line) => (
                      <div key={line}>{renderPrivacyText(line)}</div>
                    ))}
                  </div>
                );
              }
              return <p key={blockIndex}>{renderPrivacyText(block.text)}</p>;
            })}
          </section>
        ))}

        <p className={styles.updated}>{t("updated")}</p>
      </div>
    </LegalPage>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getI18nStaticProps(context, ["common", "privacy"]);
}
