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

    $clienteNombre      = filter_var($_POST['clienteNombre'], FILTER_SANITIZE_STRING);
    $clienteApellido    = filter_var($_POST['clienteApellido'], FILTER_SANITIZE_STRING);
    $clienteDireccion   = filter_var($_POST['clienteDireccion'], FILTER_SANITIZE_STRING);
    $clienteTelefono    = filter_var($_POST['clienteTelefono'], FILTER_SANITIZE_STRING);
    $clienteCelular     = filter_var($_POST['clienteCelular'], FILTER_SANITIZE_STRING);
    $clienteEmail       = filter_var($_POST['clienteEmail'], FILTER_SANITIZE_STRING);
    $clienteActivo      = filter_var($_POST['clienteActivo'], FILTER_SANITIZE_STRING);
    $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);
    $activo             = $clienteActivo == 'true' ? 'S' : 'N';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);

        if($perfilSirep == 1){
            
            $query1 = " INSERT INTO rep3_clientes (
                            nombre, 
                            apellido, 
                            direccion, 
                            telefono, 
                            celular, 
                            email,
                            activo
                        ) VALUES (
                            '{$clienteNombre}', 
                            '{$clienteApellido}', 
                            '{$clienteDireccion}', 
                            '{$clienteTelefono}', 
                            '{$clienteCelular}', 
                            '{$clienteEmail}', 
                            '{$activo}'
                        )
                    ";

            $sentenciaSQL= $conexion->prepare($query1);
            //var_dump($sentenciaSQL);
            $sentenciaSQL->execute();

            if($sentenciaSQL->rowCount() > 0){
                $arrayRespuesta['estado'] = 'Transacción exitosa';
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            } 

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    };