<?php
    session_start();
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $id         = $_GET['id'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query      =   "SELECT 
                            rep3_piezas.pieza_id        as piezaId, 
                            rep3_piezas.codigo          as piezaCodigo, 
                            rep3_piezas.marca_id        as piezaMarca, 
                            rep3_piezas.referencia      as piezaRef, 
                            rep3_piezas.descripcion     as piezaDescripcion, 
                            rep3_piezas.costo           as piezaCosto, 
                            rep3_piezas.activo          as piezaActivo, 
                            rep3_piezas.foto            as piezaImagen 
                        FROM 
                            rep3_piezas
                        WHERE 
                            pieza_id = '{$id}'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }