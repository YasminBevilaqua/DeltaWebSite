'use client';

import { useEffect } from 'react';

export default function LoadingScreen() {
  useEffect(() => {
    const initialLoading = document.getElementById('initial-loading-screen');
    if (!initialLoading) return;

    let isHidden = false;

    const hideLoading = () => {
      if (isHidden) return;
      isHidden = true;
      
      initialLoading.classList.add('fade-out');
      
      setTimeout(() => {
        initialLoading.style.display = 'none';
      }, 500);
    };

    // Sempre aguarda 1.5s mínimo para garantir que tudo carregou
    const minTimer = setTimeout(() => {
      hideLoading();
    }, 1500);

    // Timeout de segurança (máximo 5 segundos)
    const safetyTimeout = setTimeout(() => {
      if (!isHidden) {
        hideLoading();
      }
    }, 5000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return null;
}
