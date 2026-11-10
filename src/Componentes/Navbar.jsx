import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Ocultar la barra en la pantalla principal de bienvenida y autenticación
  const paginasSinNav = ['/', '/index', '/iniciar-sesion', '/login', '/register', '/registro', '/restablecer'];
  if (paginasSinNav.includes(location.pathname.toLowerCase())) {
    return null;
  }

  const esActivo = (ruta) => location.pathname === ruta;

  const estiloLink = (ruta) => ({
    color: esActivo(ruta) ? '#00e676' : '#cbd5e1',
    textDecoration: 'none',
    fontWeight: esActivo(ruta) ? '700' : '500',
    fontSize: '0.95rem',
    padding: '6px 12px',
    borderRadius: '6px',
    backgroundColor: esActivo(ruta) ? 'rgba(0, 230, 118, 0.1)' : 'transparent',
    transition: 'all 0.2s ease'
  });

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: '#0d1117',
        borderBottom: '1px solid #21262d',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '8px' }}>
          <img
            src="/assets/imagenes/FoundifyBlancoRecortada.png"
            alt="Foundify"
            style={{ height: '28px', width: 'auto' }}
          />
        </Link>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link to="/proyectos" style={estiloLink('/proyectos')}>
            Proyectos
          </Link>
          <Link to="/comunidad" style={estiloLink('/comunidad')}>
            Comunidad
          </Link>
          <Link to="/acerca-de" style={estiloLink('/acerca-de')}>
            Acerca de
          </Link>
          <Link to="/contactanos" style={estiloLink('/contactanos')}>
            Contacto
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link
          to="/publicar"
          style={{
            backgroundColor: '#00e676',
            color: '#08090b',
            textDecoration: 'none',
            padding: '7px 16px',
            borderRadius: '6px',
            fontWeight: '700',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>+</span> Publicar
        </Link>
        <Link to="/editar-perfil" style={estiloLink('/editar-perfil')} title="Editar Perfil">
          👤 Perfil
        </Link>
        <Link to="/configuracion" style={estiloLink('/configuracion')} title="Configuración">
          ⚙️
        </Link>
        <Link
          to="/"
          style={{
            color: '#ef4444',
            textDecoration: 'none',
            fontSize: '0.85rem',
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}
          title="Cerrar Sesión / Volver a Bienvenida"
        >
          Salir
        </Link>
      </div>
    </nav>
  );
}

