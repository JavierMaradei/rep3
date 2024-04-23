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

    $fechaDesde             = new DateTime($_POST['desdeFechaDiagnostico'].' '.'00:00:00');
    $formatArgDesde         = $fechaDesde->format('Y-m-d H:i:s');
    $fechaHasta             = new DateTime($_POST['hastaFechaDiagnostico'].' '.'23:59:59');
    $formatArgHasta         = $fechaHasta->format('Y-m-d H:i:s');
    $diagnosticador         = filter_var($_POST['diagnosticador'], FILTER_SANITIZE_STRING);
    $usuarioId              = recuperaIdUsuario($_SESSION['usuario_id']);

    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query = "  SELECT 
                    count(rep3_reparaciones.reparacion_id) as total,
                    rep3_productos.codigo as producto_codigo,
                    rep3_productos.descripcion as producto_descripcion,
                    CONCAT(ltrim(rtrim(rep3_usuarios.apellido)),' ',ltrim(rtrim(rep3_usuarios.nombre))) as diagnosticador
                FROM 
                    rep3_reparaciones
                INNER JOIN
                    rep3_productos
                ON
                    rep3_reparaciones.producto_id           = rep3_productos.producto_id
                INNER JOIN
                    rep3_usuarios
                ON
                    rep3_reparaciones.diagnosticador_id     = rep3_usuarios.usuario_id
                WHERE
                    rep3_reparaciones.fdiagnostico          BETWEEN '{$formatArgDesde}' AND '{$formatArgHasta}'
                AND
                    rep3_reparaciones.anulado               <> 'S'
                
            "; 
    if(!empty($diagnosticador)){
        $query .= " AND rep3_reparaciones.diagnosticador_id    = '{$diagnosticador}'"; 
    }  

    $query .= " GROUP BY 
                    rep3_productos.codigo, 
                    rep3_productos.descripcion, 
                    rep3_usuarios.apellido,
                    rep3_usuarios.nombre
            ";

    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();
    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);