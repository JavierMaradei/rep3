<?php
    session_start();
    include_once('../../includes/funciones.php');
    include_once('../../includes/config.php');

    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'GET'){

        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $query      = "SELECT perfil_id FROM rep3_usuarios WHERE email = '{$_SESSION['usuario_id']}'"; 

        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   ->execute();
        $resultado      = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }