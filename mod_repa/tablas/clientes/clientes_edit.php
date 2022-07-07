<?php
    session_start();
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    $id = $_GET['id'];
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion                   = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
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

        $activo     = $clienteActivo        == 'true' ? 'N' : 'S';
        $antisarro  = $clienteAntisarro     == 'true' ? 'S' : 'N';
        $solicitaOc = $clienteSolicitaOc    == 'true' ? 'S' : 'N';

        if($perfilSirep <= 3 || $perfilSirep >= 7 && $perfilSirep <> 11 && $perfilSirep <> 15){
            $query = "  UPDATE rep_clientes SET 
                        codigo              = '{$clienteCodigo}', 
                        razon_social1       = '{$clienteRazonSocial1}',
                        razon_social2       = '{$clienteRazonSocial2}', 
                        direccion           = '{$clienteDireccion}', 
                        telefono            = '{$clienteTelefono}',
                        celular             = '{$clienteCelular}', 
                        mail                = '{$clienteEmail}', 
                        contacto            = '{$clienteContactoNombre}',
                        mailcontacto        = '{$clienteContactoEmail}',
                        zonadespacho_id     = {$clienteZonasDespacho}, 
                        anulado             = '{$activo}', 
                        iox                 = '{$antisarro}', 
                        telefonocontacto    = '{$clienteContactoTelefono}',
                        solicita_oc         = '{$solicitaOc}'
                        WHERE cliente_id    = '{$id}'
                    ";

            $sentenciaSQL   = $conexion->prepare($query);
            //var_dump($sentenciaSQL);
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