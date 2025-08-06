import "./globals.scss";

import { asText } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  return (

      <div className="menu">
        <PrismicNextLink
          href="/"
          className="site-title"
        >
          <h1><PrismicText field={settings.data.siteTitle} /></h1>
        </PrismicNextLink>
        <nav>
          {navigation.data?.links.map((item) => (
            <PrismicNextLink field={item.link} key={asText(item.label)}>
              <PrismicText field={item.label} />
            </PrismicNextLink>
          ))}
        </nav>
      </div>

  );
}
