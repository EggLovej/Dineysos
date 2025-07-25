import { GetStaticPropsContext } from "next";

import SeoHead from "@/components/layout/Head";
import About from "@/components/sections/About";
import Brochure from "@/components/sections/Brochure";
import Concepts from "@/components/sections/Concept";
import Contact from "@/components/sections/Contact";
import Format from "@/components/sections/Format";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import { seoConfig } from "@/config/seo";
import { fetchGalleryImages } from "@/lib/api";
import { getI18nStaticProps } from "@/lib/getStaticProps";
import { GalleryImage } from "@/types/galleryImage";

export async function getStaticProps(context: GetStaticPropsContext) {
  const images = await fetchGalleryImages();
  const i18nProps = await getI18nStaticProps(context);

  return {
    props: {
      ...i18nProps.props,
      images,
    },
  };
}

export default function Home({ images }: { images: GalleryImage[] }) {
  return (
    <>
      <SeoHead description={seoConfig.home.description} title={seoConfig.home.title} />
      <Hero />
      <About />
      <Concepts />
      <Format />
      <Pricing />
      <Gallery images={images} />
      <Brochure />
      <Contact />
    </>
  );
}
