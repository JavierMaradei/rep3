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
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query      = " SELECT 
                        rep3_productos.producto_id,
                        rep3_productos.codigo,
                        rep3_productos.marca_id,
                        rep3_marcas.descripcion as marca,
                        rep3_productos.familia_id,
                        rep3_familias.descripcion as familia,
                        rep3_productos.descripcion,
                        rep3_productos.costo_estimado,
                        rep3_productos.activo,
                        rep3_productos.mono_tri,
                        rep3_productos.canje_flag,
                        rep3_productos.foto,
                        rep3_productos.fmodificacion
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
                ";           
    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);