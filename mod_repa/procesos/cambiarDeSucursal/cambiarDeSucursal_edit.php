<?php

    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta     = array();
    $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
    $orden              = filter_var($_POST['reparacionId'], FILTER_SANITIZE_STRING);
    $sucursal           = filter_var($_POST['sucursal'], FILTER_SANITIZE_STRING);
    $remitoSucursal     = filter_var($_POST['remitoSucursal'], FILTER_SANITIZE_STRING);
    $fecha              = new DateTime();
    $formateadaArg      = $fecha->format("Y-m-d H:i:s");
    $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);
    $usuarioId          = recuperaIdUsuario($_SESSION['usuario_id']);

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        if($perfilSirep == 1){

            if(!empty($orden)){
                $query1 = " UPDATE 
                                rep3_reparaciones
                            SET
                                sucursal_id         = {$sucursal},
                                remito_sucursal     = '{$remitoSucursal}'
                            WHERE
                                reparacion_id       = '{$orden}'     
                        ";

                $sentenciaSQL   = $conexion->prepare($query1);
                $respuesta1     = $sentenciaSQL->execute();   

                $query2 = " INSERT INTO rep3_reparaciones_traslados (
                                reparacion_id,
                                fecha,
                                sucursal_id,
                                usuario_id,
                                remito_sucursal
                            ) VALUES (
                                {$orden},
                                '{$formateadaArg}',
                                {$sucursal},
                                {$usuarioId},
                                '{$remitoSucursal}'
                            )    
                        ";

                $sentenciaSQL   = $conexion->prepare($query2);
                $respuesta2     = $sentenciaSQL->execute();   
                
                if($respuesta1 && $respuesta2){
                    $arrayRespuesta['estado'] = 'ok';
                } else {
                    $arrayRespuesta['estado'] = 'Error';
                }
            } else {
                $arrayRespuesta['estado'] = 'errOrden';
            }

        } else {
            $arrayRespuesta['estado'] = 'Error perfil';
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }