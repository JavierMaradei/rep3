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

    $orden                      = $_GET['orden'];
    $fdesde                     = $_GET['fdesde'];
    $fhasta                     = $_GET['fhasta'];
    $ordenesTotalesReparadores  = $_GET['ordenesTotalesReparadores'];
    $ordenesTotalesSucursales   = $_GET['ordenesTotalesSucursales'];
    $tecnico                    = soyTecnico($_SESSION['usuario_id']);
    $usuarioId                  = recuperaIdUsuario($_SESSION['usuario_id']);
    $sucursalId                 = recuperaSucursalUsuario($_SESSION['usuario_id']);

    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query      = " SELECT 
                        rep3_reparaciones.reparacion_id,
                        rep3_reparaciones.frecepcion,
                        rep3_reparaciones.fretiro,
                        rep3_reparaciones.producto_id,
                        rep3_productos.codigo as producto_codigo,
                        rep3_productos.descripcion as producto_descripcion,
                        rep3_reparaciones.nro_serie,
                        rep3_reparaciones.cliente_id,
                        ltrim(rtrim(rep3_clientes.nombre)) as cliente_nombre,
                        ltrim(rtrim(rep3_clientes.apellido)) as cliente_apellido,
                        CONCAT(ltrim(rtrim(rep3_clientes.nombre)),' ',ltrim(rtrim(rep3_clientes.apellido))) as cliente_completo,
                        rep3_reparaciones.tipo_ingreso,
                        CASE rep3_reparaciones.tipo_ingreso
                            WHEN 'R' THEN 'Reparacion'
                            WHEN 'P' THEN 'Presupuesto'
                            WHEN 'C' THEN 'Plan canje'
                            WHEN 'E' THEN 'Cambio equipo'
                        END AS RepPres,
                        rep3_reparaciones.tipo_atencion,
                        CASE rep3_reparaciones.tipo_atencion
                            WHEN '1' THEN 'Revisar'
                            WHEN '2' THEN 'Reparar en el momento'
                        END AS atencion,
                        rep3_reparaciones.lugar_recepcion_id,
                        rep3_lugares_recepcion.descripcion as lugar_recepcion_descripcion,
                        rep3_reparaciones.sucursal_id,
                        rep3_sucursales.descripcion as sucursal_descripcion,
                        rep3_reparaciones.reparador_id
                    FROM 
                        rep3_reparaciones
                    INNER JOIN
                        rep3_productos
                    ON
                        rep3_reparaciones.producto_id = rep3_productos.producto_id
                    INNER JOIN
                        rep3_clientes
                    ON
                        rep3_reparaciones.cliente_id = rep3_clientes.cliente_id
                    INNER JOIN
                        rep3_lugares_recepcion
                    ON
                        rep3_reparaciones.lugar_recepcion_id = rep3_lugares_recepcion.lugar_recepcion_id
                    INNER JOIN
                        rep3_sucursales
                    ON
                        rep3_reparaciones.sucursal_id = rep3_sucursales.sucursal_id
                    WHERE
                        rep3_reparaciones.estado_id = 3
                    AND
                        rep3_reparaciones.anulado <> 'S'
                    AND
                        rep3_reparaciones.finalizado <> 'S'
                "; 
    if(!empty($orden)){
        $query .= " AND rep3_reparaciones.reparacion_id = '{$orden}'"; 
    }  
    
    if(!empty($fdesde) && !empty($fhasta)){
        $query .= " AND rep3_reparaciones.frecepcion BETWEEN '{$fdesde}' AND '{$fhasta}'"; 
    } 

    if($ordenesTotalesReparadores == 'false') {
        $query .= " AND rep3_reparaciones.reparador_id = '{$usuarioId}'"; 
    }

    if($ordenesTotalesSucursales == 'false') {
        $query .= " AND rep3_reparaciones.sucursal_id = '{$sucursalId}'"; 
    }

    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);