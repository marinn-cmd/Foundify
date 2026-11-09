import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatternWavesBackground from '../components/PatternWaves/PatternWavesBackground';
import './RegisterPage.css';

export default function ContactanosPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Soporte',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
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
        <p className="auth-tagline">¿Tienes una duda o quieres apoyarnos? Escríbenos.</p>
      </header>

      <section className="auth-card" style={{ maxWidth: 540 }}>
        <h1 className="auth-title">Contáctanos</h1>
        <p className="auth-subtitle">
          Nuestro equipo está listo para ayudarte con consultas sobre proyectos, cuentas o colaboración.
        </p>

        {submitted ? (
          <div className="alert-message alert-success">
            ¡Gracias por escribirnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="auth-label" htmlFor="name">Nombre</label>
              <input
                className="auth-input"
                type="text"
                id="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="auth-label" htmlFor="contact-email">Correo electrónico</label>
              <input
                className="auth-input"
                type="email"
                id="contact-email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="auth-label" htmlFor="reason">Motivo</label>
              <select
                className="auth-select"
                id="reason"
                value={formData.reason}
                onChange={e => setFormData({ ...formData, reason: e.target.value })}
              >
                <option value="Soporte">Soporte</option>
                <option value="Propuesta de colaboración">Propuesta de colaboración</option>
                <option value="Reporte de error">Reporte de error</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <div className="form-group">
              <label className="auth-label" htmlFor="message">Mensaje</label>
              <textarea
                className="auth-input"
                id="message"
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-submit">
              Enviar mensaje
            </button>
          </form>
        )}

        <p className="auth-footer-link" style={{ marginTop: '1.25rem' }}>
          ¿Quieres volver? <Link to="/">Regresa al inicio</Link>.
        </p>
      </section>
    </main>
  );
}

