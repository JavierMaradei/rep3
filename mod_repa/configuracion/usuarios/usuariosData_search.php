<?php
    session_start();
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $id         = $_SESSION['usuario_id'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $query      = " SELECT 
                            rep3_usuarios.usuario_id            as idUsuarios, 
                            rep3_usuarios.nombre                as nombreUsuarios, 
                            rep3_usuarios.apellido              as apellidoUsuarios, 
                            rep3_usuarios.lugar_recepcion_id    as lugarRecepcionUsuarios, 
                            rep3_lugares_recepcion.descripcion  as lugar,
                            rep3_usuarios.perfil_id             as perfilUsuarios, 
                            rep3_perfiles.descripcion           as perfil,
                            rep3_usuarios.email                 as emailUsuarios, 
                            rep3_usuarios.emisor                as emisorUsuarios, 
                            rep3_usuarios.diagnosticador        as diagnosticadorUsuarios, 
                            rep3_usuarios.reparador             as reparadorUsuarios, 
                            rep3_usuarios.tecnico               as tecnicoUsuarios, 
                            rep3_usuarios.sucursal_id           as sucursalUsuarios, 
                            rep3_sucursales.descripcion         as sucursal,
                            rep3_usuarios.activo                as activoUsuarios
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
                        WHERE 
                            rep3_usuarios.email  = '{$id}'
                    "; 

        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }