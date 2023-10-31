<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $search     = filter_var($_GET['busqueda'], FILTER_SANITIZE_STRING);

        $query =    "   SELECT 
                             rep3_clientes.cliente_id,
                             rep3_clientes.nombre,
                             rep3_clientes.apellido,
                             rep3_clientes.telefono,
                             rep3_clientes.celular,
                             rep3_clientes.email,
                             rep3_clientes.localidad_id,
                             rep3_localidades.provincia_id, 
                             rep3_clientes.calle,
                             rep3_clientes.nro_calle,
                             rep3_clientes.dpto,
                             rep3_clientes.activo
                        FROM 
                            rep3_clientes
                        INNER JOIN
                            rep3_localidades
                        ON
                            rep3_clientes.localidad_id = rep3_localidades.localidad_id
                        WHERE 
                            (cliente_id = '{$search}'
                        OR 
                            nombre 
                        LIKE 
                            '%{$search}%' 
                        OR 
                            apellido 
                        LIKE 
                            '%{$search}%'
                        OR 
                            telefono 
                        LIKE 
                            '%{$search}%'
                        OR 
                            celular 
                        LIKE 
                            '%{$search}%'
                        OR 
                            email 
                        LIKE 
                            '%{$search}%'
                        OR 
                            calle 
                        LIKE 
                            '%{$search}%'
                        OR 
                            ltrim(rtrim(nombre)) + ' ' + ltrim(rtrim(apellido)) 
                        LIKE 
                            '%{$search}%')
                        AND 
                            rep3_clientes.activo = 'S' 

                    ";

        $sentenciaSQL= $conexion->prepare($query);
        //var_dump($sentenciaSQL);
        $sentenciaSQL->execute();

        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }