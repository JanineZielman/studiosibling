import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

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
  const page = await client.getSingle("homepage").catch(() => notFound());
  const works = await client.getAllByType('work')

  return (
    <div className="home">
      <div className="works">
        {works.map((item,i ) => {
          return(
            <a href={`/work/${item.uid}`} className="work" key={`work${i}`}>
              <PrismicNextImage field={item.data.image}/>
              <div className="hover">
                <PrismicNextImage field={item.data.hover_image}/>
              </div>
            </a>
          )
        })}
         {works.map((item,i ) => {
          return(
            <a href={`/work/${item.uid}`} className="work" key={`work2${i}`}>
              <PrismicNextImage field={item.data.image}/>
              <div className="hover">
                <PrismicNextImage field={item.data.hover_image}/>
              </div>
            </a>
          )
        })}
      </div>
      <Link href="/agenda" className="agenda-button">
        agenda
      </Link>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  )
}
