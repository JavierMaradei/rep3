<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $query      = " SELECT 
                            lugar_recepcion_id, 
                            descripcion, 
                            dias_demora, 
                            activo, 
                            flete
                        FROM 
                            rep3_lugares_recepcion 
                        WHERE 
                            lugar_recepcion_id > 0";
        if(isset($_GET['activo'])){
            $query .="  AND activo = 'S'";
        }           
        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();
    
        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    
        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }