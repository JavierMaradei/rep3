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
                            rep3_productos.producto_id      as productoId, 
                            rep3_productos.codigo           as productoCodigo, 
                            rep3_productos.marca_id         as productoMarca, 
                            rep3_productos.familia_id       as productoFamilia, 
                            rep3_productos.descripcion      as productoDescripcion, 
                            rep3_productos.costo_estimado   as productoCosto, 
                            rep3_productos.activo           as productoActivo, 
                            rep3_productos.mono_tri         as productoMonoTri, 
                            rep3_productos.canje_flag       as productoCanjeable, 
                            rep3_productos.foto             as productoImagen 
                        FROM 
                            rep3_productos
                        WHERE 
                            producto_id = '{$id}'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }