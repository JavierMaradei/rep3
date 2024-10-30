<?php
    session_start();
    include_once('../../includes/funciones.php');
    include_once('../../includes/config.php');

    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'GET'){

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $id             = $_GET['id'];
        $arrayRespuesta = array();

        $query1 = " SELECT 
                        reparacion_id, 
                        freparacion, 
                        tecnico_id,
                        coordinado
                    FROM 
                        rep3_reparaciones 
                    WHERE 
                        reparacion_id = {$id}
                "; 

        $sentenciaSQL   = $conexion->prepare($query1);
        $sentenciaSQL   ->execute();
        $respuesta1     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        $query2 = " SELECT 
                        rep3_rel_seguimiento_pedido.observacion_seguimiento_id, 
                        rep3_rel_seguimiento_pedido.fecha, 
                        rep3_observaciones_seguimiento.descripcion
                    FROM 
                        rep3_rel_seguimiento_pedido
                    INNER JOIN
                        rep3_observaciones_seguimiento
                    ON
                        rep3_rel_seguimiento_pedido.observacion_seguimiento_id = rep3_observaciones_seguimiento.observacion_seguimiento_id
                    WHERE 
                        rep3_rel_seguimiento_pedido.reparacion_id = {$id}
                "; 

        $sentenciaSQL   = $conexion->prepare($query2);
        $sentenciaSQL   ->execute();
        $respuesta2     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $query3 = " SELECT 
                        observacion_tecnico, 
                        fecha
                    FROM 
                        rep3_rel_obs_tecnico_pedido
                    WHERE 
                        reparacion_id = {$id}
                "; 

        $sentenciaSQL   = $conexion->prepare($query3);
        $sentenciaSQL   ->execute();
        $respuesta3     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $arrayRespuesta['data']                 = $respuesta1;
        $arrayRespuesta['data']['obsSeg']       = $respuesta2;
        $arrayRespuesta['data']['obsTecnico']   = $respuesta3;

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }