<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    var_dump($_POST);
    exit();

    $arrayRespuesta     = array();
    $array              = array();
    $usuarioId          = recuperaIdUsuario($_SESSION['usuario_id']);
    $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
    $fecha              = new DateTime();
    $formateadaArg      = $fecha->format("Y-m-d H:i:s");
    $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $query3         = " SELECT reparacion_id FROM rep3_diagnostico WHERE reparacion_id = '{$array['ordenFicha']}' ";
        $sentenciaSQL   = $conexion->prepare($query3);
        $respuesta3     = $sentenciaSQL->execute();
        $respuesta3     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        if($respuesta3 == '') {

            if($perfilSirep == 1){

                foreach ($_POST as $key => $value) {
                    if($value == 'true'){
                        $value = 'S';
                    } else if($value == 'false'){
                        $value = 'N';
                    } else {
                        $value = filter_var($value, FILTER_SANITIZE_STRING);
                    }
                    
                    $array[$key] = $value;
                }
        
                $query0 = " INSERT INTO rep3_diagnostico(
                                reparacion_id, 
                                monofasica, 
                                trifasica, 
                                tension, 
                                presion_caneria, 
                                volumen_tanque_hidro,
                                estado_instalacion,
                                ruido_excesivo,
                                presion_exceso,
                                presion_baja,
                                caudal_bajo,
                                caudal_alto,
                                no_aspira,
                                valvula_retencion,
                                medida_tanque,
                                tanque_elevado,
                                tanque_cisterna,
                                funciona_intermitente,
                                no_arranca,
                                exceso_consumo,
                                motor_inundado,
                                press,
                                flow,
                                presostato,
                                capacitor,
                                roce_impulsor, 
                                induccion_motor, 
                                no_varia_velocidad, 
                                boluta_pinchada, 
                                sarro_en_bomba, 
                                perdidas, 
                                diametro_caneria_entrada, 
                                diametro_caneria_salida, 
                                observaciones, 
                                bobinado, 
                                buje_d, 
                                buje_t, 
                                impulsor, 
                                rotor_eje, 
                                juego_juntas, 
                                cable_ficha, 
                                vaso_expansion, 
                                pegado, 
                                flexibles, 
                                microswitch, 
                                tapa_sup, 
                                tapa_inf, 
                                sensor_sup_inf, 
                                aprobo_estanqueidad, 
                                pintura, 
                                cuerpo_motor, 
                                tubo_separador, 
                                disco_empuje, 
                                tornillos, 
                                cuerpo_impulsor
                            ) VALUES (
                                '{$array['ordenFicha']}',
                                '{$array['monofasica']}',
                                '{$array['trifasica']}',
                                '{$array['tension']}',
                                '{$array['presion_caneria']}',
                                '{$array['volumen_tanque_hidro']}',
                                '{$array['estado_instalacion']}',
                                '{$array['ruido_excesivo']}',
                                '{$array['presion_exceso']}',
                                '{$array['presion_baja']}',
                                '{$array['caudal_bajo']}',
                                '{$array['caudal_alto']}',
                                '{$array['no_aspira']}',
                                '{$array['valvula_retencion']}',
                                '{$array['medida_tanque']}',
                                '{$array['tanque_elevado']}',
                                '{$array['tanque_cisterna']}',
                                '{$array['funciona_intermitente']}',
                                '{$array['no_arranca']}',
                                '{$array['exceso_consumo']}',
                                '{$array['motor_inundado']}',
                                '{$array['press']}',
                                '{$array['flow']}',
                                '{$array['presostato']}',
                                '{$array['capacitor']}',
                                '{$array['roce_impulsor']}',
                                '{$array['induccion_motor']}',
                                '{$array['no_varia_velocidad']}',
                                '{$array['boluta_pinchada']}',
                                '{$array['sarro_en_bomba']}',
                                '{$array['perdidas']}',
                                '{$array['diametro_caneria_entrada']}',
                                '{$array['diametro_caneria_salida']}',
                                '{$array['observaciones']}',
                                '{$array['bobinado']}',
                                '{$array['buje_d']}',
                                '{$array['buje_t']}',
                                '{$array['impulsor']}',
                                '{$array['rotor_eje']}',
                                '{$array['juego_juntas']}',
                                '{$array['cable_ficha']}',
                                '{$array['vaso_expansion']}',
                                '{$array['pegado']}',
                                '{$array['flexibles']}',
                                '{$array['microswitch']}',
                                '{$array['tapa_superior']}',
                                '{$array['tapa_inferior']}',
                                '{$array['sensor_sup_inf']}',
                                '{$array['aprobo_estanqueidad']}',
                                '{$array['pintura']}',
                                '{$array['cuerpo_motor']}',
                                '{$array['tubo_separador']}',
                                '{$array['disco_empuje']}',
                                '{$array['tornillos']}',
                                '{$array['cuerpo_impulsor']}'
                            )
                        ";
        
                $sentenciaSQL   = $conexion->prepare($query0);
                $respuesta0     = $sentenciaSQL->execute();
        
                if($respuesta0){
        
                    $query1         = " SELECT tipo_ingreso FROM rep3_reparaciones WHERE reparacion_id = '{$array['ordenFicha']}' ";
                    $sentenciaSQL   = $conexion->prepare($query1);
                    $respuesta1     = $sentenciaSQL->execute();
                    $respuesta1     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
                    
                    if($respuesta1['tipo_ingreso'] == 'P'){
                        $estadoReparacion = 3;
                    } else if ($respuesta1['tipo_ingreso'] == 'R'){
                        $estadoReparacion = 4;
                    } else {
                        $estadoReparacion = 5;
                    }
        
                    $query2 = " UPDATE 
                                    rep3_reparaciones
                                SET
                                    cajon               = '{$array['cajonFichaDiagnostico']}',
                                    reparador_id        = '{$array['reparadorFichaDiagnostico']}',
                                    diagnosticador_id   = '{$usuarioId}',
                                    fdiagnostico        = '{$formateadaArg}',
                                    estado_id           = '{$estadoReparacion}'
                                WHERE
                                    reparacion_id       = '{$array['ordenFicha']}'     
                            ";
        
                    $sentenciaSQL   = $conexion->prepare($query2);
                    $respuesta2     = $sentenciaSQL->execute();        
                    
                    if($respuesta2){
                        $arrayRespuesta['estado'] = 'Ok';
                        $arrayRespuesta['mensaje'] = 'Transacción exitosa'; 
                    } else {
                        $arrayRespuesta['estado'] = 'Error';
                        $arrayRespuesta['mensaje'] = 'Código de error: Q2 - Contactar con soporte técnico';
                    }
        
                } else {
                    $arrayRespuesta['estado'] = 'Error';
                    $arrayRespuesta['mensaje'] = 'Código de error: Q0 - Contactar con soporte técnico';
                }
            } else {
                $arrayRespuesta['estado'] = 'Error perfil';
            }

        } else {
            $arrayRespuesta['estado'] = 'Error';
            $arrayRespuesta['mensaje'] = 'Código de error: Q3 - Orden con diagnóstico previo - Contactar con soporte técnico';
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }