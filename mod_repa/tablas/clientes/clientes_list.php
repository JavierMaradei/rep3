<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $query      = " SELECT 
                        cliente_id,
                        nombre,
                        apellido,
                        telefono,
                        celular,
                        email,
                        localidad_id,
                        calle,
                        nro_calle,
                        dpto,
                        activo
                    FROM 
                        rep3_clientes 
                    WHERE 
                        cliente_id > 0
                ";           
    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);