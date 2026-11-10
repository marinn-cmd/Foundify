import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateProject() {
  const navigate = useNavigate();

  // Estado con los nombres exactos de los inputs de tu formulario PHP
  const [formData, setFormData] = useState({
    Id_Proyecto: '',
    Id_Usuario: '',
    Titulo_Proyecto: '',
    Descripcion: '',
    Select_Categoria: '',
    Id_Categoria: '',
    Meta_Financiamiento: '',
    Estado: '',
    Fecha_Limite: ''
  });

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

  // Envío del formulario (Simulación React puro)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.Id_Proyecto || !formData.Id_Usuario || !formData.Titulo_Proyecto || !formData.Select_Categoria || !formData.Estado) {
      alert('¡Faltan datos! Por favor llena todos los campos obligatorios.');
      return;
    }

    alert(`¡Proyecto "${formData.Titulo_Proyecto}" guardado exitosamente!`);
    navigate('/comunidad');
  };

  return (
    <div className="modal-overlay activo" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' }}>
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

        {/* Formulario */}
        <form id="formProyecto" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Fila 1: IDs de Sistema */}
          <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Id_Proyecto" style={{ fontSize: '0.85rem' }}>ID Proyecto</label>
              <input 
                type="number" 
                id="Id_Proyecto" 
                name="Id_Proyecto" 
                placeholder="Ej: 1021" 
                value={formData.Id_Proyecto}
                onChange={handleChange}
                required 
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
              />
            </div>
            <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label htmlFor="Id_Usuario" style={{ fontSize: '0.85rem' }}>ID Usuario</label>
              <input 
                type="number" 
                id="Id_Usuario" 
                name="Id_Usuario" 
                placeholder="Ej: 1023456789" 
                value={formData.Id_Usuario}
                onChange={handleChange}
                required 
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }}
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
              style={{ padding: '10px 18px', backgroundColor: '#22c55e', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Guardar Proyecto
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}