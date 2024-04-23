<?php

    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    $data               = json_decode($_POST['data']);
    $orden              = filter_var($_POST['orden'], FILTER_SANITIZE_STRING);
    $tipoIngreso        = filter_var($_POST['tipoIngreso'], FILTER_SANITIZE_STRING);
    $reparador          = filter_var($_POST['reparador'], FILTER_SANITIZE_STRING);
    $cajon              = filter_var($_POST['cajon'], FILTER_SANITIZE_STRING);
    $detalleDiagnostico = filter_var($_POST['detalleDiagnostico'], FILTER_SANITIZE_STRING);
    $lugarReparacion    = $_POST['reparadoEnTaller'] == 'true' ? 'T' : 'D';
    $arrayRespuesta     = array();
    $usuarioId          = recuperaIdUsuario($_SESSION['usuario_id']);
    $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
    $fecha              = new DateTime();
    $formateadaArg      = $fecha->format("Y-m-d H:i:s");
    $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);
    $cantAdjuntos       = count($_FILES);
    $subida             = true;

    switch ($tipoIngreso) {
        case 'P':
            $estadoReparacion = 3;
            break;
        case 'R':
            $estadoReparacion = 4;
            break;
        default:
            $estadoReparacion = 6;
            break;
    }

    if($cantAdjuntos > 6){
        $arrayRespuesta['estado']   = "Error adjunto";
        $arrayRespuesta['mensaje']  = "Máximo de 6 adjuntos superado";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta);
        exit(); 
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if(!empty($_FILES)){
            foreach ($_FILES as $key => $value) {
    
                if($value['error'] == UPLOAD_ERR_OK){
    
                    $extensiones = array('image/jpeg', 'image/png', 'application/x-zip-compressed', 'application/pdf');
                    
                    if(in_array($value['type'], $extensiones)){
                        
                        if($value['size'] < 4194304){ //valor expresado en bytes | equivale a 4mb | cada mega son 1048576 bytes
                            
                            $nombreArchivoDestino                   = uniqid().$value['name'];
                            $arrayRespuesta['file'][$key]['name']   = $nombreArchivoDestino;
                            $arrayRespuesta['file'][$key]['size']   = $value['size'];
        
                            if (move_uploaded_file($value['tmp_name'], './adjuntos/'.$nombreArchivoDestino)) {
                                $error = false;
                                $arrayRespuesta['mensaje'][$key] = "OK";
                            } else {
                                $error = true;
                                $arrayRespuesta['mensaje'][$key] = "Error al subir el archivo";
                            }
                            
                        } else {
                            $arrayRespuesta['mensaje'][$key] = "El adjunto supera el límite de 4Mb permitidos. ";
                        }
        
                    } else {
                        $arrayRespuesta['mensaje'][$key] = "Los formatos permitídos de subida son jpg, png, pdf y zip";
                    }
        
                } else {
                    $arrayRespuesta['mensaje'][$key] = "Falló la subida del archivo o no hay archivo"; 
                }
            }
        } 
    
        foreach ($arrayRespuesta['mensaje'] as $key => $value) {
            if($value != "OK"){
                $subida = false;
            }
        }
    
        if($subida || empty($_FILES)){

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
                                estado_id           = '{$estadoReparacion}',
                                diagnostico_detalle = '{$detalleDiagnostico}',
                                lugar_reparacion    = '{$lugarReparacion}'
                            WHERE
                                reparacion_id       = '{$orden}'     
                        ";
    
                $sentenciaSQL   = $conexion->prepare($query1);
                $respuesta1     = $sentenciaSQL->execute();        
                    
                if($respuesta1){
                    foreach ($arrayRespuesta['file'] as $key => $value) {
            
                        $query2 = " INSERT INTO rep3_rel_reparaciones_adjuntos (
                                        reparacion_id,
                                        descripcion,
                                        fecha,
                                        size,
                                        usuario_id
                                    ) VALUES (
                                        '{$orden}',
                                        '{$value['name']}',
                                        '{$formateadaArg}',
                                        '{$value['size']}',
                                        '{$usuarioId}'
                                    ) 
                                ";
                        $sentenciaSQL       = $conexion->prepare($query2);
                        $respuesta2[$key]   = $sentenciaSQL->execute();
                    }

                    $r2 = true;
                    foreach ($respuesta2 as $key => $value) {
                        if(!$value){
                            $r2 = false;
                        }
                    }
                } 

                if($respuesta1 && $r2){
                    $arrayRespuesta['estado'] = 'ok';
                } else {
                    $arrayRespuesta['estado'] = 'error';
                }
            } else {
                $arrayRespuesta['estado'] = 'Error perfil';
            }
        } else {
            $arrayRespuesta['estado'] = "Error adjunto";
        }
    
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }



