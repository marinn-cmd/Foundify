SELECT
    u.Id_usuario,
    u.Nombres,
    u.Apellidos,
    COUNT(d.Id_donacion) AS Cantidad_donaciones,
    SUM(d.Monto)          AS Total_donado,
    AVG(d.Monto)           AS Promedio_donado
FROM Usuarios u
JOIN Donaciones d ON u.Id_usuario = d.Id_usuario
WHERE d.Estado = 'completada'
GROUP BY u.Id_usuario, u.Nombres, u.Apellidos
ORDER BY Total_donado DESC;