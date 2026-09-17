SELECT
    u.Id_usuario,
    u.Nombres,
    u.Apellidos,
    SUM(d.Monto) AS Total_donado
FROM Usuarios u
JOIN Donaciones d ON u.Id_usuario = d.Id_usuario
WHERE d.Estado = 'completada'
GROUP BY u.Id_usuario, u.Nombres, u.Apellidos
HAVING SUM(d.Monto) > (
    SELECT AVG(Monto) FROM Donaciones WHERE Estado = 'completada'
)
ORDER BY Total_donado DESC;