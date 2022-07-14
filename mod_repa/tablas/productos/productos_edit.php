<?php
    session_start();
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        
        $id                 = $_GET['id'];
        $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
        $clienteNombre      = filter_var($_POST['clienteNombre'], FILTER_SANITIZE_STRING);
        $clienteApellido    = filter_var($_POST['clienteApellido'], FILTER_SANITIZE_STRING);
        $clienteDireccion   = filter_var($_POST['clienteDireccion'], FILTER_SANITIZE_STRING);
        $clienteTelefono    = filter_var($_POST['clienteTelefono'], FILTER_SANITIZE_STRING);
        $clienteCelular     = filter_var($_POST['clienteCelular'], FILTER_SANITIZE_STRING);
        $clienteEmail       = filter_var($_POST['clienteEmail'], FILTER_SANITIZE_STRING);
        $clienteActivo      = filter_var($_POST['clienteActivo'], FILTER_SANITIZE_STRING);
        $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);
        $activo             = $clienteActivo == 'true' ? 'S' : 'N';

        if($perfilSirep == 1){
            $query = "  UPDATE 
                            rep3_clientes 
                        SET 
                            nombre      = '{$clienteNombre}',
                            apellido    = '{$clienteApellido}', 
                            direccion   = '{$clienteDireccion}', 
                            telefono    = '{$clienteTelefono}',
                            celular     = '{$clienteCelular}', 
                            email       = '{$clienteEmail}',
                            activo      = '{$activo}'      
                        WHERE 
                            cliente_id  = '{$id}'
                    ";

            $sentenciaSQL   = $conexion->prepare($query);
            $respuesta      = $sentenciaSQL->execute();

            if($respuesta){
                $arrayRespuesta['estado'] = "Transacción exitosa";
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            } 

        } else {
            
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
    }