import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/stylecon.css';

// ---------- Aviso flotante ----------
const COLORES_AVISO = { exito: '#22c55e', error: '#ef4444', info: '#3b82f6' };
const ICONOS_AVISO = { exito: '✓', error: '✕', info: 'i' };

function Aviso({ aviso, onCerrar }) {
  if (!aviso) return null;
  const color = COLORES_AVISO[aviso.tipo] || COLORES_AVISO.info;

  return (
    <>
      <style>{`
        @keyframes avisoEntrada {
          from { opacity: 0; transform: translateY(-14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        role="alert"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 2000,
          width: '100%',
          maxWidth: '380px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px',
          padding: '16px 18px',
          backgroundColor: '#131a24',
          border: '1px solid #1e293b',
          borderLeft: `5px solid ${color}`,
          borderRadius: '10px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
          color: '#f1f5f9',
          animation: 'avisoEntrada 0.25s ease-out',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: `${color}22`,
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          {ICONOS_AVISO[aviso.tipo] || 'i'}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '3px' }}>{aviso.titulo}</strong>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.4 }}>{aviso.texto}</span>
        </div>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar aviso"
          style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer', lineHeight: 1, padding: 0 }}
        >
          &times;
        </button>
      </div>
    </>
  );
}

// ---------- Modal de confirmación Sí / No ----------
function ModalConfirmarEliminar({ abierto, eliminando, onConfirmar, onCancelar }) {
  if (!abierto) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1500,
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          backgroundColor: '#131a24',
          padding: '28px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '420px',
          border: '1px solid #1e293b',
          boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
          color: '#f1f5f9',
          animation: 'avisoEntrada 0.2s ease-out'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#ef444422',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              flexShrink: 0
            }}
          >
            !
          </div>
          <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Confirmar eliminación</h3>
        </div>

        <p style={{ margin: '0 0 22px 0', fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.5 }}>
          ¿Está seguro? Esta acción eliminará su cuenta
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            disabled={eliminando}
            onClick={onCancelar}
            style={{
              padding: '10px 20px',
              backgroundColor: '#334155',
              color: '#f1f5f9',
              border: 'none',
              borderRadius: '6px',
              cursor: eliminando ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            No
          </button>
          <button
            type="button"
            disabled={eliminando}
            onClick={onConfirmar}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: eliminando ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              opacity: eliminando ? 0.6 : 1
            }}
          >
            {eliminando ? 'Eliminando...' : 'Sí'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fotoPerfil: 'https://i.pravatar.cc/100?img=33',
    notifLikes: true,
    notifComentarios: true,
    notifSeguidores: false
  });

  const [aviso, setAviso] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const mostrarAviso = (tipo, titulo, texto) => setAviso({ tipo, titulo, texto });
  const irA = (ruta, ms = 1800) => setTimeout(() => navigate(ruta), ms);

  useEffect(() => {
    if (!aviso || aviso.tipo === 'exito') return;
    const temporizador = setTimeout(() => setAviso(null), 5000);
    return () => clearTimeout(temporizador);
  }, [aviso]);

  useEffect(() => {
    fetch('http://localhost/api-foundify/actualizar_perfil.php', {
      method: 'GET',
      credentials: 'include'
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.mensaje || 'No se pudieron cargar los datos del perfil.');
        }

        setFormData((prev) => ({
          ...prev,
          nombre: data.usuario.nombres || '',
          apellidos: data.usuario.apellidos || ''
        }));
      })
      .catch((error) => {
        console.error('Error al cargar el perfil:', error);
        mostrarAviso('error', 'Error al cargar perfil', error.message || 'No se pudieron cargar los datos del perfil.');
      });
  }, []);

  const handleToggle = (campo) => {
    setFormData((prev) => ({ ...prev, [campo]: !prev[campo] }));
  };

  const handleCambiarFoto = () => {
    const nuevaImgId = Math.floor(Math.random() * 70) + 1;
    setFormData((prev) => ({
      ...prev,
      fotoPerfil: `https://i.pravatar.cc/100?img=${nuevaImgId}`
    }));
  };

  // Mantiene nombre y apellidos intactos al restablecer
  const handleCancelar = () => {
    setFormData((prev) => ({
      ...prev,
      fotoPerfil: 'https://i.pravatar.cc/100?img=33',
      notifLikes: true,
      notifComentarios: true,
      notifSeguidores: false
    }));
  };

  const confirmarEliminacion = async () => {
    setEliminando(true);

    try {
      const response = await fetch('http://localhost/api-foundify/API_eliminarperfil.php', {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMostrarConfirmacion(false);
        setEliminando(false);
        mostrarAviso('error', 'No se pudo eliminar', data.mensaje || 'No se pudo eliminar la cuenta.');
        return;
      }

      localStorage.clear();
      setMostrarConfirmacion(false);
      mostrarAviso('exito', 'Cuenta eliminada', 'Tu cuenta ha sido eliminada permanentemente. Redirigiendo...');
      irA('/');
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      setMostrarConfirmacion(false);
      setEliminando(false);
      mostrarAviso('error', 'Sin conexión', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Aviso aviso={aviso} onCerrar={() => setAviso(null)} />

      <ModalConfirmarEliminar
        abierto={mostrarConfirmacion}
        eliminando={eliminando}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setMostrarConfirmacion(false)}
      />

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

        <form onSubmit={(e) => e.preventDefault()} className="config-wrap">
          {/* Foto y datos del perfil (solo lectura en nombre y apellidos) */}
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
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  readOnly
                  style={{ cursor: 'not-allowed', opacity: 0.8 }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  value={formData.apellidos}
                  readOnly
                  style={{ cursor: 'not-allowed', opacity: 0.8 }}
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
              type="button"
              className="btn-publicar"
              onClick={() => setMostrarConfirmacion(true)}
              style={{
                backgroundColor: '#ef4444',
                borderColor: '#ef4444',
                color: '#ffffff'
              }}
            >
              Eliminar cuenta
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}