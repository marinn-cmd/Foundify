SELECT
    p.Id_proyecto,
    p.Titulo,
    COUNT(DISTINCT l.Id_usuario) AS Total_likes,
    COUNT(DISTINCT c.`Id_ comentario`) AS Total_comentarios
FROM Proyectos p
LEFT JOIN Likes l      ON p.Id_proyecto = l.Id_proyecto
LEFT JOIN Comentarios c ON p.Id_proyecto = c.Id_proyecto
GROUP BY p.Id_proyecto, p.Titulo
ORDER BY Total_likes DESC, Total_comentarios DESC;