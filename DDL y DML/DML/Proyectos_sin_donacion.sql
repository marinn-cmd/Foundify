SELECT Id_proyecto, Titulo, Estado, Fecha_limite
FROM Proyectos
WHERE Id_proyecto NOT IN (
    SELECT DISTINCT Id_proyecto
    FROM Donaciones
    WHERE Id_proyecto IS NOT NULL
);