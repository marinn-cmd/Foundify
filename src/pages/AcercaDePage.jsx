import React from 'react';
import { Link } from 'react-router-dom';
import PatternWavesBackground from '../Componentes/PatternWaves/PatternWavesBackground';
import './AcercaDePage.css';

export default function AcercaDePage() {
  return (
    <div className="acerca-page">
      <PatternWavesBackground />

      <header>
        <nav className="acerca-nav">
          <div className="logo">
            <Link to="/">Found<span>ify</span></Link>
          </div>
          <ul className="menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/acerca-de">Acerca de</Link></li>
            <li><Link to="/contactanos">Contacto</Link></li>
          </ul>
          <div className="perfil">
            <img
              src="https://i.pravatar.cc/100?img=32"
              alt="Perfil"
              style={{ width: 38, height: 38, borderRadius: '50%' }}
            />
          </div>
        </nav>
      </header>

      <main>
        <section className="acerca-hero">
          <div className="acerca-hero-text">
            <span className="hero-label">Nuestra historia</span>
            <h1>Donde las ideas encuentran apoyo</h1>
            <p>
              Foundify es una plataforma que impulsa proyectos innovadores y conecta
              emprendedores con personas dispuestas a apoyarlos.
            </p>
          </div>
          <div className="acerca-hero-img">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"
              alt="Equipo trabajando en un proyecto"
            />
          </div>
        </section>

        <section className="acerca-section">
          <h2>¿Quiénes somos?</h2>
          <p style={{ color: '#94a3b8', marginTop: '0.75rem', maxWidth: 800 }}>
            Foundify nace para acercar recursos, visibilidad y comunidad a emprendedores
            que quieren transformar una idea en un proyecto real. Juntamos talento,
            colaboradores y apoyo en una experiencia digital amigable.
          </p>

          <div className="acerca-grid-3">
            <article className="acerca-card">
              <h3>Visión</h3>
              <p>Ser el espacio de referencia en el que cada emprendimiento encuentra el impulso correcto.</p>
            </article>
            <article className="acerca-card">
              <h3>Misión</h3>
              <p>Facilitar el encuentro entre creadores y apoyos, con herramientas que hagan más simple el lanzamiento de proyectos.</p>
            </article>
            <article className="acerca-card">
              <h3>Valores</h3>
              <p>Transparencia, colaboración, innovación y crecimiento conjunto son la base de cada paso que damos.</p>
            </article>
          </div>
        </section>

        <section className="acerca-section">
          <h2>Lo que logramos</h2>
          <div className="acerca-stats">
            <div className="stat-card">
              <strong>120+</strong>
              <span>Proyectos apoyados</span>
            </div>
            <div className="stat-card">
              <strong>35K+</strong>
              <span>Miembros activos</span>
            </div>
            <div className="stat-card">
              <strong>98%</strong>
              <span>Satisfacción de emprendedores</span>
            </div>
          </div>
        </section>

        <section className="acerca-section">
          <div className="acerca-cta">
            <div>
              <h2>Únete a Foundify hoy</h2>
              <p>Impulsa tus proyectos, encuentra aliados y haz crecer tu comunidad con nuestra plataforma.</p>
            </div>
            <Link to="/register" className="btn-cta">
              Comenzar ahora
            </Link>
          </div>
        </section>
      </main>

      <footer className="acerca-footer">
        <div className="acerca-footer-content">
          <div style={{ maxWidth: 450 }}>
            <h3 style={{ marginBottom: '0.75rem', color: '#fff' }}>Foundify</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Foundify es una plataforma dedicada a conectar a creadores de proyectos con personas
              interesadas en apoyarlos. Nuestra misión es fomentar la innovación y el emprendimiento.
            </p>
          </div>
          <div className="acerca-footer-links">
            <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Enlaces</h4>
            <Link to="/">Inicio</Link>
            <Link to="/acerca-de">Acerca de</Link>
            <Link to="/contactanos">Contacto</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
          &copy; 2026 Foundify. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

