<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $id             = $_GET['id'];
        $descripcion    = filter_var($_POST['descripcionLocalidad'], FILTER_SANITIZE_STRING);
        $provincia      = filter_var($_POST['provincia'], FILTER_SANITIZE_STRING);
        $activo         = $_POST['activoLocalidad'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);

        if($perfilSirep == 1){

            if($descripcion != ''){
                $query = "  UPDATE 
                                rep3_localidades 
                            SET 
                                descripcion     = '{$descripcion}', 
                                provincia_id    = '{$provincia}', 
                                activo          = '{$activo}' 
                            WHERE 
                                localidad_id    = '{$id}'
                        ";           
                
                $sentenciaSQL= $conexion->prepare($query);
                $respuesta = $sentenciaSQL->execute();
            
                if($respuesta){
                    $arrayRespuesta['estado'] = "Transacción exitosa";
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
                } 

            } else {
                $arrayRespuesta['estado'] = "Error perfil"; 
            }

        }
        
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR); 
    }