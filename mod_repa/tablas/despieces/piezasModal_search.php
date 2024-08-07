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
        
        $marca      = $_GET['marca'];
        $buscador   = $_GET['buscador'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query  = " SELECT 
                        rep3_piezas.pieza_id, 
                        rep3_piezas.codigo, 
                        rep3_piezas.marca_id, 
                        rep3_piezas.foto, 
                        rep3_piezas.descripcion, 
                        rep3_piezas.referencia, 
                        rep3_marcas.descripcion as marca
                    FROM 
                        rep3_piezas
                    INNER JOIN
                        rep3_marcas
                    ON 
                        rep3_piezas.marca_id = rep3_marcas.marca_id
                    WHERE 
                        rep3_piezas.activo = 'S'
                "; 
        if(!empty($marca)){
            $query .= " AND rep3_piezas.marca_id = '{$marca}'";    
        }  
        if(!empty($buscador)){
            $query .= " AND rep3_piezas.descripcion LIKE '%{$buscador}%'";    
        }  

        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }