<?php
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    //Creamos la conexión
    $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
    $activo         = $_GET['activo'];

    $query  = " SELECT 
                    forma_retiro_id, 
                    descripcion, 
                    activo 
                FROM 
                    rep3_formas_retiro
            ";  
    
    if($activo == 'S'){
        $query      .=" WHERE activo = 'S'";
    } 
    
    $query          .= " ORDER BY descripcion ";

    $sentenciaSQL   = $conexion->prepare($query);
    $sentenciaSQL   ->execute();
    $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);