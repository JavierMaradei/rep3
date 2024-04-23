<?php

    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $orden              = filter_var($_POST['orden'], FILTER_SANITIZE_STRING);
    $arrayRespuesta     = array();
    $usuarioId          = recuperaIdUsuario($_SESSION['usuario_id']);
    $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
    $fecha              = new DateTime();
    $formateadaArg      = $fecha->format("Y-m-d H:i:s");
    $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);
    $estadoReparacion   = 5; //En embalaje
    $mensaje            = '';

    if($_POST['reparadoEnDomicilio'] == 'true'){
        $estadoReparacion   = 6;
        $mensaje = 'La orden no pasa por embalaje, se repara en el domicilio del cliente.';
    }

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
                            armado              = 'S',
                            reparador_id        = '{$usuarioId}',
                            farmado             = '{$formateadaArg}',
                            estado_id           = '{$estadoReparacion}',
                            reparacion_detalle  = '{$mensaje}'
                        WHERE
                            reparacion_id       = '{$orden}'     
                    ";

            $sentenciaSQL   = $conexion->prepare($query1);
            $respuesta1     = $sentenciaSQL->execute();        
                
            if($respuesta1){
                $arrayRespuesta['estado'] = 'ok';
            } else {
                $arrayRespuesta['estado'] = 'Error';
            }
    
        } else {
            $arrayRespuesta['estado'] = 'Error perfil';
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }