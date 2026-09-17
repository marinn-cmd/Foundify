SELECT
    r.Id_reporte,
    r.Tipo_reporte,
    r.Descripcion,
    r.Fecha,
    p.Titulo         AS Proyecto_reportado,
    u.Nombres         AS Usuario_que_reporta,
    nr.Nivel_reporte,
    nr.Tipos_reporte,
    a.Nombre          AS Administrador_asignado
FROM Reportes r
JOIN Proyectos p       ON r.Id_proyecto      = p.Id_proyecto
JOIN Usuarios u        ON r.Id_usuario       = u.Id_usuario
JOIN Nivel_reportes nr ON r.Id_nivel_reporte = nr.Id_nivel_reporte
JOIN Administradores a ON r.Id_administrador = a.Id_administrador
ORDER BY nr.Nivel_reporte DESC, r.Fecha DESC;