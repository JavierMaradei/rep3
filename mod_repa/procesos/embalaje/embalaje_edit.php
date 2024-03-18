<?php

    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $orden                      = filter_var($_POST['orden'], FILTER_SANITIZE_STRING);
    $estanteFichaEmbalaje       = filter_var($_POST['estanteFichaEmbalaje'], FILTER_SANITIZE_STRING);
    $observacionesFichaEmbalaje = filter_var($_POST['observacionesFichaEmbalaje'], FILTER_SANITIZE_STRING);
    $usuarioId                  = recuperaIdUsuario($_SESSION['usuario_id']);
    $conexion                   = conectar(DB_DSN, DB_USER, DB_PASS);
    $fecha                      = new DateTime();
    $formateadaArg              = $fecha->format("Y-m-d H:i:s");
    $perfilSirep                = recuperaPerfil($_SESSION['usuario_id']);
    $estadoReparacion           = 6; //Embalado
    $arrayRespuesta             = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        if($perfilSirep == 1){

            $query1 = " UPDATE 
                            rep3_reparaciones
                        SET
                            estante_id          = {$estanteFichaEmbalaje},
                            reparacion_detalle  = '{$observacionesFichaEmbalaje}',
                            embalador_id        = {$usuarioId},
                            fembalaje           = '{$formateadaArg}',
                            estado_id           = {$estadoReparacion}
                        WHERE
                            reparacion_id       = '{$orden}'     
                    ";

            $sentenciaSQL   = $conexion->prepare($query1);
            $respuesta1     = $sentenciaSQL->execute();        
                
            if($respuesta1){
                $arrayRespuesta['estado'] = 'ok';
            } else {
                $arrayRespuesta['estado'] = 'error';
            }
    
        } else {
            $arrayRespuesta['estado'] = 'Error perfil';
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }