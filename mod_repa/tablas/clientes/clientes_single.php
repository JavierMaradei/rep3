<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $id         = $_GET['id'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query      =   "SELECT 
                            rep3_clientes.cliente_id    as clienteId, 
                            rep3_clientes.codigo        as clienteCodigo, 
                            rep3_clientes.nombre        as clienteNombre, 
                            rep3_clientes.apellido      as clienteApellido, 
                            rep3_clientes.telefono      as clienteTelefono, 
                            rep3_clientes.celular       as clienteCelular, 
                            rep3_clientes.direccion     as clienteDireccion, 
                            rep3_clientes.email         as clienteEmail, 
                            rep3_clientes.activo        as clienteActivo 
                        FROM 
                            rep3_clientes
                        WHERE 
                            cliente_id = '{$id}'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }