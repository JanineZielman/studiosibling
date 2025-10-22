import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";


export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: 'Agenda',
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

function formatDutchDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export default async function Page() {
  const client = createClient();
  const agenda = await client.getAllByType('agenda');

  console.log(agenda)

  const now = new Date();

  const upcomingAgenda = agenda
    .filter(item => new Date(item.data.date) >= now)
    .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));

  const pastAgenda = agenda
    .filter(item => new Date(item.data.date) < now)
    .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return (
    <div className="page">
      <div className="agenda">
        <h2>upcoming</h2>
        {upcomingAgenda.length === 0 ? (
          <p>No upcoming events.</p>
        ) : (
          upcomingAgenda.map((item, i) => (
            item.data.link.text ?
              <PrismicNextLink field={item.data.link}>
                <div key={i} className="agenda-item">
                  <div className="date">{formatDutchDate(item.data.date)}</div>
                  <div>{item.data.title}</div>
                </div>
              </PrismicNextLink>
              :
              <div key={i} className="agenda-item">
                <div className="date">{formatDutchDate(item.data.date)}</div>
                <div>{item.data.title}</div>
              </div>
          ))
        )}

        <h2>past</h2>
        {pastAgenda.length === 0 ? (
          <p>No past events.</p>
        ) : (
          pastAgenda.map((item, i) => (
            item.data.link.text ?
              <PrismicNextLink field={item.data.link}>
                <div key={i} className="agenda-item">
                    <div className="date">{formatDutchDate(item.data.date)}</div>
                    <div>{item.data.title}</div>
                </div>
              </PrismicNextLink>
            :
            <div key={i} className="agenda-item">
                <div className="date">{formatDutchDate(item.data.date)}</div>
                <div>{item.data.title}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
