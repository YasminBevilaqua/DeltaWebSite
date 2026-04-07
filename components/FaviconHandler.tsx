'use client';

import { useEffect } from 'react';

export default function FaviconHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateFavicon = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // CONTRASTE: modo claro do navegador -> ícone escuro (delta-logo.png)
      //            modo escuro do navegador -> ícone claro (delta-logo2.png)
      const faviconPath = isDark ? '/logos/delta-logo2.png' : '/logos/delta-logo.png';
      
      // Atualiza o favicon existente ou cria um novo
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        document.head.appendChild(link);
      }
      
      // Adiciona timestamp para evitar cache
      link.href = faviconPath + '?v=' + Date.now();
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
