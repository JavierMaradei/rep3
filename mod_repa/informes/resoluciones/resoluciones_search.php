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

    $fechaDesde             = new DateTime($_POST['desdeFechaResolucion'].' '.'00:00:00');
    $formatArgDesde         = $fechaDesde->format('Y-m-d H:i:s');
    $fechaHasta             = new DateTime($_POST['hastaFechaResolucion'].' '.'23:59:59');
    $formatArgHasta         = $fechaHasta->format('Y-m-d H:i:s');
    $lugarRecepcion         = filter_var($_POST['lugarRecepcion'], FILTER_SANITIZE_STRING);
    $usuarioId              = recuperaIdUsuario($_SESSION['usuario_id']);

    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query = "  SELECT 
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
                    rep3_reparaciones.producto_id           = rep3_productos.producto_id
                INNER JOIN
                    rep3_clientes
                ON
                    rep3_reparaciones.cliente_id            = rep3_clientes.cliente_id
                INNER JOIN
                    rep3_localidades
                ON
                    rep3_clientes.localidad_id              = rep3_localidades.localidad_id
                INNER JOIN
                    rep3_lugares_recepcion
                ON
                    rep3_reparaciones.lugar_recepcion_id    = rep3_lugares_recepcion.lugar_recepcion_id
                INNER JOIN
                    rep3_sucursales
                ON
                    rep3_reparaciones.sucursal_id           = rep3_sucursales.sucursal_id
                WHERE
                    rep3_reparaciones.fresolucion           BETWEEN '{$formatArgDesde}' AND '{$formatArgHasta}'
                AND
                    rep3_reparaciones.finalizado            = 'S'
                AND
                    rep3_reparaciones.estado_id             = 7
            "; 
    if(!empty($lugarRecepcion)){
        $query .= " AND rep3_reparaciones.lugar_recepcion_id    = '{$lugarRecepcion}'"; 
    }  

    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);