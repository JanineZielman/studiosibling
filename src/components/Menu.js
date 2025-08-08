'use client';

import { useState } from 'react';
import { asText } from '@prismicio/client';
import { PrismicText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';

export default function Menu({ navigation, works, coachings }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <nav className="menu-nav">
      {navigation?.data?.links.map((item) => {
        const label = asText(item.label).toLowerCase();
        const hasSubmenu = label === 'works' || label === 'coachings';
        const submenuItems = label === 'works' ? works : label === 'coachings' ? coachings : [];

        return (
          <div key={label} className="menu-item">

            {hasSubmenu && (
              <a
                className="main-link"
                onClick={() => hasSubmenu ? toggleSubmenu(label) : null}
              >
                <PrismicText field={item.label} />
              </a>
            )}

            {!hasSubmenu && (
              <PrismicNextLink field={item.link} className="main-link-standalone">
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
