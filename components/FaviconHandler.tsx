'use client';

import { useEffect, useState, useCallback } from 'react';

function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function FaviconHandler() {
  const [mounted, setMounted] = useState(false);

  const updateFavicon = useCallback((isBrowserDark: boolean) => {
    if (typeof window === 'undefined') return;
    
    // Remove favicons antigos
    document.querySelectorAll("link[rel*='icon']").forEach(f => f.remove());
    
    // CONTRASTE INVERTIDO:
    // Navegador escuro -> delta-logo2.png (imagem CLARA)
    // Navegador claro -> delta-logo.png (imagem ESCURA)
    const faviconPath = isBrowserDark ? '/logos/delta-logo2.png' : '/logos/delta-logo.png';
    const uniqueUrl = faviconPath + '?v=' + Date.now();
    
    // Cria favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = uniqueUrl;
    document.head.appendChild(favicon);
    
    // Pré-carrega imagem
    const img = new Image();
    img.src = uniqueUrl;
    
    console.log('[FaviconHandler] Navegador:', isBrowserDark ? 'escuro' : 'claro', '| Ícone:', faviconPath);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const initialIsDark = isDarkMode();
    updateFavicon(initialIsDark);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      updateFavicon(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, updateFavicon]);

  return null;
}


