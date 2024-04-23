<?php
    session_start();
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $id             = $_GET['id'];
        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);

        $query          = "SELECT pieza_id FROM rep3_diagnostico WHERE pieza_id = '{$id}'";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $query1         = "SELECT pieza_id FROM rep3_piezas_rel_productos WHERE pieza_id = '{$id}'";           
        $sentenciaSQL   = $conexion->prepare($query1);
        $sentenciaSQL   -> execute();
        $resultado1     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        if(empty($resultado) && empty($resultado1)){
            $arrayRespuesta = '';
        } else {
            $arrayRespuesta = 'error';
        }


        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }