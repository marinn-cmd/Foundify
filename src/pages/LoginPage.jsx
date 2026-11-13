import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatternWavesBackground from '../Componentes/PatternWaves/PatternWavesBackground';
import './RegisterPage.css';

export default function LoginPage() {
  const navigate = useNavigate();

  // Lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // El mensaje de error o éxito que se muestra arriba del formulario
  const [mensaje, setMensaje] = useState('');

  function iniciarSesion(e) {
    e.preventDefault(); // evita que la página se recargue

    // 1. Revisar que los campos no estén vacíos
    if (email === '' || password === '') {
      setMensaje('Por favor ingresa tu correo y contraseña.');
      return;
    }

    // 2. Enviar el correo y la contraseña al PHP (XAMPP)
    fetch('http://localhost/api-foundify/Api_iniciosesion.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // necesario para que se guarde la sesión (cookie)
      body: JSON.stringify({ Email: email, Password: password })
    })
      .then(async respuesta => {
        const datos = await respuesta.json();

        // 3. Si el PHP dijo que está bien, ir a proyectos
        if (respuesta.ok && datos.ok) {
          navigate('/proyectos');
        } else {
          // Muestra el mensaje que manda el PHP (400, 401, 500...)
          setMensaje(datos.message || 'Correo o contraseña incorrectos.');
        }
      })
      .catch((error) => {
        // 4. Si falla la conexión, el error real queda en la consola (F12)
        console.error('Error en el login:', error);
        setMensaje('No se pudo conectar con el servidor.');
      });
  }

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

        {mensaje !== '' && (
          <div className="alert-message alert-error">{mensaje}</div>
        )}

        <form className="auth-form" onSubmit={iniciarSesion}>
          <div className="form-group">
            <label className="auth-label" htmlFor="login-email">Correo electrónico</label>
            <input
              className="auth-input"
              type="email"
              id="login-email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="auth-label" htmlFor="login-password">Contraseña</label>
            <input
              className="auth-input"
              type="password"
              id="login-password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Iniciar Sesión
          </button>

          <p className="auth-footer-link">
            ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#8b949e', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}