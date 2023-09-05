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
        
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $productoId = $_GET['productoId'];

        $query  = " SELECT 
                        rep3_piezas_rel_productos.pieza_producto_id, 
                        rep3_piezas_rel_productos.pieza_id, 
                        rep3_piezas_rel_productos.producto_id, 
                        rep3_piezas.codigo      as piezaCodigo,
                        rep3_piezas.referencia  as piezaReferencia,
                        rep3_piezas.descripcion as piezaDescripcion,
                        rep3_marcas.descripcion as marcaDescripcion
                    FROM 
                        rep3_piezas_rel_productos
                    INNER JOIN
                        rep3_piezas
                    ON 
                        rep3_piezas_rel_productos.pieza_id = rep3_piezas.pieza_id
                    INNER JOIN
                        rep3_productos
                    ON 
                        rep3_piezas_rel_productos.producto_id = rep3_productos.producto_id
                    INNER JOIN
                        rep3_marcas
                    ON 
                        rep3_productos.marca_id = rep3_marcas.marca_id
                    WHERE 
                        rep3_piezas_rel_productos.producto_id = '{$productoId}'
                "; 

        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }