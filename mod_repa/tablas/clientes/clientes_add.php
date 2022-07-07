<?php
    session_start();
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');

    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
        exit();
    }

    $clienteCodigo              = filter_var($_POST['clienteCodigo'], FILTER_SANITIZE_STRING);
    $clienteRazonSocial1        = filter_var($_POST['clienteRazonSocial1'], FILTER_SANITIZE_STRING);
    $clienteRazonSocial2        = filter_var($_POST['clienteRazonSocial2'], FILTER_SANITIZE_STRING);
    $clienteDireccion           = filter_var($_POST['clienteDireccion'], FILTER_SANITIZE_STRING);
    $clienteTelefono            = filter_var($_POST['clienteTelefono'], FILTER_SANITIZE_STRING);
    $clienteCelular             = filter_var($_POST['clienteCelular'], FILTER_SANITIZE_STRING);
    $clienteEmail               = filter_var($_POST['clienteEmail'], FILTER_SANITIZE_STRING);
    $clienteZonasDespacho       = filter_var($_POST['clienteZonasDespacho'], FILTER_SANITIZE_STRING);
    $clienteActivo              = filter_var($_POST['clienteActivo'], FILTER_SANITIZE_STRING);
    $clienteAntisarro           = filter_var($_POST['clienteAntisarro'], FILTER_SANITIZE_STRING);
    $clienteContactoNombre      = filter_var($_POST['clienteContactoNombre'], FILTER_SANITIZE_STRING);
    $clienteContactoEmail       = filter_var($_POST['clienteContactoEmail'], FILTER_SANITIZE_STRING);
    $clienteContactoTelefono    = filter_var($_POST['clienteContactoTelefono'], FILTER_SANITIZE_STRING);
    $clienteSolicitaOc          = filter_var($_POST['clienteSolicitaOc'], FILTER_SANITIZE_STRING);
    
    $perfilSirep                = recuperaPerfil($_SESSION['usuario']);
    $codigoClienteDuplicado     = codigoClienteDuplicado($clienteCodigo);
    //var_dump($codigoClienteDuplicado);

    $activo     = $clienteActivo        == 'true' ? 'N' : 'S';
    $antisarro  = $clienteAntisarro     == 'true' ? 'S' : 'N';
    $solicitaOc = $clienteSolicitaOc    == 'true' ? 'S' : 'N';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $conexion = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);

        if($perfilSirep <= 3 || $perfilSirep >= 7 && $perfilSirep <> 11 && $perfilSirep <> 15){

            if(!empty($clienteCodigo)){

                //CUIDADO, EL ID DE CLIENTES ES AUTOINCREMENTAL!!!!
                
                if(!$codigoClienteDuplicado){
                    $query1 =   "INSERT INTO rep_clientes (
                        codigo, 
                        razon_social1, 
                        razon_social2, 
                        direccion, 
                        telefono, 
                        celular, 
                        mail,
                        zonadespacho_id,
                        anulado,
                        iox, 
                        contacto, 
                        mailcontacto,  
                        telefonocontacto,
                        solicita_oc
                        ) VALUES (
                        '{$clienteCodigo}', 
                        '{$clienteRazonSocial1}', 
                        '{$clienteRazonSocial2}', 
                        '{$clienteDireccion}', 
                        '{$clienteTelefono}', 
                        '{$clienteCelular}', 
                        '{$clienteEmail}', 
                        {$clienteZonasDespacho},
                        '{$activo}', 
                        '{$antisarro}',  
                        '{$clienteContactoNombre}', 
                        '{$clienteContactoEmail}', 
                        '{$clienteContactoTelefono}',
                        '{$solicitaOc}'
                        )";

                    $sentenciaSQL= $conexion->prepare($query1);
                    //var_dump($sentenciaSQL);
                    $sentenciaSQL->execute();

                    if($sentenciaSQL->rowCount() > 0){
                        $arrayRespuesta['estado'] = 'Transacción exitosa';
                    } else {
                        $arrayRespuesta['estado'] = "Algo salió mal";
                    } 

                } else {
                    $arrayRespuesta['estado'] = "Cliente duplicado";
                }

            }

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
    };