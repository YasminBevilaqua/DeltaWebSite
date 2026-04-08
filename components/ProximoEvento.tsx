'use client';

import { useState, useEffect } from 'react';

export default function ProximoEvento() {
  const [visivel, setVisivel] = useState(false);
  const [ampliada, setAmpliada] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisivel(true);
    }, 1000);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const abrirModal = () => setAmpliada(true);
  const fecharModal = () => setAmpliada(false);

  return (
    <>
      <div style={{ display: 'contents' }}>
        <div 
          style={{
            position: 'absolute',
            top: '80px',
            right: '16px',
            zIndex: 50,
            width: isMobile ? 'auto' : '220px',
            opacity: visivel ? 1 : 0,
            pointerEvents: visivel ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {!isMobile && (
            <>
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: 'white', 
                marginBottom: '8px', 
                textTransform: 'uppercase',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                Próximo Evento:
              </h3>
              <div className="magic-card" onClick={abrirModal} style={{ cursor: 'pointer' }}>
                <img
                  src="/eventos/proximo-evento.jpg"
                  alt="Próximo Evento"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '6px', display: 'block', position: 'relative', zIndex: 1 }}
                />
              </div>
            </>
          )}
          {isMobile && (
            <div 
              className="magic-card-mobile"
              onClick={abrirModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                padding: '8px 10px',
                borderRadius: '8px',
                position: 'relative',
                width: 'fit-content',
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ animation: 'bellShake 1.5s ease-in-out infinite', flexShrink: 0 }}
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              <span style={{ 
                color: 'white', 
                fontSize: '10px', 
                fontWeight: 'bold',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px'
              }}>
                Próximos Eventos
              </span>
            </div>
          )}
        </div>
      </div>

      {ampliada && (
        <div 
          onClick={fecharModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <button
            onClick={fecharModal}
            style={{
              position: 'absolute',
              top: '60px',
              right: '20px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '32px',
              cursor: 'pointer',
              zIndex: 100000,
              padding: '10px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <img
            src="/eventos/proximo-evento.jpg"
            alt="Próximo Evento"
            style={{ 
              maxWidth: '90%', 
              maxHeight: '90%', 
              objectFit: 'contain',
              borderRadius: '8px',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
