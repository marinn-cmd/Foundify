SELECT
    Id_proyecto, Titulo, Estado, Fecha_limite,
    DATEDIFF(Fecha_limite, CURDATE()) AS Dias_restantes
FROM Proyectos
WHERE Estado IN ('en financiamiento', 'abierta')
  AND Fecha_limite BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 60 DAY)
ORDER BY Fecha_limite ASC;