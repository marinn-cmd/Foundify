SELECT
    p.Id_proyecto,
    p.Titulo,
    SUM(d.Monto) AS Total_recaudado
FROM Proyectos p
JOIN Donaciones d ON p.Id_proyecto = d.Id_proyecto
WHERE d.Estado = 'completada'
GROUP BY p.Id_proyecto, p.Titulo
HAVING SUM(d.Monto) > (
    SELECT AVG(Total_por_proyecto)
    FROM (
        SELECT SUM(Monto) AS Total_por_proyecto
        FROM Donaciones
        WHERE Estado = 'completada'
        GROUP BY Id_proyecto
    ) AS Subtotales
)
ORDER BY Total_recaudado DESC;