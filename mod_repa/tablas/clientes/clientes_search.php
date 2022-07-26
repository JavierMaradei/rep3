<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $search     = filter_var($_GET['busqueda'], FILTER_SANITIZE_STRING);

        $query =    "   SELECT 
                            cliente_id, 
                            nombre, 
                            apellido,
                            direccion, 
                            telefono, 
                            celular, 
                            direccion, 
                            email
                        FROM 
                            rep3_clientes
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
                            ltrim(rtrim(nombre)) + ' ' + ltrim(rtrim(apellido)) 
                        LIKE 
                            '%{$search}%')
                        AND 
                            activo = 'S' 

                    ";

        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();

        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }