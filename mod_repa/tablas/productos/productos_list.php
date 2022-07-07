<?php
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    //Creamos la conexión
    $conexion               = conectar(DB_DSN_SIREP, DB_USER_SIREP_R, DB_PASS_SIREP_R);    
    $productoSinSinonimo    = $_GET['prodSinSinonimo'];
    $productosActivos       = $_GET['prodActivos'];

    $query =    "   SELECT 
                        REP_PRODUCTOS.PRODUCTO_ID, 
                        REP_PRODUCTOS.CODIGO, 
                        REP_PRODUCTOS.DESCRIPCION, 
                        REP_PRODUCTOS.DIFICULTAD, 
                        REP_PRODUCTOS.COSTO_ESTIMADO, 
                    Case 
                        REP_PRODUCTOS.ACTIVO
                        when '' then 'Discontinuo'
                        when 'N' then 'Discontinuo'
                        when 'S' then 'Activo'
                        end As ACTIVO,
                        REP_PRODUCTOS.NROSERIE_GARANTIA as NROSERIE,
                        REP_PRODUCTOS.TIPO_ID as TIPO,
                        REP_PRODUCTOS.GRUPO_ID as GRUPO,
                        REP_TIPOPRODUCTO.TIPO_ID,
                        REP_TIPOPRODUCTO.DESCRIPCION as descTipoProducto,
                        REP_GRUPOS.GRUPO_ID,
                        REP_GRUPOS.DESCRIPCION as descGrupo
                    FROM 
                        rep_productos,
                        rep_tipoproducto,
                        rep_grupos 
                    WHERE 
                        rep_productos.producto_id > 0
                    AND rep_productos.tipo_id   = rep_tipoproducto.tipo_id
                    AND rep_productos.grupo_id  = rep_grupos.grupo_id
                ";

                    if(isset($_GET['activo'])){
                        $query .= "AND rep_productos.activo = 'S' ORDER BY descripcion asc";
                    }
                    if($productosActivos == "true"){
                        $query .= "AND rep_productos.activo = 'S' ";
                    }
                    if($productoSinSinonimo == "true"){
                        $query .= "AND rep_productos.codigo_adonix = '' ";
                    }

    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);