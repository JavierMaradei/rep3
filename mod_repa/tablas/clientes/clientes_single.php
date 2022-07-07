<?php
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $id = $_GET['id'];
        $conexion = conectar(DB_DSN_SIREP, DB_USER_SIREP_R, DB_PASS_SIREP_R);
        $query =    "SELECT rep_clientes.cliente_id as clienteId, 
                    rep_clientes.codigo as clienteCodigo, 
                    rep_clientes.razon_social1 as clienteRazonSocial1, 
                    rep_clientes.razon_social2 as clienteRazonSocial2, 
                    rep_clientes.telefono as clienteTelefono, 
                    rep_clientes.celular as clienteCelular, 
                    rep_clientes.direccion as clienteDireccion, 
                    rep_clientes.mail as clienteEmail, 
                    rep_clientes.contacto as clienteContactoNombre,
                    rep_clientes.mailcontacto as clienteContactoEmail,
                    rep_clientes.anulado,
                    rep_clientes.iox, 
                    rep_clientes.telefonocontacto as clienteContactoTelefono, 
                    rep_clientes.referencia, 
                    rep_clientes.zonadespacho_id as clienteZonasDespacho, 
                    rep_zonasdespacho.nombre,
                    Case rep_clientes.anulado 
                    when 'N' then 'S'
                    when 'S' then 'N'
                    end As clienteActivo,
                    Case rep_clientes.iox 
                    when 'S' then 'S'
                    ELSE 'N'
                    end As clienteAntisarro,
                    Case rep_clientes.iox 
                    when 'S' then 'S'
                    ELSE 'N'
                    end As antisarro,
                    Case rep_clientes.solicita_oc 
                    when 'S' then 'S'
                    ELSE 'N'
                    end As clienteSolicitaOc
                    FROM rep_clientes
                    INNER JOIN rep_zonasdespacho
                    ON rep_clientes.zonadespacho_id = rep_zonasdespacho.zona_id
                    WHERE cliente_id = '{$id}'";           
        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();

        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
    }