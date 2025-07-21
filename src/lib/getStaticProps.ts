import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';

export async function getI18nStaticProps(context: GetStaticPropsContext, namespaces = ['common']) {
  const locale = context.locale || 'de';
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces)),
    },
  };
}