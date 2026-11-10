import React from 'react';
import { Link } from 'react-router-dom';
import PatternWavesBackground from "../Componentes/PatternWaves/PatternWavesBackground";
import './IndexPage.css';

export default function IndexPage() {
  return (
    <main className="index-container">
      <PatternWavesBackground />

      <div className="index-content">
        <div className="index-logo-wrapper">
          <img
            className="index-logo"
            src="/assets/imagenes/FoundifyBlancoRecortada.png"
            alt="Foundify"
          />
        </div>
        <p className="index-tagline">Impulsa tu idea y hazla realidad</p>
        <div className="index-buttons">
          <Link to="/iniciar-sesion" className="btn btn-green">
            Iniciar sesión
          </Link>
          <Link to="/register" className="btn btn-outline">
            Registrarse
          </Link>
        </div>
        <footer className="index-footer">
          Foundify © 2026 · <Link to="/acerca-de" style={{ color: 'inherit', textDecoration: 'underline' }}>Acerca de</Link> · <Link to="/contactanos" style={{ color: 'inherit', textDecoration: 'underline' }}>Contacto</Link>
        </footer>
      </div>
    </main>
  );
}
