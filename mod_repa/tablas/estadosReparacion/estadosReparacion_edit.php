<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta = array();

    if(empty($_SESSION['usuario'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    //Creamos la conexión
    $id = $_GET['id'];
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $descripcion    = filter_var($_POST['descripcionEstadoReparcion'], FILTER_SANITIZE_STRING);
        $activo         = $_POST['activoEstadoReparcion'] == 'true' ? 'S' : 'N';
        $defecto        = $_POST['defaultEstadoReparcion'] == 'true' ? 'S' : 'N';
        $sinreparar     = $_POST['sinRepararEstadoReparcion'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario']);

        if($perfilSirep == 1 || $perfilSirep == 13){

            if(!empty($descripcion)){
                $query = "  UPDATE estadosreparacion SET 
                            descripcion = '{$descripcion}', 
                            activo = '{$activo}', 
                            defecto = '{$defecto}', 
                            sinreparar = '{$sinreparar}' 
                            WHERE estadoReparacion_id = '{$id}'
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
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);

    }