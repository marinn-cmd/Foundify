import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/stylecon.css'; // <-- VINCULA EL CSS AQUÍ

export function Settings() {
  // Estado para controlar todos los campos del formulario de configuración
  const [formData, setFormData] = useState({
    nombre: 'Ana Morales',
    usuario: 'ana_morales',
    bio: '',
    correo: 'ana@ejemplo.com',
    password: '',
    password2: '',
    fotoPerfil: 'https://i.pravatar.cc/100?img=33',
    notifLikes: true,
    notifComentarios: true,
    notifSeguidores: false
  });

  // Manejador genérico para inputs de texto y textareas
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Manejador para los switches de notificaciones (checkboxes)
  const handleToggle = (campo) => {
    setFormData((prev) => ({ ...prev, [campo]: !prev[campo] }));
  };

  // Simulación de cambio de foto de perfil
  const handleCambiarFoto = () => {
    const nuevaImgId = Math.floor(Math.random() * 70) + 1;
    setFormData((prev) => ({
      ...prev,
      fotoPerfil: `https://i.pravatar.cc/100?img=${nuevaImgId}`
    }));
  };

  // Guardar cambios (Modo simulación React)
  const handleGuardarCambios = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.password2) {
      alert('Las contraseñas no coinciden. Por favor verifica.');
      return;
    }
    alert('¡Configuración y perfil guardados con éxito!');
  };

  // Cancelar/Restablecer campos
  const handleCancelar = () => {
    setFormData({
      nombre: '',
      usuario: '',
      bio: '',
      correo: '',
      password: '',
      password2: '',
      fotoPerfil: 'https://i.pravatar.cc/100?img=33',
      notifLikes: true,
      notifComentarios: true,
      notifSeguidores: false
    });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <Link to="/proyectos">🏠</Link>
        <Link to="/configuracion" className="activo">⚙️</Link>
      </aside>

      {/* Main */}
      <main className="main" style={{ flex: 1, padding: '20px' }}>
        
        <div className="topbar">
          <h1>Configuración</h1>
        </div>

        <form onSubmit={handleGuardarCambios} className="config-wrap">

          {/* Foto y datos del perfil */}
          <div className="config-card">
            <h2>Perfil</h2>
            <p className="descripcion">Esta información se mostrará en tu perfil público.</p>

            <div className="form-group">
              <div className="foto-perfil">
                <img src={formData.fotoPerfil} alt="Foto de perfil" />
                <button 
                  type="button" 
                  className="btn-secundario" 
                  onClick={handleCambiarFoto}
                >
                  Cambiar foto
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo</label>
                <input 
                  type="text" 
                  id="nombre" 
                  placeholder="Ej: Ana Morales" 
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="usuario">Nombre de usuario</label>
                <input 
                  type="text" 
                  id="usuario" 
                  placeholder="Ej: ana_morales" 
                  value={formData.usuario}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Biografía</label>
              <textarea 
                id="bio" 
                placeholder="Cuéntanos sobre ti y tus proyectos..."
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Cuenta */}
          <div className="config-card">
            <h2>Cuenta</h2>
            <p className="descripcion">Datos para iniciar sesión y recuperar tu cuenta.</p>

            <div className="form-group">
              <label htmlFor="correo">Correo electrónico</label>
              <input 
                type="email" 
                id="correo" 
                placeholder="tu@email.com" 
                value={formData.correo}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Nueva contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirmar contraseña</label>
                <input 
                  type="password" 
                  id="password2" 
                  placeholder="••••••••" 
                  value={formData.password2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="config-card">
            <h2>Notificaciones</h2>
            <p className="descripcion">Elige qué notificaciones quieres recibir.</p>

            <div className="toggle-row">
              <div className="info">
                <h4>Me gusta en tus proyectos</h4>
                <p>Recibe un aviso cuando alguien apoye tu publicación</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={formData.notifLikes}
                  onChange={() => handleToggle('notifLikes')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-row">
              <div className="info">
                <h4>Comentarios</h4>
                <p>Recibe un aviso cuando comenten en tus proyectos</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={formData.notifComentarios}
                  onChange={() => handleToggle('notifComentarios')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-row">
              <div className="info">
                <h4>Nuevos seguidores</h4>
                <p>Recibe un aviso cuando alguien te empiece a seguir</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={formData.notifSeguidores}
                  onChange={() => handleToggle('notifSeguidores')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="config-footer">
            <button 
              type="button" 
              className="btn-secundario" 
              onClick={handleCancelar}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-publicar"
            >
              Guardar cambios
            </button>
          </div>

        </form>
      </main>

    </div>
  );
}