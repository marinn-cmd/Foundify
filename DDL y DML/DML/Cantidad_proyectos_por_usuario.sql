SELECT
    u.Id_usuario,
    u.Nombres,
    u.Apellidos,
    COUNT(DISTINCT p.Id_proyecto)          AS Proyectos_creados,
    COALESCE(SUM(d.Monto), 0)               AS Total_recaudado_general,
    (
        SELECT p3.Titulo
        FROM Proyectos p3
        LEFT JOIN Donaciones d3
               ON p3.Id_proyecto = d3.Id_proyecto AND d3.Estado = 'completada'
        WHERE p3.Id_usuario = u.Id_usuario
        GROUP BY p3.Id_proyecto, p3.Titulo
        ORDER BY SUM(d3.Monto) DESC
        LIMIT 1
    ) AS Proyecto_estrella
FROM Usuarios u
JOIN Proyectos p    ON u.Id_usuario = p.Id_usuario
LEFT JOIN Donaciones d ON p.Id_proyecto = d.Id_proyecto AND d.Estado = 'completada'
GROUP BY u.Id_usuario, u.Nombres, u.Apellidos
ORDER BY Total_recaudado_general DESC;