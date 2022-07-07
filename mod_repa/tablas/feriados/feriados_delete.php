<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');

    $arrayRespuesta = array();

    if(empty($_SESSION['usuario'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        $conexion       = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
        $id             = $_GET['id'];
        $perfilSirep    = recuperaPerfil($_SESSION['usuario']);

        if($perfilSirep == 1 || $perfilSirep == 13 || $perfilSirep == 16){

            $query0 = "DELETE FROM tg_feriados WHERE feriado_id = '{$id}'";
            $sentenciaSQL= $conexion->prepare($query0);
            $sentenciaSQL->execute();
            
            if($sentenciaSQL->rowCount() > 0){
                $arrayRespuesta['estado'] = "Transacción exitosa";
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            } 

        } else {
            $arrayRespuesta['estado'] = "Error perfil"; 
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);

    }