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

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        
        $id             = $_GET['id'];
        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $descripcion    = filter_var($_POST['descripcionLugaresRecepcion'], FILTER_SANITIZE_STRING);
        $demora         = filter_var($_POST['demoraLugaresRecepcion'], FILTER_SANITIZE_NUMBER_INT);
        $activo         = $_POST['activoLugaresRecepcion'] == 'true' ? 'S' : 'N';
        $flete          = $_POST['fleteLugaresRecepcion'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);

        if($perfilSirep == 1){

            if(!empty($descripcion)){
                $query = "  UPDATE 
                                rep3_lugares_recepcion 
                            SET 
                                descripcion         = '{$descripcion}', 
                                dias_demora         = '{$demora}', 
                                activo              = '{$activo}', 
                                flete               = '{$flete}'
                            WHERE 
                                lugar_recepcion_id  = '{$id}'
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