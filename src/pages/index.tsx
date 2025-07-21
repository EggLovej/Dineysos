// pages/index.tsx

import { GetStaticPropsContext } from 'next';
import { getI18nStaticProps } from '@/lib/getStaticProps';
import SeoHead from "@/components/layout/Head";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Concepts from "@/components/sections/Concept";
import Format from "@/components/sections/Format";
import Pricing from "@/components/sections/Pricing";
import Brochure from "@/components/sections/Brochure";
import Contact from "@/components/sections/Contact";
import Gallery from "@/components/sections/Gallery"
import { fetchGalleryImages } from "@/lib/api";
import { GalleryImage } from "@/types/galleryImage";

export async function getStaticProps(context: GetStaticPropsContext) {
  const images = await fetchGalleryImages();
  const i18nProps = await getI18nStaticProps(context);

  return {
    props: {
      ...i18nProps.props,
      images,
    }
  };
}

export default function Home({ images }: { images: GalleryImage[] }) {
  return (
    <>
      <SeoHead />
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