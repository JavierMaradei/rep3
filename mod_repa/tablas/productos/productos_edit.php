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

        $conexion                       = conectar(DB_DSN, DB_USER, DB_PASS);
        $id                             = $_GET['id'];
        $productoCodigo                 = filter_var($_POST['productoCodigo'], FILTER_SANITIZE_STRING);
        $productoMarca                  = filter_var($_POST['productoMarca'], FILTER_SANITIZE_STRING);
        $productoFamilia                = filter_var($_POST['productoFamilia'], FILTER_SANITIZE_STRING);
        $productoDescripcion            = filter_var($_POST['productoDescripcion'], FILTER_SANITIZE_STRING);
        $productoCosto                  = filter_var($_POST['productoCosto'], FILTER_SANITIZE_STRING);
        $productoMonoTri                = filter_var($_POST['productoMonoTri'], FILTER_SANITIZE_STRING);
        $productoSubirFoto              = filter_var($_POST['productoSubirFoto'], FILTER_SANITIZE_STRING);
        $productoSubirFotoDespiece      = filter_var($_POST['productoSubirFotoDespiece'], FILTER_SANITIZE_STRING);
        $productoActivo                 = filter_var($_POST['productoActivo'], FILTER_SANITIZE_STRING);
        $productoCanjeable              = filter_var($_POST['productoCanjeable'], FILTER_SANITIZE_STRING);
        $productoActivo                 = $productoActivo == 'true' ? 'S' : 'N';
        $productoCanjeable              = $productoCanjeable == 'true' ? 'S' : 'N';
        $fecha                          = new DateTime();
        $formateadaArg                  = $fecha->format('Y-m-d');
        $perfilSirep                    = recuperaPerfil($_SESSION['usuario_id']);
        $archivoAdjunto['0']            = false;
        $archivoAdjuntoDespiece['0']    = false;

        $query0         = "SELECT foto, foto_despiece FROM rep3_productos WHERE producto_id = '{$id}'";
        $sentenciaSQL   = $conexion->prepare($query0);
        $sentenciaSQL   -> execute();
        $respuesta0     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        $archivoAdjunto['2']            = $respuesta0['foto'];
        $archivoAdjuntoDespiece['2']    = $respuesta0['foto_despiece'];

        if($productoSubirFoto != ''){
            $archivoAdjunto = subirArchivo($_FILES['archivoAdjunto']['error'], $_FILES['archivoAdjunto']['type'], $_FILES['archivoAdjunto']['tmp_name'], $_FILES['archivoAdjunto']['name']);
        }

        if($productoSubirFotoDespiece != ''){
            $archivoAdjuntoDespiece = subirArchivo($_FILES['archivoAdjuntoDespiece']['error'], $_FILES['archivoAdjuntoDespiece']['type'], $_FILES['archivoAdjuntoDespiece']['tmp_name'], $_FILES['archivoAdjuntoDespiece']['name']);
        }

        if($archivoAdjunto['0'] == false && $archivoAdjuntoDespiece['0'] == false){
            if($perfilSirep == 1){

                $query00 = "SELECT codigo FROM rep3_productos WHERE codigo = '{$productoCodigo}' AND producto_id <> '{$id}' AND marca_id = '{$productoMarca}'";
                $sentenciaSQL= $conexion->prepare($query00);
                $sentenciaSQL->execute();
                $respuesta00 = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

                if(empty($respuesta00)){
                    $query = "  UPDATE 
                                    rep3_productos 
                                SET 
                                    codigo          = '{$productoCodigo}', 
                                    marca_id        = '{$productoMarca}', 
                                    familia_id      = '{$productoFamilia}', 
                                    descripcion     = '{$productoDescripcion}', 
                                    costo_estimado  = '{$productoCosto}', 
                                    activo          = '{$productoActivo}',
                                    fmodificacion   = '{$formateadaArg}',
                                    mono_tri        = '{$productoMonoTri}',
                                    canje_flag      = '{$productoCanjeable}',
                                    foto            = '{$archivoAdjunto['2']}',     
                                    foto_despiece   = '{$archivoAdjuntoDespiece['2']}'     
                                WHERE 
                                    producto_id     = '{$id}'
                            ";

                    $sentenciaSQL   = $conexion->prepare($query);
                    $respuesta      = $sentenciaSQL->execute();

                    if($respuesta){
                        $arrayRespuesta['estado'] = "Transacción exitosa";
                        if($productoSubirFoto != ''){
                            chdir('./adjuntos');
                            unlink($respuesta0['foto']);
                        }
                        if($productoSubirFotoDespiece != ''){
                            chdir('./adjuntos');
                            unlink($respuesta0['foto_despiece']);
                        }
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
            $arrayRespuesta['msgError'] = $archivoAdjunto['1'].' '.$archivoAdjuntoDespiece['1'];
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }