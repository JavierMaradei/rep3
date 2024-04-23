<?php
    session_start();
    include_once('../../includes/funciones.php');
    include_once('../../includes/config.php');
    
    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    $orden      = $_GET['orden'];

    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query      = "SELECT reparacion_id FROM rep3_diagnostico WHERE reparacion_id = '{$orden}'"; 

    $sentenciaSQL   = $conexion->prepare($query);
    $sentenciaSQL   ->execute();
    $resultado      = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);