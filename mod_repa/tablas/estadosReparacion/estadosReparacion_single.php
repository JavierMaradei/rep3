<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $id         = $_GET['id'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query      = " SELECT 
                            estado_id as idEstadoReparacion, 
                            descripcion as descripcionEstadoReparacion, 
                            activo as activoEstadoReparacion 
                        FROM 
                            rep3_estados_reparacion
                        WHERE 
                            estado_id = '{$id}'
                    "; 

        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();
        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }