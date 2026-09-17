SELECT Id_notificacion, Entidad, Mensaje, Fecha
FROM Notificaciones
WHERE Leido = 0
  AND Id_usuario = '1023456789'
ORDER BY Fecha DESC;