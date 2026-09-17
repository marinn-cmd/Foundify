SELECT
    cat.Categoria,
    COUNT(p.Id_proyecto)          AS Cantidad_proyectos,
    AVG(p.Meta_financiamiento)     AS Promedio_meta,
    MAX(p.Meta_financiamiento)     AS Meta_mas_alta,
    MIN(p.Meta_financiamiento)     AS Meta_mas_baja
FROM Categorias cat
LEFT JOIN Proyectos p ON cat.Id_categoria = p.Id_categoria
GROUP BY cat.Categoria
ORDER BY Cantidad_proyectos DESC;