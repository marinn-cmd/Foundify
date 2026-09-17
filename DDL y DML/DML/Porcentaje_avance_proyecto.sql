SELECT
    p.Id_proyecto,
    p.Titulo,
    p.Meta_financiamiento,
    COALESCE(SUM(d.Monto), 0)                          AS Total_recaudado,
    ROUND(COALESCE(SUM(d.Monto), 0) / p.Meta_financiamiento * 100, 2) AS Porcentaje_avance
FROM Proyectos p
LEFT JOIN Donaciones d
    ON p.Id_proyecto = d.Id_proyecto
   AND d.Estado = 'completada'
GROUP BY p.Id_proyecto, p.Titulo, p.Meta_financiamiento
ORDER BY Porcentaje_avance DESC;