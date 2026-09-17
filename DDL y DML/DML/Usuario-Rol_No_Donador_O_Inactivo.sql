SELECT Id_usuario, Nombres, Apellidos, Rol, Estado
FROM Usuarios
WHERE Estado = '0'
   OR Rol <> 'donador';