'use client';

import { useEffect } from 'react';

export default function FaviconHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateFavicon = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const faviconPath = isDark ? '/logos/delta-logo2.png' : '/logos/delta-logo.png';
      
      // Atualiza ou cria o link do favicon
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        document.head.appendChild(link);
      }
      
      // Só atualiza se for diferente (evita flicker)
      if (!link.href.includes(faviconPath)) {
        link.href = faviconPath + '?v=' + Date.now();
      }
    };

    // Atualiza inicialmente
    updateFavicon();

    // Observa mudanças no tema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateFavicon);

    return () => mediaQuery.removeEventListener('change', updateFavicon);
  }, []);

  return null;
}
