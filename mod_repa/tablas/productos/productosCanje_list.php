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

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        $marca      = $_GET['marca'];
        $familia    = $_GET['familia'];
        $buscador   = $_GET['buscador'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    
        $query  = " SELECT 
                        rep3_productos.producto_id, 
                        rep3_productos.codigo, 
                        rep3_productos.marca_id, 
                        rep3_productos.familia_id, 
                        rep3_productos.descripcion, 
                        rep3_marcas.descripcion as marca,
                        rep3_familias.descripcion as familia
                    FROM 
                        rep3_productos
                    INNER JOIN
                        rep3_marcas
                    ON 
                        rep3_productos.marca_id = rep3_marcas.marca_id
                    INNER JOIN
                        rep3_familias
                    ON
                        rep3_productos.familia_id = rep3_familias.familia_id
                    WHERE 
                        rep3_productos.activo = 'S'
                    AND
                        rep3_productos.canje_flag = 'S'
                "; 
        if(!empty($marca)){
            $query .= " AND rep3_productos.marca_id = '{$marca}'";    
        }  
        if(!empty($familia)){
            $query .= " AND rep3_productos.familia_id = '{$familia}'";    
        } 
        if(!empty($buscador)){
            $query .= " AND rep3_productos.descripcion LIKE '%{$buscador}%'";    
        }  

        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);

    }

    

