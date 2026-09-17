SELECT
    p.Id_proyecto,
    p.Titulo,
    nr.Tipos_reporte,
    nr.Nivel_reporte,
    COALESCE(SUM(d.Monto), 0) AS Total_recaudado,
    p.Meta_financiamiento,
    DATEDIFF(p.Fecha_limite, CURDATE()) AS Dias_restantes
FROM Proyectos p
JOIN Reportes r        ON p.Id_proyecto      = r.Id_proyecto
JOIN Nivel_reportes nr ON r.Id_nivel_reporte = nr.Id_nivel_reporte
LEFT JOIN Donaciones d ON p.Id_proyecto = d.Id_proyecto AND d.Estado = 'completada'
WHERE nr.Tipos_reporte IN ('PELIGRO', 'DAÑO')
GROUP BY p.Id_proyecto, p.Titulo, nr.Tipos_reporte, nr.Nivel_reporte,
         p.Meta_financiamiento, p.Fecha_limite
ORDER BY nr.Nivel_reporte ASC, Total_recaudado DESC;