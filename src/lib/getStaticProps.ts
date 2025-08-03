import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import nextI18NextConfig from "../../next-i18next.config.js";

export async function getI18nStaticProps(context: GetStaticPropsContext, namespaces = ["common"]) {
  const locale = context.locale || "de";
  const i18nProps = await serverSideTranslations(locale, namespaces, nextI18NextConfig);
  return { props: { ...i18nProps } };
}
