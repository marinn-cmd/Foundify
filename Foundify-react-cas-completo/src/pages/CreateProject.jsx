import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_PROYECTO = 'http://localhost/api-foundify/API_crearproyecto.php';

// ---------- Aviso bonito (reemplaza los alert del navegador) ----------
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

export function CreateProject() {
  const navigate = useNavigate();

  // Estado con los nombres exactos de los inputs de tu formulario PHP
  const [formData, setFormData] = useState({
    Id_Usuario: '',
    Titulo_Proyecto: '',
    Descripcion: '',
    Select_Categoria: '',
    Id_Categoria: '',
    Meta_Financiamiento: '',
    Estado: '',
    Fecha_Limite: ''
  });

  const [aviso, setAviso] = useState(null); // { tipo: 'exito' | 'error' | 'info', titulo, texto }
  const [enviando, setEnviando] = useState(false);

  const mostrarAviso = (tipo, titulo, texto) => setAviso({ tipo, titulo, texto });
  const irA = (ruta, ms = 1800) => setTimeout(() => navigate(ruta), ms);

  // Los avisos de error/info se cierran solos a los 5 segundos
  useEffect(() => {
    if (!aviso || aviso.tipo === 'exito') return;
    const temporizador = setTimeout(() => setAviso(null), 5000);
    return () => clearTimeout(temporizador);
  }, [aviso]);

  // Al abrir el formulario, trae el Id del usuario que inició sesión
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const res = await fetch(API_PROYECTO, { credentials: 'include' });
        const data = await res.json();

        if (!res.ok) {
          setAviso({
            tipo: 'info',
            titulo: 'Inicia sesión',
            texto: data.message || 'Debes iniciar sesión para publicar un proyecto.'
          });
          setTimeout(() => navigate('/iniciar-sesion'), 1800);
          return;
        }

        setFormData((prev) => ({ ...prev, Id_Usuario: data.Id_usuario }));
      } catch (error) {
        console.error('[Proyecto] No se pudo obtener la sesión:', error);
        setAviso({
          tipo: 'error',
          titulo: 'Sin conexión',
          texto: 'No se pudo conectar con el servidor.'
        });
      }
    };

    cargarUsuario();
  }, [navigate]);

  // Manejar el cambio en los inputs de texto/número/fecha
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Sincronizar automáticamente la categoría seleccionada con el campo ID Cat.
  const handleCategoriaChange = (e) => {
    const valorSeleccionado = e.target.value;
    setFormData((prev) => ({
      ...prev,
      Select_Categoria: valorSeleccionado,
      Id_Categoria: valorSeleccionado // El ID Cat. toma el mismo valor que la categoría
    }));
  };

  // Volver a la pantalla de Comunidad si presiona cancelar o cerrar
  const volverAComunidad = () => {
    navigate('/comunidad');
  };

  // Envío del formulario a la API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Id_Usuario) {
      mostrarAviso('error', 'Sesión no encontrada', 'Inicia sesión para publicar un proyecto.');
      return;
    }
    if (!formData.Titulo_Proyecto.trim()) {
      mostrarAviso('error', 'Falta el título', 'Escribe un título para tu proyecto.');
      return;
    }
    if (!formData.Descripcion.trim()) {
      mostrarAviso('error', 'Falta la descripción', 'Cuéntanos de qué trata tu proyecto.');
      return;
    }
    if (!formData.Select_Categoria) {
      mostrarAviso('error', 'Falta la categoría', 'Selecciona una categoría para tu proyecto.');
      return;
    }
    if (!formData.Meta_Financiamiento || Number(formData.Meta_Financiamiento) <= 0) {
      mostrarAviso('error', 'Meta inválida', 'La meta de financiamiento debe ser mayor a 0.');
      return;
    }
    if (!formData.Estado) {
      mostrarAviso('error', 'Falta el estado', 'Selecciona el estado del proyecto.');
      return;
    }
    if (!formData.Fecha_Limite) {
      mostrarAviso('error', 'Falta la fecha límite', 'Selecciona la fecha límite del proyecto.');
      return;
    }

    setEnviando(true);

    try {
      const res = await fetch(API_PROYECTO, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        // El Id_Usuario no se envía: la API lo toma de la sesión
        body: JSON.stringify({
          Titulo_Proyecto: formData.Titulo_Proyecto,
          Descripcion: formData.Descripcion,
          Id_Categoria: formData.Id_Categoria,
          Meta_Financiamiento: formData.Meta_Financiamiento,
          Estado: formData.Estado,
          Fecha_Limite: formData.Fecha_Limite
        })
      });
      const data = await res.json();
      console.log('[Proyecto] Respuesta de la API:', res.status, data);

      if (res.status === 401) {
        mostrarAviso('info', 'Inicia sesión', data.message);
        irA('/iniciar-sesion');
        return;
      }

      if (!res.ok) {
        mostrarAviso('error', 'No se pudo guardar', data.message);
        setEnviando(false);
        return;
      }

      mostrarAviso('exito', '¡Proyecto publicado!', `"${formData.Titulo_Proyecto}" se guardó exitosamente. Te llevamos a la comunidad...`);
      irA('/comunidad');
    } catch (error) {
      console.error('[Proyecto] Error en fetch:', error);
      mostrarAviso('error', 'Sin conexión', 'No se pudo conectar con el servidor.');
      setEnviando(false);
    }
  };

  return (
    <div className="modal-overlay activo" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' }}>

      <Aviso aviso={aviso} onCerrar={() => setAviso(null)} />

      <div className="modal-box" style={{ backgroundColor: '#131a24', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '650px', border: '1px solid #1e293b', color: '#f1f5f9', maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Encabezado del Modal */}
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Publicar Nuevo Proyecto</h2>
          <button 
            type="button"
            className="btn-cerrar-modal" 
            onClick={volverAComunidad}
            style={{ background: 'none', border: 'none', color: '#f1f5f9', fontSize: '1.8rem', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        {/* Formulario (noValidate: los errores se muestran con los avisos de arriba) */}
        <form id="formProyecto" onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Fila 1: Usuario de la sesión */}
          <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Id_Usuario" style={{ fontSize: '0.85rem' }}>ID Usuario (sesión actual)</label>
              <input 
                type="text" 
                id="Id_Usuario" 
                name="Id_Usuario" 
                placeholder="Cargando..." 
                value={formData.Id_Usuario}
                readOnly 
                required 
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', cursor: 'not-allowed', color: '#22c55e', fontWeight: 'bold' }}
              />
            </div>
          </div>

          {/* Título */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="Titulo_Proyecto" style={{ fontSize: '0.85rem' }}>Título del Proyecto</label>
            <input 
              type="text" 
              id="Titulo_Proyecto" 
              name="Titulo_Proyecto" 
              placeholder="Ej: Plataforma Solidaria" 
              value={formData.Titulo_Proyecto}
              onChange={handleChange}
              required 
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
            />
          </div>

          {/* Descripción */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="Descripcion" style={{ fontSize: '0.85rem' }}>Descripción</label>
            <textarea 
              id="Descripcion" 
              name="Descripcion" 
              rows="3"
              placeholder="Describe cómo esta iniciativa conectará a los emprendedores con los donantes..." 
              value={formData.Descripcion}
              onChange={handleChange}
              required
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', resize: 'vertical' }}
            ></textarea>
          </div>

          {/* Categoría e ID Categoría */}
          <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Select_Categoria" style={{ fontSize: '0.85rem' }}>Nombre de la Categoría</label>
              <select 
                id="Select_Categoria" 
                name="Select_Categoria" 
                value={formData.Select_Categoria}
                onChange={handleCategoriaChange}
                required
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              >
                <option value="">Selecciona una categoría...</option>
                <option value="1">Salud - Servicios de cuidado y bienestar</option>
                <option value="2">Ambiental - Medio ambiente y reciclaje</option>
                <option value="3">Servicios - Atención y servicios digitales</option>
                <option value="4">Comercio - Compra, venta y comercio digital</option>
                <option value="5">Movilidad - Transporte y desplazamiento</option>
                <option value="6">Bienestar - Calidad de vida</option>
                <option value="7">Finanzas - Dinero y pagos digitales</option>
                <option value="8">Turismo - Viajes y turismo</option>
                <option value="9">Agricultura - Cultivos y producción agrícola</option>
                <option value="10">Educación - Aprendizaje y formación</option>
                <option value="11">Empleo - Oportunidades laborales</option>
                <option value="12">Productividad - Organización y tareas</option>
                <option value="13">Comunicación - Interacción social</option>
                <option value="14">Seguridad - Protección y seguridad</option>
              </select>
            </div>

            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Id_Categoria" style={{ fontSize: '0.85rem' }}>ID Cat.</label>
              <input 
                type="number" 
                id="Id_Categoria" 
                name="Id_Categoria" 
                placeholder="#" 
                readOnly 
                required 
                value={formData.Id_Categoria}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1e293b', cursor: 'not-allowed', textAlign: 'center', fontWeight: 'bold', color: '#22c55e' }}
              />
            </div>
          </div>

          {/* Meta y Estado */}
          <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Meta_Financiamiento" style={{ fontSize: '0.85rem' }}>Meta de Financiamiento ($)</label>
              <input 
                type="number" 
                id="Meta_Financiamiento" 
                name="Meta_Financiamiento" 
                step="0.01" 
                placeholder="Ej: 3500000.00" 
                value={formData.Meta_Financiamiento}
                onChange={handleChange}
                required
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              />
            </div>

            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Estado" style={{ fontSize: '0.85rem' }}>Estado</label>
              <select 
                id="Estado" 
                name="Estado" 
                value={formData.Estado}
                onChange={handleChange}
                required
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              >
                <option value="">Selecciona el estado...</option>
                <option value="abierta">abierta</option>
                <option value="cerrada">cerrada</option>
                <option value="en financiamiento">en financiamiento</option>
                <option value="sin financiar">sin financiar</option>
                <option value="financiada">financiada</option>
                <option value="no cumplio meta">no cumplio meta</option>
              </select>
            </div>
          </div>

          {/* Fecha Límite */}
          <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Fecha_Limite" style={{ fontSize: '0.85rem' }}>Fecha Límite</label>
              <input 
                type="date" 
                id="Fecha_Limite" 
                name="Fecha_Limite" 
                value={formData.Fecha_Limite}
                onChange={handleChange}
                required
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              />
            </div>
          </div>

          {/* Botones del Footer */}
          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px', borderTop: '1px solid #1e293b', paddingTop: '15px' }}>
            <button 
              type="button" 
              className="btn-secundario" 
              onClick={volverAComunidad}
              style={{ padding: '10px 18px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-publicar"
              disabled={enviando}
              style={{ padding: '10px 18px', backgroundColor: '#22c55e', color: '#000', border: 'none', borderRadius: '6px', cursor: enviando ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: enviando ? 0.6 : 1 }}
            >
              {enviando ? 'Guardando...' : 'Guardar Proyecto'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}