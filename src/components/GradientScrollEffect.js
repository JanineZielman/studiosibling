'use client';
import { useEffect } from 'react';

export default function GradientScrollEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      const center = scrollProgress * 100; // 40–60%
      const spread = 10; // thickness

      document.body.style.background = `
        linear-gradient(
          180deg,
          rgba(213, 237, 247, 1) ${center - spread}%,
          rgba(104, 183, 231, 1) ${center}%,
          rgba(213, 237, 247, 1) ${center + spread}%
        )
      `;
    };

    // Initialize once on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return null;
}
