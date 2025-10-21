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

  const works = await client.getAllByType("work");
  const coachings = await client.getAllByType("coaching");

  // Merge arrays and tag type so you know which is which later
  const allItems = [
    ...works.map((doc) => ({ ...doc, type: "work" })),
    ...coachings.map((doc) => ({ ...doc, type: "coaching" })),
  ];

  // Sort descending by date (newest first)
  const sortedItems = allItems.sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });
  

  return (
    <div className="home">
      <div className="works">
        {sortedItems.map((item, i) => {
          if (item.type === "work") {
            return (
              item.data.image.url &&
              <a href={`/work/${item.uid}`} className="work" key={i}>
                <PrismicNextImage field={item.data.image} />
                <div className="hover">
                  <PrismicNextImage field={item.data.hover_image} />
                </div>
              </a>
            );
          } else {
            return (
              item.data.image.url &&
              <a href={`/coaching/${item.uid}`} className="work" key={i}>
                <PrismicNextImage field={item.data.image} />
                <div className="hover">
                  <PrismicNextImage field={item.data.hover_image} />
                </div>
              </a>
            );
          }
        })}
      </div>

      <Link href="/agenda" className="agenda-button">
        agenda
      </Link>

      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}

