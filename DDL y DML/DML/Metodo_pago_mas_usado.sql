SELECT
    mp.Metodo_pago,
    COUNT(d.Id_donacion) AS Numero_transacciones,
    SUM(d.Monto)           AS Monto_total,
    ROUND(AVG(d.Monto), 2)  AS Ticket_promedio
FROM Metodos_pagos mp
LEFT JOIN Donaciones d ON mp.Id_metodo_pago = d.Id_metodo_pago
GROUP BY mp.Metodo_pago
ORDER BY Monto_total DESC;