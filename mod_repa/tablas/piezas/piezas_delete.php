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

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $id             = $_GET['id'];
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);

        if($perfilSirep == 1){

            $query0         = "SELECT foto FROM rep3_piezas WHERE pieza_id = '{$id}'";
            $sentenciaSQL   = $conexion->prepare($query0);
            $sentenciaSQL   -> execute();
            $respuesta0     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

            $query1         = " DELETE FROM rep3_piezas WHERE pieza_id = '{$id}' ";
            $sentenciaSQL   = $conexion->prepare($query1);
            $sentenciaSQL   ->execute();
            
            if($sentenciaSQL->rowCount() > 0){
                $arrayRespuesta['estado'] = "Transacción exitosa";
                chdir('./adjuntos');
                unlink($respuesta0['foto']);
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            }

        } else {
            
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    };