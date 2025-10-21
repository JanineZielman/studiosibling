'use client';

import { useState } from 'react';
import { asText } from '@prismicio/client';
import { PrismicText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';

export default function Menu({ navigation, works, coachings }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const sortByDateDesc = (items) =>
    [...items].sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    });

  const sortedWorks = sortByDateDesc(works);
  const sortedCoachings = sortByDateDesc(coachings);

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <nav className="menu-nav">
      {navigation?.data?.links.map((item) => {
        const label = asText(item.label).toLowerCase();
        const hasSubmenu = label === 'works' || label === 'coachings';
        const submenuItems =
          label === 'works'
            ? sortedWorks
            : label === 'coachings'
            ? sortedCoachings
            : [];

        return (
          <div key={label} className="menu-item">
            {hasSubmenu ? (
              <a
                className="main-link"
                onClick={() => toggleSubmenu(label)}
              >
                <PrismicText field={item.label} />
              </a>
            ) : (
              <PrismicNextLink
                field={item.link}
                className="main-link-standalone"
              >
                <PrismicText field={item.label} />
              </PrismicNextLink>
            )}

            {hasSubmenu && openSubmenu === label && submenuItems.length > 0 && (
              <div className="submenu">
                {submenuItems.map((sub) => (
                  <PrismicNextLink
                    key={sub.id}
                    href={`/${sub.type}/${sub.uid}`}
                    className="submenu-link"
                  >
                    {sub.data.title}
                  </PrismicNextLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
