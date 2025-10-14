import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import SliderComp from "@/components/SliderComp"

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("work", uid).catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("work", uid).catch(() => notFound());

  return (
    <div className="page">
      <div  className="image-section">
        {page.data.hero_images.length > 0 ?
          <SliderComp items={page.data.hero_images}/>
        :
          <PrismicNextImage field={page.data.hero_image}/>
        }
        
        <PrismicRichText field={page.data.hero_image_caption}/>
      </div>
      <div className="text-block">
        <h2>{page.data.title}</h2>
        <p className="subtitle">{page.data.subtitle}</p>
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  )
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("work");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
