<?php

    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta     = array();
    $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
    $orden              = filter_var($_POST['reparacionId'], FILTER_SANITIZE_STRING);
    $fechaDefault       = new DateTime("01-01-1900");
    $fechaDefault       = $fechaDefault->format("Y-m-d");
    $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);
    $usuarioId          = recuperaIdUsuario($_SESSION['usuario_id']);
    $estadoReparacion   = 6; //Embalado

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
                                remito_despacho     = '',
                                fresolucion         = '{$fechaDefault}',
                                finalizado          = 'N',
                                estado_id           = {$estadoReparacion},
                                finalizador_id      = 0
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
                $arrayRespuesta['estado'] = 'errOrden';
            }

        } else {
            $arrayRespuesta['estado'] = 'Error perfil';
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }