<?php
    session_start();
    $_COOKIE['modulo'] == '33' ? date_default_timezone_set('America/Mexico_City') : date_default_timezone_set('America/Argentina/Buenos_Aires');
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

    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion       = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
        $descripcion    = filter_var($_POST['descripcionFeriados'], FILTER_SANITIZE_STRING);
        $fecha          = new DateTime($_POST['fechaFeriados']);
        $formateada     = $fecha ->format('d/m/Y');
        $combo          = $formateada.' '.$descripcion;
        $perfilSirep    = recuperaPerfil($_SESSION['usuario']);
        if(MODO == 'dev'){
            $formateadaArg = $fecha->format('d-m-Y');
        } else {
            $formateadaArg = $fecha->format('Y-m-d');
        }

        $query0 = "SELECT TOP (1) FERIADO_ID FROM TG_FERIADOS ORDER BY FERIADO_ID DESC";
        $sentenciaSQL= $conexion->prepare($query0);
        $sentenciaSQL->execute();
        $ultimoId = $sentenciaSQL->fetch();
        $idIncrementado = ++$ultimoId[0];

        $query1         = "SELECT TOP (1) FERIADO_ID FROM TG_FERIADOS WHERE FECHA = '{$formateadaArg}'";
        $sentenciaSQL   = $conexion->prepare($query1);
        $sentenciaSQL   -> execute();
        $duplicado      = $sentenciaSQL->fetch();

        if($perfilSirep == 1 || $perfilSirep == 13 || $perfilSirep == 16){

            if(!$duplicado){
                if(!empty($descripcion)){
                    $query =    "INSERT INTO tg_feriados (
                                feriado_id,
                                fecha,
                                descripcion,
                                combo
                                ) VALUES (
                                '{$idIncrementado}',
                                '{$formateadaArg}',
                                '{$descripcion}',
                                '{$combo}'
                                )
                            ";
                    $sentenciaSQL= $conexion->prepare($query);
                    $sentenciaSQL->execute();

                    if($sentenciaSQL->rowCount() > 0){
                        $arrayRespuesta['estado'] = "Transacción exitosa";
                    } else {
                        $arrayRespuesta['estado'] = "Algo salió mal";
                    }
                }
            } else {
                $arrayRespuesta['estado'] = "duplicado";
            }

        } else {
            $arrayRespuesta['estado'] = "Error perfil";
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);

    }