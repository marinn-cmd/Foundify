SELECT
    d.Id_donacion,
    d.Monto,
    d.Fecha,
    d.Estado,
    u.Nombres        AS Donante,
    p.Titulo          AS Proyecto,
    mp.Metodo_pago
FROM Donaciones d
JOIN Usuarios u       ON d.Id_usuario     = u.Id_usuario
JOIN Proyectos p      ON d.Id_proyecto    = p.Id_proyecto
JOIN Metodos_pagos mp ON d.Id_metodo_pago = mp.Id_metodo_pago
ORDER BY d.Fecha DESC;