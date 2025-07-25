import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getI18nStaticProps(context: GetStaticPropsContext, namespaces = ["common"]) {
  const locale = context.locale || "de";
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
    },
  };
}
