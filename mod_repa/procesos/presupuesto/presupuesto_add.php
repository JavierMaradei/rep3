<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $orden                          = filter_var($_POST['orden'], FILTER_SANITIZE_STRING);
    $tipoFichaPresupuesto           = filter_var($_POST['tipoFichaPresupuesto'], FILTER_SANITIZE_STRING);
    $atencionFichaPresupuesto       = filter_var($_POST['atencionFichaPresupuesto'], FILTER_SANITIZE_STRING);
    $numeroFichaPresupuesto         = filter_var($_POST['numeroFichaPresupuesto'], FILTER_SANITIZE_STRING);
    $cargoFichaPresupuesto          = filter_var($_POST['cargoFichaPresupuesto'], FILTER_SANITIZE_STRING);
    $costoFichaPresupuesto          = filter_var($_POST['costoFichaPresupuesto'], FILTER_SANITIZE_STRING);
    $observacionesFichaPresupuesto  = filter_var($_POST['observacionesFichaPresupuesto'], FILTER_SANITIZE_STRING);
    $usuarioId                      = recuperaIdUsuario($_SESSION['usuario_id']);
    $conexion                       = conectar(DB_DSN, DB_USER, DB_PASS);
    $fecha                          = new DateTime();
    $formateadaArg                  = $fecha->format("Y-m-d H:i:s");
    $perfilSirep                    = recuperaPerfil($_SESSION['usuario_id']);
    $arrayRespuesta                 = array();

    if($tipoFichaPresupuesto == 'P'){
        $estadoReparacion = 3;
    } else if ($tipoFichaPresupuesto == 'R'){
        $estadoReparacion = 4;
    } else {
        $estadoReparacion = 5;
    }

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        if($perfilSirep == 1){

            $query0 = " UPDATE 
                            rep3_reparaciones
                        SET
                            tipo_ingreso        = '{$tipoFichaPresupuesto}',
                            tipo_atencion       = {$atencionFichaPresupuesto},
                            numero_presupuesto  = '{$numeroFichaPresupuesto}',
                            forma_retiro_id     = {$cargoFichaPresupuesto},
                            presupuestador_id   = {$usuarioId},
                            fpresupuesto        = '{$formateadaArg}',
                            costo               = {$costoFichaPresupuesto},
                            observaciones       = '{$observacionesFichaPresupuesto}',
                            estado_id           = '{$estadoReparacion}' 
                        WHERE
                            reparacion_id       = '{$orden}'     
                    ";

            $sentenciaSQL   = $conexion->prepare($query0);
            $respuesta0     = $sentenciaSQL->execute();        
                
            if($respuesta0){

                $query1 = " INSERT INTO rep3_presupuestos_log(
                                reparacion_id, 
                                fecha,
                                usuario_id,
                                tipo_ingreso,
                                numero_presupuesto,
                                forma_retiro_id,
                                costo,
                                observaciones,
                                estado_id
                            ) VALUES (
                                '{$orden}',
                                '{$formateadaArg}',
                                {$usuarioId},
                                '{$tipoFichaPresupuesto}',
                                '{$numeroFichaPresupuesto}',
                                {$cargoFichaPresupuesto},
                                {$costoFichaPresupuesto},
                                '{$observacionesFichaPresupuesto}',
                                '{$estadoReparacion}'
                            )
                        ";

                $sentenciaSQL   = $conexion->prepare($query1);
                $respuesta1     = $sentenciaSQL->execute();
            } 

            if($respuesta0 && $respuesta1){
                $arrayRespuesta['estado'] = 'ok';
            } else {
                $arrayRespuesta['estado'] = 'er';
            }
    
        } else {
            $arrayRespuesta['estado'] = 'Error perfil';
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }