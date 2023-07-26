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

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion               = conectar(DB_DSN, DB_USER, DB_PASS);
        $id                     = $_GET['id'];
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

        $query0         = "SELECT foto FROM rep3_piezas WHERE pieza_id = '{$id}'";
        $sentenciaSQL   = $conexion->prepare($query0);
        $sentenciaSQL   -> execute();
        $respuesta0     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        $archivoAdjunto['2']    = $respuesta0['foto'];

        if($piezaSubirFoto != ''){
            $archivoAdjunto = subirArchivo($_FILES['archivoAdjunto']['error'], $_FILES['archivoAdjunto']['type'], $_FILES['archivoAdjunto']['tmp_name'], $_FILES['archivoAdjunto']['name']);
        }

        if($archivoAdjunto['0'] == false){
            if($perfilSirep == 1){
                $query = "  UPDATE 
                                rep3_piezas 
                            SET 
                                codigo          = '{$piezaCodigo}', 
                                marca_id        = '{$piezaMarca}', 
                                referencia      = '{$piezaRef}', 
                                descripcion     = '{$piezaDescripcion}', 
                                costo           = '{$piezaCosto}', 
                                activo          = '{$piezaActivo}',
                                fmodificacion   = '{$formateadaArg}',
                                foto            = '{$archivoAdjunto['2']}'     
                            WHERE 
                                pieza_id     = '{$id}'
                        ";
    
                $sentenciaSQL   = $conexion->prepare($query);
                $respuesta      = $sentenciaSQL->execute();
    
                if($respuesta){
                    $arrayRespuesta['estado'] = "Transacción exitosa";
                    if($piezaSubirFoto != ''){
                        chdir('./adjuntos');
                        unlink($respuesta0['foto']);
                    }
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
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
    }