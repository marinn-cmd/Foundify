import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatternWavesBackground from '../Componentes/PatternWaves/PatternWavesBackground';
import './RegisterPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    documento: '',
    identificacion: '',
    nombres: '',
    apellidos: '',
    rol: '',
    email: '',
    genero: '',
    edad: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [message, setMessage] = useState(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.documento || !formData.identificacion || !formData.nombres || !formData.apellidos) {
      setMessage({ type: 'error', text: 'Por favor completa tus datos de identificación y nombres.' });
      return;
    }
    if (!formData.rol) {
      setMessage({ type: 'error', text: 'Por favor selecciona tu rol en Foundify.' });
      return;
    }
    if (!formData.email) {
      setMessage({ type: 'error', text: 'Por favor ingresa tu correo electrónico.' });
      return;
    }
    if (!formData.password || formData.password.length < 8) {
      setMessage({ type: 'error', text: 'La contraseña debe tener mínimo 8 caracteres.' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
      return;
    }
    if (!formData.terms) {
      setMessage({ type: 'error', text: 'Debes aceptar los términos y condiciones.' });
      return;
    }

    setMessage({ type: 'success', text: '¡Registro completado exitosamente! Bienvenido a Foundify. Redirigiendo...' });
    setTimeout(() => {
      navigate('/iniciar-sesion');
    }, 1200);
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
        <p className="auth-tagline">Únete a nuestra comunidad</p>
      </header>

      <section className="auth-card">
        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Completa el formulario para registrarte</p>

        {message && (
          <div className={`alert-message alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group form-row-sm">
              <label className="auth-label" htmlFor="documento">Tipo</label>
              <select
                className="auth-select"
                id="documento"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Tipo</option>
                <option value="CC">CC</option>
                <option value="PPT">PPT</option>
              </select>
            </div>

            <div className="form-group form-row-lg">
              <label className="auth-label" htmlFor="identificacion">Número de identificación</label>
              <input
                className="auth-input"
                type="text"
                id="identificacion"
                name="identificacion"
                placeholder="123456789"
                value={formData.identificacion}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="auth-label" htmlFor="nombres">Nombres</label>
              <input
                className="auth-input"
                type="text"
                id="nombres"
                name="nombres"
                placeholder="Juan Pérez"
                value={formData.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="auth-label" htmlFor="apellidos">Apellidos</label>
              <input
                className="auth-input"
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder="García López"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="rol">Rol</label>
            <select
              className="auth-select"
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecciona tu rol</option>
              <option value="1">1. Mixto</option>
              <option value="2">2. Donador</option>
              <option value="3">3. Emprendedor</option>
            </select>
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="email">Correo electrónico</label>
            <input
              className="auth-input"
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="auth-label" htmlFor="genero">Género</label>
              <select
                className="auth-select"
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
              >
                <option value="" disabled>Género</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <div className="form-group">
              <label className="auth-label" htmlFor="edad">Edad</label>
              <input
                className="auth-input"
                type="number"
                id="edad"
                name="edad"
                placeholder="Edad"
                min="1"
                max="120"
                value={formData.edad}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="telefono">Teléfono</label>
            <input
              className="auth-input"
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="Ingrese su teléfono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="password">Contraseña</label>
            <input
              className="auth-input"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="auth-hint">Mínimo 8 caracteres</span>
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              className="auth-input"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms-row">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">
              Acepto los <a href="#terms">términos y condiciones</a> y la <a href="#privacy">política de privacidad</a>
            </label>
          </div>

          <button type="submit" className="btn-submit">
            Crear Cuenta
          </button>

          <p className="auth-footer-link">
            ¿Ya tienes una cuenta? <Link to="/iniciar-sesion">Inicia sesión aquí</Link>
          </p>
        </form>

        <div className="auth-divider">
          <span>O regístrate con</span>
        </div>

        <div className="oauth-row">
          <button type="button" className="btn-oauth">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.2l-6.3-5.3C29.5 35.3 26.9 36 24 36c-5.2 0-9.6-3-11.3-7.4l-6.5 5C9.6 39.6 16.3 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.3 5.3C43.1 35.3 44 30 44 24c0-1.2-.1-2.4-.4-3.5z" />
            </svg>
            Google
          </button>
          <button type="button" className="btn-oauth">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
            GitHub
          </button>
        </div>
      </section>
    </main>
  );
}

