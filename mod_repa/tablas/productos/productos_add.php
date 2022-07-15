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
        $productoCodigo         = filter_var($_POST['productoCodigo'], FILTER_SANITIZE_STRING);
        $productoMarca          = filter_var($_POST['productoMarca'], FILTER_SANITIZE_STRING);
        $productoFamilia        = filter_var($_POST['productoFamilia'], FILTER_SANITIZE_STRING);
        $productoDescripcion    = filter_var($_POST['productoDescripcion'], FILTER_SANITIZE_STRING);
        $productoCosto          = filter_var($_POST['productoCosto'], FILTER_SANITIZE_STRING);
        $productoMonoTri        = filter_var($_POST['productoMonoTri'], FILTER_SANITIZE_STRING);
        $productoSubirFoto      = filter_var($_POST['productoSubirFoto'], FILTER_SANITIZE_STRING);
        $productoActivo         = filter_var($_POST['productoActivo'], FILTER_SANITIZE_STRING);
        $productoCanjeable      = filter_var($_POST['productoCanjeable'], FILTER_SANITIZE_STRING);
        $productoActivo         = $productoActivo == 'true' ? 'S' : 'N';
        $productoCanjeable      = $productoCanjeable == 'true' ? 'S' : 'N';
        $fecha                  = new DateTime();
        $formateadaArg          = $fecha->format('Y-m-d');
        $perfilSirep            = recuperaPerfil($_SESSION['usuario_id']);
        $archivoAdjunto['0']    = false;
        $archivoAdjunto['2']    = '';

        if($productoSubirFoto != ''){
            $archivoAdjunto = subirArchivo($_FILES['archivoAdjunto']['error'], $_FILES['archivoAdjunto']['type'], $_FILES['archivoAdjunto']['tmp_name'], $_FILES['archivoAdjunto']['name']);
        }

        if($archivoAdjunto['0'] == false){
            if($perfilSirep == 1){

                $query1 = " INSERT INTO rep3_productos (
                                codigo, 
                                marca_id, 
                                familia_id, 
                                descripcion, 
                                costo_estimado, 
                                activo,
                                fmodificacion,
                                mono_tri,
                                canje_flag,
                                foto
                            ) VALUES (
                                '{$productoCodigo}', 
                                '{$productoMarca}', 
                                '{$productoFamilia}', 
                                '{$productoDescripcion}', 
                                '{$productoCosto}', 
                                '{$productoActivo}', 
                                '{$formateadaArg}', 
                                '{$productoMonoTri}', 
                                '{$productoCanjeable}', 
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
                $arrayRespuesta['estado'] = "Error perfil";  
            }
        } else {
            $arrayRespuesta['estado'] = "Error adjunto";
            $arrayRespuesta['msgError'] = $archivoAdjunto['1'];
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    };