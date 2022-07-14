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

    $productoCodigo         = filter_var($_POST['productoCodigo'], FILTER_SANITIZE_STRING);
    $productoMarca          = filter_var($_POST['productoMarca'], FILTER_SANITIZE_STRING);
    $productoFamilia        = filter_var($_POST['productoFamilia'], FILTER_SANITIZE_STRING);
    $productoDescripcion    = filter_var($_POST['productoDescripcion'], FILTER_SANITIZE_STRING);
    $productoCosto          = filter_var($_POST['productoCosto'], FILTER_SANITIZE_STRING);
    $productoMonoTri        = filter_var($_POST['productoMonoTri'], FILTER_SANITIZE_STRING);
    $productoSubirFoto      = filter_var($_POST['productoSubirFoto'], FILTER_SANITIZE_STRING);
    $productoActivo         = $productoActivo == 'true' ? 'S' : 'N';
    $productoCanjeable      = $productoCanjeable == 'true' ? 'S' : 'N';
    $fecha                  = new DateTime();
    $formateadaArg          = $fecha->format('Y-m-d');
    $perfilSirep            = recuperaPerfil($_SESSION['usuario_id']);


    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);

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
                            'sfl14.jpg'     
                        )
                    ";

            $sentenciaSQL= $conexion->prepare($query1);
            //var_dump($sentenciaSQL);
            $sentenciaSQL->execute();

            if($sentenciaSQL->rowCount() > 0){
                $arrayRespuesta['estado'] = 'Transacción exitosa';
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            } 

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    };