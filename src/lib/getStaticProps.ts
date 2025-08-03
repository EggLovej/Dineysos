import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getI18nStaticProps(context: GetStaticPropsContext, namespaces = ["common"]) {
  const locale = context.locale || "de";
  const i18nProps = await serverSideTranslations(locale, namespaces);
  return { props: { ...i18nProps } };
}
