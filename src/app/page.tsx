import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Page() {
  const client = createClient();
  const page = await client.getByUID("page", "home").catch(() => notFound());
  const works = await client.getAllByType('work')

  return (
    <div className="home">
      <div className="works">
        {works.map((item,i ) => {
          return(
            <div className="work">
              <PrismicNextImage field={item.data.image}/>
              <div className="hover">
                <PrismicNextImage field={item.data.hover_image}/>
              </div>
            </div>
          )
        })}
         {works.map((item,i ) => {
          return(
            <div className="work">
              <PrismicNextImage field={item.data.image}/>
              <div className="hover">
                <PrismicNextImage field={item.data.hover_image}/>
              </div>
            </div>
          )
        })}
      </div>
      <div className="agenda-button">
        agenda
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  )
}
