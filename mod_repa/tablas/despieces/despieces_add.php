<?php
    session_start();
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);
        $usuario        = $_SESSION['usuario_id'];
        $detalleTabla   = json_decode($_POST['detalleProductoDespiece']);
        $productoId     = $_POST['productoId'];

        if($perfilSirep == 1){
            $query01         = "DELETE FROM rep3_piezas_rel_productos WHERE producto_id = '{$productoId}'";
            $sentenciaSQL   = $conexion->prepare($query01);
            $sentenciaSQL   -> execute();

            if($sentenciaSQL->rowCount() >= 0){
                foreach ($detalleTabla as $key => $value) {
    
                    $query02 = " INSERT INTO rep3_piezas_rel_productos (
                                pieza_id,
                                producto_id,
                                usuario_mod
                                ) VALUES (
                                {$value -> idPieza},
                                '{$value -> idProducto}',
                                '{$usuario}'
                                )
                            ";

                    $sentenciaSQL2   = $conexion->prepare($query02);
                    $respuesta2     = $sentenciaSQL2->execute();
                }
        
                if($sentenciaSQL2->rowCount() > 0){
                    $arrayRespuesta['estado'] = "Transacción exitosa";
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
                }
            } else {
                $arrayRespuesta['estado'] = "err delete";
            }
        } else {
            $arrayRespuesta['estado'] = "Error perfil";
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);

    }