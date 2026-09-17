SELECT
    p.Id_proyecto,
    p.Titulo,
    COUNT(d.Id_donacion)      AS Numero_donaciones,
    SUM(d.Monto)               AS Total_recaudado,
    AVG(d.Monto)                AS Promedio_donacion,
    MAX(d.Monto)                AS Donacion_maxima,
    MIN(d.Monto)                AS Donacion_minima
FROM Proyectos p
LEFT JOIN Donaciones d
    ON p.Id_proyecto = d.Id_proyecto
   AND d.Estado = 'completada'
GROUP BY p.Id_proyecto, p.Titulo
ORDER BY Total_recaudado DESC;