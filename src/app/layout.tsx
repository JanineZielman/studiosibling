import "./globals.scss";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/qbn0cgq.css"></link>
      </head>
      <body className="overflow-x-hidden antialiased">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

import Menu from "@/components/Menu";

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");
  const works = await client.getAllByType("work");
  const coachings = await client.getAllByType("coaching");

  return (
    <div className="menu">
      <PrismicNextLink href="/" className="site-title">
        <h1>
          <PrismicText field={settings.data.siteTitle} />
        </h1>
      </PrismicNextLink>
      <Menu navigation={navigation} works={works} coachings={coachings} />
    </div>
  );
}
