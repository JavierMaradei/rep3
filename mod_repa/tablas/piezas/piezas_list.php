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
                        rep3_piezas.pieza_id,
                        rep3_piezas.codigo,
                        rep3_piezas.referencia,
                        rep3_piezas.marca_id,
                        rep3_marcas.descripcion as marca,
                        rep3_piezas.descripcion,
                        rep3_piezas.costo,
                        rep3_piezas.activo,
                        rep3_piezas.foto
                    FROM 
                        rep3_piezas
                    INNER JOIN
                        rep3_marcas
                    ON 
                        rep3_piezas.marca_id = rep3_marcas.marca_id
                ";           
    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);