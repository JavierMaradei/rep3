<?php

    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $data           = json_decode($_POST['data']);
    $orden          = filter_var($_POST['orden'], FILTER_SANITIZE_STRING);
    $tipoIngreso    = filter_var($_POST['tipoIngreso'], FILTER_SANITIZE_STRING);
    $reparador      = filter_var($_POST['reparador'], FILTER_SANITIZE_STRING);
    $cajon          = filter_var($_POST['cajon'], FILTER_SANITIZE_STRING);
    $arrayRespuesta = array();
    $usuarioId      = recuperaIdUsuario($_SESSION['usuario_id']);
    $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
    $fecha          = new DateTime();
    $formateadaArg  = $fecha->format("Y-m-d H:i:s");
    $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);

    if($tipoIngreso == 'P'){
        $estadoReparacion = 3;
    } else if ($tipoIngreso == 'R'){
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

            foreach ($data as $key => $value) {

                $idPieza = recuperaIdPieza($value->codigo);

                $query0 = " INSERT INTO rep3_diagnostico(
                                reparacion_id, 
                                pieza_id,
                                cantidad
                            ) VALUES (
                                '{$orden}',
                                '{$idPieza}',
                                '{$value->cantidad}'
                            )
                        ";

                $sentenciaSQL   = $conexion->prepare($query0);
                $respuesta0     = $sentenciaSQL->execute();
            }

            $query1 = " UPDATE 
                            rep3_reparaciones
                        SET
                            cajon               = '{$cajon}',
                            reparador_id        = '{$reparador}',
                            diagnosticador_id   = '{$usuarioId}',
                            fdiagnostico        = '{$formateadaArg}',
                            estado_id           = '{$estadoReparacion}'
                        WHERE
                            reparacion_id       = '{$orden}'     
                    ";

            $sentenciaSQL   = $conexion->prepare($query1);
            $respuesta1     = $sentenciaSQL->execute();        
                
            if($respuesta1){
                $arrayRespuesta['estado'] = 'Ok';
                $arrayRespuesta['mensaje'] = 'Transacción exitosa'; 
            } else {
                $arrayRespuesta['estado'] = 'Error';
            }
    
        } else {
            $arrayRespuesta['estado'] = 'Error perfil';
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }