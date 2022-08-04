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
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $code       = $_GET['code'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query      =   "SELECT 
                            rep3_productos.producto_id, 
                            rep3_productos.codigo, 
                            rep3_productos.marca_id, 
                            rep3_productos.familia_id, 
                            rep3_productos.descripcion, 
                            rep3_productos.costo_estimado,
                            rep3_productos.canje_flag,
                            rep3_marcas.descripcion as marca,
                            rep3_familias.descripcion as familia
                        FROM 
                            rep3_productos
                        INNER JOIN
                            rep3_marcas
                        ON 
                            rep3_productos.marca_id = rep3_marcas.marca_id
                        INNER JOIN
                            rep3_familias
                        ON
                            rep3_productos.familia_id = rep3_familias.familia_id
                        WHERE 
                            rep3_productos.codigo = '{$code}'
                        AND
                            rep3_productos.activo = 'S'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }