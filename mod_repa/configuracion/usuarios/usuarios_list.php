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
/*     $query      = " SELECT 
                        rep3_usuarios.usuario_id, 
                        rep3_usuarios.nombre, 
                        rep3_usuarios.apellido, 
                        rep3_usuarios.fecha_alta,  
                        rep3_usuarios.lugar_recepcion_id, 
                        rep3_lugares_recepcion.descripcion as lugar,
                        rep3_usuarios.perfil_id, 
                        rep3_perfiles.descripcion as perfil,
                        rep3_usuarios.email, 
                        rep3_usuarios.clave, 
                        rep3_usuarios.emisor, 
                        rep3_usuarios.diagnosticador, 
                        rep3_usuarios.reparador, 
                        rep3_usuarios.sucursal_id, 
                        rep3_sucursales.descripcion as sucursal,
                        rep3_usuarios.activo 
                    FROM 
                        rep3_usuarios
                    INNER JOIN
                        rep3_lugares_recepcion
                    ON
                        rep3_usuarios.lugar_recepcion_id = rep3_lugares_recepcion.lugar_recepcion_id
                    INNER JOIN
                        rep3_perfiles
                    ON
                        rep3_usuarios.perfil_id = rep3_perfiles.perfil_id
                    INNER JOIN
                        rep3_sucursales
                    ON
                        rep3_usuarios.sucursal_id = rep3_sucursales.sucursal_id
                ";
    if(isset($_GET['activo'])){
        $query .= "WHERE rep3_usuarios.activo = 'S'";
    }    */  
    $query = "  SELECT 
                    rep3_usuarios.usuario_id, 
                    rep3_usuarios.nombre,
                    rep3_usuarios.apellido,
                    rep3_usuarios.fecha_alta,  
                    rep3_usuarios.lugar_recepcion_id,
                    rep3_lugares_recepcion.descripcion as lugar,
                    rep3_usuarios.perfil_id,
                    rep3_perfiles.descripcion as perfil,
                    rep3_usuarios.email, 
                    rep3_usuarios.clave, 
                    rep3_usuarios.emisor,  
                    rep3_usuarios.diagnosticador, 
                    rep3_usuarios.reparador,
                    rep3_usuarios.embalador,
                    rep3_usuarios.tecnico, 
                    rep3_usuarios.sucursal_id,
                    rep3_sucursales.descripcion as sucursal,
                    rep3_usuarios.activo 
                FROM 
                    rep3_usuarios
                INNER JOIN
                    rep3_lugares_recepcion
                ON
                    rep3_usuarios.lugar_recepcion_id = rep3_lugares_recepcion.lugar_recepcion_id
                INNER JOIN
                    rep3_perfiles
                ON
                    rep3_usuarios.perfil_id = rep3_perfiles.perfil_id
                INNER JOIN
                    rep3_sucursales
                ON
                    rep3_usuarios.sucursal_id = rep3_sucursales.sucursal_id
            ";

    if(isset($_GET['activo'])){
        $query .= " WHERE rep3_usuarios.activo = 'S'";
    }

    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();
    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);