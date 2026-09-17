SELECT d.Id_donacion, d.Monto, d.Fecha, u.Nombres, p.Titulo
FROM Donaciones d
JOIN Usuarios u  ON d.Id_usuario  = u.Id_usuario
JOIN Proyectos p ON d.Id_proyecto = p.Id_proyecto
WHERE d.Estado = 'completada'
  AND d.Id_metodo_pago = 'MT1001'   -- efectivo
  AND d.Monto > 100000
ORDER BY d.Monto DESC;