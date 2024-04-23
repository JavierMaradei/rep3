<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../includes/funciones.php');
    include_once('../../includes/config.php');
    
    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    $orden      = $_GET['orden'];

    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query      = " SELECT 
                        rep3_reparaciones.reparacion_id,
                        rep3_reparaciones.frecepcion,
                        date_format(rep3_reparaciones.frecepcion, '%d/%m/%Y  %T hs') as fechaRecepcionFinal,
                        rep3_reparaciones.reclama_garantia,
                        rep3_reparaciones.flete,
                        rep3_reparaciones.problema,
                        rep3_reparaciones.observaciones,
                        rep3_reparaciones.nro_serie,
                        rep3_reparaciones.fretiro,
                        rep3_reparaciones.costo,
                        rep3_reparaciones.fdiagnostico,
                        date_format(rep3_reparaciones.fdiagnostico, '%d/%m/%Y  %T hs') as fechaDiagnosticoFinal,
                        rep3_reparaciones.freparacion,
                        date_format(rep3_reparaciones.freparacion, '%d/%m/%Y  %T hs') as fechaReparacionFinal,
                        rep3_reparaciones.fembalaje,
                        date_format(rep3_reparaciones.fembalaje, '%d/%m/%Y  %T hs') as fechaEmbalajeFinal,
                        rep3_reparaciones.farmado,
                        date_format(rep3_reparaciones.farmado, '%d/%m/%Y  %T hs') as fechaArmadoFinal,
                        rep3_reparaciones.fpresupuesto,
                        date_format(rep3_reparaciones.fpresupuesto, '%d/%m/%Y  %T hs') as fechaPresupuestoFinal,
                        rep3_reparaciones.fresolucion,
                        date_format(rep3_reparaciones.fresolucion, '%d/%m/%Y  %T hs') as fechaResolucionFinal,
                        rep3_reparaciones.fanulado,
                        date_format(rep3_reparaciones.fanulado, '%d/%m/%Y  %T hs') as fechaAnulacionFinal,
                        rep3_reparaciones.reparacion_detalle,
                        rep3_reparaciones.diagnostico_detalle,
                        rep3_reparaciones.numero_presupuesto,
                        rep3_reparaciones.anulado,
                        rep3_reparaciones.cajon,
                        rep3_reparaciones.finalizado,
                        rep3_reparaciones.remito_cliente,
                        rep3_reparaciones.remito_despacho,
                        rep3_reparaciones.remito_sucursal,
                        rep3_reparaciones.estado_id,
                        rep3_reparaciones.lugar_recepcion_id,
                        rep3_reparaciones.lugar_reparacion,
                        rep3_lugares_recepcion.descripcion as lugar_recepcion_descripcion,
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
                        rep3_reparaciones.tipo_atencion,
                        rep3_reparaciones.producto_id,
                        rep3_productos.codigo as producto_codigo,
                        rep3_productos.descripcion as producto_descripcion,
                        rep3_productos.marca_id as producto_marca,
                        rep3_productos.familia_id as producto_familia,
                        rep3_reparaciones.forma_retiro_id,
                        rep3_reparaciones.motivo_anulacion_id,
                        rep3_motivos_anulacion.descripcion as descMotivoAnulacion,
                        rep3_reparaciones.cliente_id,
                        rep3_clientes.localidad_id as clienteLocalidad,
                        rep3_clientes.calle as clienteCalle,
                        rep3_clientes.nro_calle as clienteNroCalle,
                        rep3_clientes.dpto as clienteDpto,
                        rep3_clientes.telefono as cliente_telefono,
                        rep3_clientes.celular as cliente_celular,
                        rep3_clientes.email as cliente_email,
                        ltrim(rtrim(rep3_clientes.nombre)) as cliente_nombre,
                        ltrim(rtrim(rep3_clientes.apellido)) as cliente_apellido,
                        CONCAT(ltrim(rtrim(rep3_clientes.nombre)),' ',ltrim(rtrim(rep3_clientes.apellido))) as cliente_completo,
                        CONCAT(ltrim(rtrim(rep3_usuarios.nombre)),' ',ltrim(rtrim(rep3_usuarios.apellido))) as usuarioAnulacion,
                        rep3_reparaciones.estante_id,
                        rep3_reparaciones.producto_canje_id,
                        rep3_reparaciones.diagnosticador_id,
                        rep3_reparaciones.reparador_id,
                        rep3_reparaciones.embalador_id,
                        rep3_reparaciones.anulador_id,
                        rep3_reparaciones.presupuestador_id,
                        rep3_reparaciones.finalizador_id,
                        rep3_reparaciones.usuario_id,
                        rep3_reparaciones.sucursal_id,
                        rep3_sucursales.descripcion as sucursal_descripcion,
                        rep3_reparaciones.tecnico_id
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
                        rep3_lugares_recepcion
                    ON
                        rep3_reparaciones.lugar_recepcion_id    = rep3_lugares_recepcion.lugar_recepcion_id
                    INNER JOIN
                        rep3_sucursales
                    ON
                        rep3_reparaciones.sucursal_id           = rep3_sucursales.sucursal_id
                    LEFT JOIN
                        rep3_motivos_anulacion
                    ON
                        rep3_reparaciones.motivo_anulacion_id   = rep3_motivos_anulacion.motivo_anulacion_id
                    LEFT JOIN
                        rep3_usuarios
                    ON
                        rep3_reparaciones.anulador_id           = rep3_usuarios.usuario_id
                    WHERE
                        rep3_reparaciones.reparacion_id         = '{$orden}'
                "; 

    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();
    $resultado= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

    if($resultado['producto_canje_id'] != 0 && $resultado['tipo_ingreso'] == 'C'){
        $query1      = " SELECT 
                            codigo      as codigoProdCanje,
                            descripcion as descProdCanje  
                        FROM 
                            rep3_productos
                        WHERE
                            producto_id = {$resultado['producto_canje_id']}
                    "; 

        $sentenciaSQL= $conexion->prepare($query1);
        $sentenciaSQL->execute();
        $resultado1= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        $resultado['datosCanje'] = $resultado1;
    } else {
        $resultado['datosCanje'] = '';
    }

    $query2 = " SELECT 
                    adjunto_id,
                    descripcion,
                    RIGHT((SUBSTRING(descripcion, 14)),18) as descripcionCorta,
                    fecha,
                    size,
                    usuario_id 
                FROM 
                    rep3_rel_reparaciones_adjuntos
                WHERE
                    reparacion_id = '{$orden}'
            "; 

    $sentenciaSQL= $conexion->prepare($query2);
    $sentenciaSQL->execute();
    $resultado2= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    if($resultado2 != ''){
        $resultado['adjuntos'] = $resultado2;
    } else {
        $resultado['adjuntos'] = '';
    }

    //Para poder validar que la orden exista al momento de buscar en anulación de orden, anulación de resolución, cambio de sucursal.
    if($resultado['reparacion_id'] == ''){
        $resultado['reparacion_id'] = ''; 
    }

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);