SELECT
    p.Id_proyecto,
    p.Titulo,
    p.Estado,
    p.Meta_financiamiento,
    u.Nombres,
    u.Apellidos,
    c.Categoria
FROM Proyectos p
JOIN Usuarios u   ON p.Id_usuario   = u.Id_usuario
JOIN Categorias c ON p.Id_categoria = c.Id_categoria
ORDER BY p.Fecha_creacion DESC;