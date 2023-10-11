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
        $descripcion    = filter_var($_POST['descripcionEstantes'], FILTER_SANITIZE_STRING);
        $activo         = $_POST['activoEstantes'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);

        if($perfilSirep == 1){

            if(!empty($descripcion)){
                $query = "  INSERT INTO rep3_estantes (
                                descripcion, 
                                activo
                            ) VALUES (
                                '{$descripcion}', 
                                '{$activo}'
                            )
                        ";           
                $sentenciaSQL = $conexion -> prepare($query);
                $sentenciaSQL -> execute();
    
                if($sentenciaSQL->rowCount() > 0){
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