import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatternWavesBackground from '../Componentes/PatternWaves/PatternWavesBackground';
import './RegisterPage.css';

export default function RestablecerPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <main className="auth-page">
      <PatternWavesBackground />

      <header className="auth-brand">
        <Link to="/">
          <img
            className="auth-logo"
            src="/assets/imagenes/FoundifyBlancoRecortada.png"
            alt="Foundify"
          />
        </Link>
        <p className="auth-tagline">Conoce más proyectos e impulsa tus ideas</p>
      </header>

      <section className="auth-card" style={{ maxWidth: 460 }}>
        <h1 className="auth-title">Restablecer Contraseña</h1>
        <p className="auth-subtitle">
          Ingresa tu correo electrónico para recibir un enlace de recuperación.
        </p>

        {submitted ? (
          <div className="alert-message alert-success">
            Si este correo existe en nuestro sistema, recibirás un enlace de recuperación en los próximos minutos.
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="auth-label" htmlFor="reset-email">Correo electrónico</label>
              <input
                className="auth-input"
                type="email"
                id="reset-email"
                placeholder="tu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Enviar Enlace
            </button>
          </form>
        )}

        <p className="auth-footer-link" style={{ marginTop: '1.5rem' }}>
          ¿Ya la recordaste? <Link to="/iniciar-sesion">Inicia sesión aquí</Link> · <Link to="/">Volver al inicio</Link>
        </p>
      </section>
    </main>
  );
}

