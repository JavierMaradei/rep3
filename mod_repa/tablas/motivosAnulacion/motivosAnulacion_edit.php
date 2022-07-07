<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');

    $arrayRespuesta = array();

    if(empty($_SESSION['usuario'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
        exit();
    }

    $id = $_GET['id'];
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion       = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
        $descripcion    = filter_var($_POST['descripcionMotivosAnulacion'], FILTER_SANITIZE_STRING);
        $activo         = $_POST['activoMotivosAnulacion'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario']);

        if($perfilSirep == 1 || $perfilSirep == 2 || $perfilSirep == 7 || $perfilSirep == 10 || $perfilSirep == 13 || $perfilSirep == 14 || $perfilSirep == 16){

            if(!empty($descripcion)){
                $query = "  UPDATE rep_motivosanulacion SET
                            descripcion                 = '{$descripcion}', 
                            activo                      = '{$activo}'
                            WHERE motivoanulacion_id    = '{$id}'
                        ";           
                
                $sentenciaSQL= $conexion->prepare($query);
                $respuesta = $sentenciaSQL->execute();
            
                if($respuesta){
                    $arrayRespuesta['estado'] = "Transacción exitosa";
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
                } 
            }

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);

    }