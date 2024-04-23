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

    $orden                  = filter_var($_POST['orden'], FILTER_SANITIZE_STRING);
    $nroPresupuesto         = filter_var($_POST['nroPresupuesto'], FILTER_SANITIZE_STRING);
    $fechaDesde             = new DateTime($_POST['desdeFechaRecepcion'].' '.'00:00:00');
    $formatArgDesde         = $fechaDesde->format('Y-m-d H:i:s');
    $fechaHasta             = new DateTime($_POST['hastaFechaRecepcion'].' '.'23:59:59');
    $formatArgHasta         = $fechaHasta->format('Y-m-d H:i:s');
    $tecnico                = filter_var($_POST['tecnico'], FILTER_SANITIZE_STRING);
    $remitoCliente          = filter_var($_POST['remitoCliente'], FILTER_SANITIZE_STRING);
    $remitoDespacho         = filter_var($_POST['remitoDespacho'], FILTER_SANITIZE_STRING);
    $codigoProducto         = filter_var($_POST['codigoProducto'], FILTER_SANITIZE_STRING);
    $serieProducto          = filter_var($_POST['serieProducto'], FILTER_SANITIZE_STRING);
    $numeroExacto           = filter_var($_POST['numeroExacto'], FILTER_SANITIZE_STRING);
    $clienteId              = filter_var($_POST['clienteId'], FILTER_SANITIZE_STRING);
    $clienteApellido        = filter_var($_POST['clienteApellido'], FILTER_SANITIZE_STRING);
    $clienteNombre          = filter_var($_POST['clienteNombre'], FILTER_SANITIZE_STRING);
    $clienteTelefono        = filter_var($_POST['clienteTelefono'], FILTER_SANITIZE_STRING);
    $clienteCelular         = filter_var($_POST['clienteCelular'], FILTER_SANITIZE_STRING);
    $clienteEmail           = filter_var($_POST['clienteEmail'], FILTER_SANITIZE_STRING);
    $provincia              = filter_var($_POST['provincia'], FILTER_SANITIZE_STRING);
    $localidad              = filter_var($_POST['localidad'], FILTER_SANITIZE_STRING);
    $calle                  = filter_var($_POST['calle'], FILTER_SANITIZE_STRING);
    $numeroCalle            = filter_var($_POST['numeroCalle'], FILTER_SANITIZE_STRING);
    $dpto                   = filter_var($_POST['dpto'], FILTER_SANITIZE_STRING);
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
                    rep3_reparaciones.frecepcion            BETWEEN '{$formatArgDesde}' AND '{$formatArgHasta}'
                
            "; 
    if(!empty($orden)){
        $query .= " AND rep3_reparaciones.reparacion_id         = '{$orden}'"; 
    }  
    if(!empty($nroPresupuesto)){
        $query .= " AND rep3_reparaciones.numero_presupuesto    = '{$nroPresupuesto}'"; 
    }  
    if(!empty($tecnico)){
        $query .= " AND rep3_reparaciones.tecnico_id            = '{$tecnico}'"; 
    }  
    if(!empty($remitoCliente)){
        $query .= " AND rep3_reparaciones.remito_cliente        = '{$remitoCliente}'"; 
    }  
    if(!empty($remitoDespacho)){
        $query .= " AND rep3_reparaciones.remito_despacho       = '{$remitoDespacho}'"; 
    }  
    if(!empty($codigoProducto)){
        $query .= " AND rep3_productos.codigo                   = '{$codigoProducto}'"; 
    }  
    if(!empty($_POST['serieProducto'])){
        if($numeroExacto == 'false'){
            $query .= "AND rep3_reparaciones.nro_serie LIKE '%{$serieProducto}%'";
        } else {
            $query .= "AND rep3_reparaciones.nro_serie = '{$serieProducto}'";
        }
    }
    if($clienteId == ''){
        if(!empty($_POST['clienteApellido'])){
            $query .= "AND rep3_clientes.apellido           LIKE '%{$clienteApellido}%'";
        }
        if(!empty($_POST['clienteNombre'])){
            $query .= "AND rep3_clientes.nombre             LIKE '%{$clienteNombre}%'";
        }
        if(!empty($_POST['clienteTelefono'])){
            $query .= "AND rep3_clientes.telefono           LIKE '%{$clienteTelefono}%'";
        }
        if(!empty($_POST['clienteCelular'])){
            $query .= "AND rep3_clientes.celular            LIKE '%{$clienteCelular}%'";
        }
        if(!empty($_POST['clienteEmail'])){
            $query .= "AND rep3_clientes.email              LIKE '%{$clienteEmail}%'";
        }
        if(!empty($_POST['provincia'])){
            $query .= "AND rep3_localidades.provincia_id    = '{$provincia}'";
        }
        if(!empty($_POST['localidad'])){
            $query .= "AND rep3_clientes.localidad_id       = '{$localidad}'";
        }
        if(!empty($_POST['calle'])){
            $query .= "AND rep3_clientes.calle              LIKE '%{$calle}%'";
        }
        if(!empty($_POST['numeroCalle'])){
            $query .= "AND rep3_clientes.nro_calle          LIKE '%{$numeroCalle}%'";
        }
        if(!empty($_POST['dpto'])){
            $query .= "AND rep3_clientes.dpto               LIKE '%{$dpto}%'";
        }

    } else {
        $query .= "AND rep3_clientes.cliente_id = '{$clienteId}'";
    }

    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);