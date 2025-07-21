import "@/styles/globals.css";
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Layout from "@/components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);