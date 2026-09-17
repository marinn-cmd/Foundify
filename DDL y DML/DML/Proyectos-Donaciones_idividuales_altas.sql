SELECT d.Id_donacion, d.Monto, p.Titulo, u.Nombres
FROM Donaciones d
JOIN Proyectos p ON d.Id_proyecto = p.Id_proyecto
JOIN Usuarios u  ON d.Id_usuario  = u.Id_usuario
WHERE d.Monto = (SELECT MAX(Monto) FROM Donaciones);