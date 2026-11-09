import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PatternWavesBackground from '../components/PatternWaves/PatternWavesBackground';
import './RegisterPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Por favor ingresa tu correo y contraseña.' });
      return;
    }
    setMessage({ type: 'success', text: 'Iniciando sesión...' });
  };

  return (
    <main className="auth-page">
      <PatternWavesBackground />

      <header className="auth-brand">
        <Link to="/" title="Volver al inicio">
          <img
            className="auth-logo"
            src="/assets/imagenes/FoundifyBlancoRecortada.png"
            alt="Foundify"
          />
        </Link>
        <p className="auth-tagline">Conoce más proyectos</p>
      </header>

      <section className="auth-card" style={{ maxWidth: 480 }}>
        <h1 className="auth-title">Iniciar Sesión</h1>
        <p className="auth-subtitle">Ingresa tus credenciales para acceder a tu cuenta</p>

        {message && (
          <div className={`alert-message alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="auth-label" htmlFor="login-email">Correo electrónico</label>
            <input
              className="auth-input"
              type="email"
              id="login-email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="login-password">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                className="auth-input"
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
                style={{ paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#8b949e',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8b949e', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={e => setFormData({ ...formData, remember: e.target.checked })}
              />
              Recordarme
            </label>
            <Link to="/restablecer" style={{ color: '#22c55e', textDecoration: 'none' }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button type="submit" className="btn-submit">
            Iniciar Sesión
          </button>

          <p className="auth-footer-link">
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </form>

        <div className="auth-divider">
          <span>O continúa con</span>
        </div>

        <div className="oauth-row">
          <button type="button" className="btn-oauth">
            Google
          </button>
          <button type="button" className="btn-oauth">
            GitHub
          </button>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#8b949e', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}

