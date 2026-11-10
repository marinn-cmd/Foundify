export default function ProyectosCard({ proyecto: p }) {
  return (
    <article style={{ 
      border: '1px solid #333', 
      borderRadius: '10px', 
      overflow: 'hidden', 
      backgroundColor: '#1e1e1e', 
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
    }}>
      <div>
        <span style={{ fontSize: '0.85rem', color: '#00d26a', fontWeight: 'bold' }}>
          ID: {p.id_proyecto || p.id}
        </span>
        
        <h3 style={{ margin: '10px 0 8px 0', fontSize: '1.25rem', color: '#fff' }}>
          {p.Titulo || p.titulo}
        </h3>
        
        <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '15px', lineHeight: '1.4' }}>
          {p.Descripcion || p.descripcion}
        </p>
        
        <div style={{ fontSize: '0.9rem', color: '#eee', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '15px' }}>
          <p style={{ margin: 0 }}><strong>Meta:</strong> ${p.Meta_financiamiento || p.meta}</p>
          <p style={{ margin: 0 }}><strong>Estado:</strong> {p.Estado || p.estado}</p>
          <p style={{ margin: 0 }}><strong>Fecha límite:</strong> {p.Fecha_limite || p.fechaLimite}</p>
        </div>

        <button style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#00d26a', 
          border: 'none', 
          borderRadius: '5px', 
          color: '#000', 
          fontWeight: 'bold', 
          cursor: 'pointer', 
          marginTop: '10px' 
        }}>
          Ver Proyecto
        </button>
      </div>
    </article>
  );
}