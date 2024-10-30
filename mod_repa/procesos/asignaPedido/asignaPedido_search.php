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
    
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        //Creamos la conexión
        $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
        $arrayRespuesta     = array();
        $pendientes         = 0;
        $coordinados        = 0;
        $concluidos         = 0;
        $pendientesTec      = 0;
        $coordinadosTec     = 0;
        $group              = array();
        $filtro             = $_GET['filtro'];
        $tecnico            = $_GET['tecnico'];
        $desde              = new DateTime($_GET['fd'].' '.'00:00:00');
        $formatDesde        = $desde->format('Y-m-d H:i:s');
        $hasta              = new DateTime($_GET['fh'].' '.'23:59:59');
        $formatHasta        = $hasta->format('Y-m-d H:i:s');

        $query0 ="  SELECT 
                        rep3_reparaciones.reparacion_id,
                        rep3_reparaciones.cliente_id,
                        CONVERT(rep3_reparaciones.frecepcion, DATE)                                 as fechaRecepcion,
                        CONVERT(rep3_reparaciones.freparacion, DATE)                                as fechaReparacion,
                        CONCAT(trim(rep3_clientes.apellido),', ',trim(rep3_clientes.nombre))        as cliente, 
                        CONCAT(trim(rep3_productos.codigo),' - ',trim(rep3_productos.descripcion))  as producto, 
                        rep3_clientes.localidad_id, 
                        rep3_clientes.calle, 
                        rep3_clientes.nro_calle, 
                        rep3_clientes.dpto,
                        rep3_localidades.provincia_id, 
                        rep3_localidades.descripcion                                                as localidad,
                        rep3_provincias.descripcion                                                 as provincia,
                        CONCAT(trim(rep3_usuarios.apellido),', ',trim(rep3_usuarios.nombre))        as tecnico, 
                        rep3_reparaciones.hoja_ruta                                                 as hojaRuta,
                        rep3_reparaciones.problema,
                        rep3_reparaciones.visita_concluida,
                        rep3_reparaciones.coordinado,
                        CASE 
                            rep3_reparaciones.coordinado
                        WHEN 'N' THEN 'Pendiente'
                        WHEN 'S' THEN 'Coordinado'
                        END AS coordinadoDesc
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
                    INNER JOIN
                        rep3_productos
                    ON
                        rep3_reparaciones.producto_id = rep3_productos.producto_id
                    WHERE 
                        rep3_reparaciones.estado_id = '1'
                    AND
                        rep3_reparaciones.lugar_recepcion_id = '2'
                    AND
                        rep3_reparaciones.anulado <> 'S'
                ";          

        switch ($filtro) {
            case 'P':
                $query0 .= " AND rep3_reparaciones.coordinado = 'N'";
                break;
            case 'C':
                $query0 .= " AND rep3_reparaciones.coordinado = 'S' AND rep3_reparaciones.visita_concluida  = 'N'";
                break;
            case 'F':
                $query0 .= " AND rep3_reparaciones.coordinado = 'S' AND rep3_reparaciones.visita_concluida  = 'S'";
                break;
            default:
                break;
        }
        if(!empty($tecnico)){
            $query0 .= " AND rep3_reparaciones.tecnico_id = '{$tecnico}'";
        }

        if(!empty($_GET['fd']) && !empty($_GET['fh'])){
            $query0 .= " AND rep3_reparaciones.freparacion BETWEEN '{$formatDesde}' AND '{$formatHasta}'";
        }

        $sentenciaSQL   = $conexion->prepare($query0);
        $sentenciaSQL   ->execute();
        $respuesta0     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $query1= "  SELECT 
                        reparacion_id, 
                        coordinado, 
                        tecnico_id, 
                        visita_concluida 
                    FROM 
                        rep3_reparaciones 
                    WHERE 
                        estado_id IN ('1', '8')
                ";

        if(!empty($_GET['fd']) && !empty($_GET['fh'])){
            $query1 .= " AND freparacion BETWEEN '{$formatDesde}' AND '{$formatHasta}'";
        }

        $sentenciaSQL   = $conexion->prepare($query1);
        $sentenciaSQL   ->execute();
        $respuesta1     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        foreach ($respuesta1 as $key => $value) {
            if($value['coordinado'] == 'S' && $value['visita_concluida'] == 'N'){
                $coordinados = ++$coordinados;
            } else if($value['visita_concluida'] == 'S'){
                $concluidos = ++$concluidos;
            } else {
                $pendientes = ++$pendientes;
            }
        }

        $query2         = " SELECT usuario_id, apellido, nombre FROM rep3_usuarios WHERE tecnico = 'S' AND activo = 'S' ";
        $sentenciaSQL   = $conexion->prepare($query2);
        $sentenciaSQL   ->execute();
        $respuesta2     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        foreach ($respuesta2 as $key2 => $value2) {
            $pendientesTec  = 0;
            $coordinadosTec = 0;
            $concluidosTec  = 0;

            $respuesta2[$key2]['pendientes']    =  $pendientesTec;
            $respuesta2[$key2]['coordinados']   =  $coordinadosTec;
            $respuesta2[$key2]['concluidos']    =  $concluidosTec;

            foreach ($respuesta1 as $key1 => $value1) {
                if($value2['usuario_id'] == $value1['tecnico_id']){
                    if($value1['coordinado'] == 'S' && $value1['visita_concluida'] == 'N'){
                        $coordinadosTec = ++$coordinadosTec;
                    } else if($value1['visita_concluida'] == 'S'){
                        $concluidosTec = ++$concluidosTec;
                    } else {
                        $pendientesTec = ++$pendientesTec;
                    }
                }
            }
            $respuesta2[$key2]['pendientes']    =  $pendientesTec;
            $respuesta2[$key2]['coordinados']   =  $coordinadosTec;
            $respuesta2[$key2]['concluidos']    =  $concluidosTec;
        } 

        $arrayRespuesta['pedidos']      = $respuesta0;
        $arrayRespuesta['total']        = count($respuesta1);
        $arrayRespuesta['pendientes']   = $pendientes;
        $arrayRespuesta['coordinados']  = $coordinados;
        $arrayRespuesta['concluidos']   = $concluidos;
        $arrayRespuesta['tecnicos']     = $respuesta2;
 
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta);    
    }