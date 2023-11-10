<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query      = " SELECT 
                        COUNT(rep3_reparaciones.reparacion_id) as total
                    FROM 
                        rep3_reparaciones
                    WHERE 
                        rep3_reparaciones.estado_id = '1'
                    AND
                        rep3_reparaciones.hoja_ruta = 'S'
                    AND
                        rep3_reparaciones.lugar_recepcion_id = '2'
                    AND
                        rep3_reparaciones.anulado <> 'S'
                ";          
    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();
    $resultado= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

    $query2     = " SELECT
                        COUNT(rep3_reparaciones.tecnico_id) as contador,
                        CONCAT(trim(rep3_usuarios.apellido),', ',trim(rep3_usuarios.nombre))    as tecnico
                    FROM 
                        rep3_reparaciones
                    LEFT JOIN
                        rep3_usuarios
                    ON
                        rep3_reparaciones.tecnico_id = rep3_usuarios.usuario_id
                    WHERE 
                        rep3_reparaciones.estado_id = '1'
                    AND
                        rep3_reparaciones.lugar_recepcion_id = '2'
                    AND
                        rep3_reparaciones.anulado <> 'S'
                    GROUP BY 
                        rep3_reparaciones.tecnico_id
                ";          
    $sentenciaSQL= $conexion->prepare($query2);
    $sentenciaSQL->execute();
    $resultado2= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    $respuesta['total']     = $resultado;
    $respuesta['detalle']   = $resultado2;

    header("Content-type: aplication/json");
    echo json_encode($respuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);