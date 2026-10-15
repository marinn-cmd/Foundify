<?php

require_once "conexion.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST"){

        $correo= trim($_POST["correo"]);
        $nueva_password = $_POST["nueva_password"];
        $confirmar_password = $_POST["confirmar_password"];

        if($nueva_password !== $confirmar_password){
            die("las contraseñas no coinciden");
        }

        try{
            $sql= "SELECT * FROM Usuarios where Email = ?";
            $stmt= $conn -> prepare($sql);
            $stmt -> execute([$correo]);
            $usuario = $stmt -> fetch();

            if($usuario){

                $password_encriptada = password_hash($nueva_password,PASSWORD_DEFAULT);
                $sql_update ="UPDATE Usuarios SET Password = ? WHERE Email = ?" ;
                $stmt_update = $conn -> prepare($sql_update);
                $stmt_update -> execute([$password_encriptada, $correo]);

                header("location: ../iniciosesion.php");
                exit;

            } else{
                die("no existe usuario con ese correo");
            }



        }catch(PDOException $e){
            die("Error al recuperar la contraseña: " . $e->getMessage());
        }
        

    }

    ?>