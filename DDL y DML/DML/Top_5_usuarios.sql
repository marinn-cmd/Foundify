SELECT
    p.Id_proyecto,
    p.Titulo,
    cat.Categoria,
    p.Meta_financiamiento,
    SUM(d.Monto) AS Total_recaudado
FROM Proyectos p
JOIN Categorias cat ON p.Id_categoria = cat.Id_categoria
JOIN Donaciones d    ON p.Id_proyecto = d.Id_proyecto
WHERE d.Estado = 'completada'
  AND p.Meta_financiamiento > (
        SELECT AVG(p2.Meta_financiamiento)
        FROM Proyectos p2
        WHERE p2.Id_categoria = p.Id_categoria
  )
GROUP BY p.Id_proyecto, p.Titulo, cat.Categoria, p.Meta_financiamiento
ORDER BY Total_recaudado DESC
LIMIT 5;