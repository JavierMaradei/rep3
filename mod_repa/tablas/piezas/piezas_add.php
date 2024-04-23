<?php
    session_start();
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $conexion               = conectar(DB_DSN, DB_USER, DB_PASS);
        $piezaCodigo            = filter_var($_POST['piezaCodigo'], FILTER_SANITIZE_STRING);
        $piezaMarca             = filter_var($_POST['piezaMarca'], FILTER_SANITIZE_STRING);
        $piezaRef               = filter_var($_POST['piezaRef'], FILTER_SANITIZE_STRING);
        $piezaDescripcion       = filter_var($_POST['piezaDescripcion'], FILTER_SANITIZE_STRING);
        $piezaCosto             = filter_var($_POST['piezaCosto'], FILTER_SANITIZE_STRING);
        $piezaSubirFoto         = filter_var($_POST['piezaSubirFoto'], FILTER_SANITIZE_STRING);
        $piezaActivo            = filter_var($_POST['piezaActivo'], FILTER_SANITIZE_STRING);
        $piezaActivo            = $piezaActivo == 'true' ? 'S' : 'N';
        $fecha                  = new DateTime();
        $formateadaArg          = $fecha->format('Y-m-d');
        $perfilSirep            = recuperaPerfil($_SESSION['usuario_id']);
        $archivoAdjunto['0']    = false;
        $archivoAdjunto['2']    = '';

        if($piezaSubirFoto != ''){
            $archivoAdjunto = subirArchivo($_FILES['archivoAdjunto']['error'], $_FILES['archivoAdjunto']['type'], $_FILES['archivoAdjunto']['tmp_name'], $_FILES['archivoAdjunto']['name']);
        }

        if($archivoAdjunto['0'] == false){
            if($perfilSirep == 1){

                $query00 = "SELECT codigo FROM rep3_piezas WHERE codigo = '{$piezaCodigo}' AND marca_id = '{$piezaMarca}'";
                $sentenciaSQL= $conexion->prepare($query00);
                $sentenciaSQL->execute();
                $respuesta00 = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

                if(empty($respuesta00)){
                    $query1 = " INSERT INTO rep3_piezas (
                                    codigo, 
                                    referencia,
                                    marca_id, 
                                    descripcion, 
                                    costo, 
                                    activo,
                                    fmodificacion,
                                    foto
                                ) VALUES (
                                    '{$piezaCodigo}', 
                                    '{$piezaRef}', 
                                    '{$piezaMarca}', 
                                    '{$piezaDescripcion}', 
                                    '{$piezaCosto}', 
                                    '{$piezaActivo}', 
                                    '{$formateadaArg}',  
                                    '{$archivoAdjunto[2]}'     
                                )
                            ";

                    $sentenciaSQL= $conexion->prepare($query1);
                    $sentenciaSQL->execute();

                    if($sentenciaSQL->rowCount() > 0){
                        $arrayRespuesta['estado'] = 'Transacción exitosa';
                    } else {
                        $arrayRespuesta['estado'] = "Algo salió mal";
                    } 
                } else {
                    $arrayRespuesta['estado'] = "duplicado";  
                }   
            } else {
                $arrayRespuesta['estado'] = "Error perfil";  
            }
        } else {
            $arrayRespuesta['estado'] = "Error adjunto";
            $arrayRespuesta['msgError'] = $archivoAdjunto['1'];
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    };