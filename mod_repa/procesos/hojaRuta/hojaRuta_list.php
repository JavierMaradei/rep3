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
                        rep3_reparaciones.reparacion_id,
                        rep3_reparaciones.cliente_id,
                        CONCAT(trim(rep3_clientes.apellido),', ',trim(rep3_clientes.nombre)) as cliente, 
                        rep3_clientes.localidad_id, 
                        rep3_clientes.calle, 
                        rep3_clientes.nro_calle, 
                        rep3_clientes.dpto,
                        rep3_localidades.provincia_id, 
                        rep3_localidades.descripcion as localidad,
                        rep3_provincias.descripcion as provincia,
                        CONCAT(trim(rep3_usuarios.apellido),', ',trim(rep3_usuarios.nombre)) as tecnico, 
                        rep3_reparaciones.hoja_ruta as hojaRuta
                    FROM 
                        rep3_reparaciones
                    INNER JOIN
                        rep3_clientes
                    ON
                        rep3_reparaciones.cliente_id = rep3_clientes.cliente_id
                    INNER JOIN
                        rep3_localidades
                    ON
                        rep3_clientes.localidad_id = rep3_localidades.localidad_id
                    INNER JOIN
                        rep3_provincias
                    ON
                        rep3_localidades.provincia_id = rep3_provincias.provincia_id
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
                    AND
                        rep3_reparaciones.envio_mail = 'N'
                ";          
    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);