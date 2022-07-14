<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }
        
    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $activo     = $_GET['activo'];

        $query = "  SELECT 
                        motivo_anulacion_id, 
                        descripcion, 
                        activo 
                    FROM 
                        rep3_motivos_anulacion ";

        if($activo == 'S'){
            $query .="AND activo = 'S'";
        } 
        $query .= "order by descripcion asc";          
        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();
    
        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    
        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }