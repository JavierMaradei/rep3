<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $id         = $_GET['id'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query      =   "SELECT 
                            rep3_clientes.cliente_id        as clienteId, 
                            rep3_clientes.nombre            as clienteNombre, 
                            rep3_clientes.apellido          as clienteApellido, 
                            rep3_clientes.telefono          as clienteTelefono, 
                            rep3_clientes.celular           as clienteCelular, 
                            rep3_clientes.email             as clienteEmail, 
                            rep3_localidades.provincia_id   as provincia, 
                            rep3_clientes.localidad_id      as localidad, 
                            rep3_clientes.calle             as calle, 
                            rep3_clientes.nro_calle         as numeroCalle, 
                            rep3_clientes.dpto              as dpto, 
                            rep3_clientes.activo            as clienteActivo
                        FROM 
                            rep3_clientes
                        INNER JOIN
                            rep3_localidades
                        ON
                            rep3_clientes.localidad_id = rep3_localidades.localidad_id
                        WHERE 
                            cliente_id = '{$id}'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }