<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');

    $arrayRespuesta = array();

    if(empty($_SESSION['usuario'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
        exit();
    }

    $id = $_GET['id'];
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $conexion               = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
        $codigo                 = filter_var($_POST['codigoProducto'], FILTER_SANITIZE_STRING);
        $descripcion            = filter_var($_POST['descripcionProducto'], FILTER_SANITIZE_STRING);
        $dificultad             = filter_var($_POST['dificultadProducto'], FILTER_SANITIZE_NUMBER_INT);
        $costo                  = filter_var($_POST['costoProducto'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $grupo                  = $_POST['grupoProducto'];
        $tipo                   = $_POST['tipoProducto'];
        $ficha                  = $_POST['fichaProducto'];
        $nroSerie               = filter_var($_POST['nroDeSerieProducto'], FILTER_SANITIZE_NUMBER_INT);
        $gama                   = filter_var($_POST['gamaProducto'], FILTER_SANITIZE_NUMBER_INT);
        $cargoReducido          = $_POST['cargoReducidoProducto'] == 'true' ? 'S' : 'N';
        $mediaUnion             = $_POST['mediaUnionProducto'] == 'true' ? 'S' : 'N';
        $activoProducto         = $_POST['activoProducto'] == 'true' ? 'S' : 'N';
        $canjeProducto          = $_POST['canjeableProducto'] == 'true' ? 'S' : 'N';
        $codigoSinonimo         = filter_var($_POST['codigoSinonimoProducto'], FILTER_SANITIZE_STRING);
        $descripcionSinonimo    = filter_var($_POST['descripcionSinonimoProducto'], FILTER_SANITIZE_STRING);
        $perfilSirep            = recuperaPerfil($_SESSION['usuario']);

        
        if($_POST['monofasica'] == 'true'){
            $monofasica_trifasica = 'M';
        } else if($_POST['trifasica'] == 'true'){ 
            $monofasica_trifasica = 'T';
        }
        if($gama == ''){
            $gama = 0;
        }

        if($perfilSirep == 1 || $perfilSirep == 7 || $perfilSirep == 10 || $perfilSirep == 13 || $perfilSirep == 16){

            if(!empty($descripcion)){
                $query = "UPDATE rep_productos
                        SET codigo = '{$codigo}',
                        descripcion = '{$descripcion}',
                        dificultad = '{$dificultad}',
                        costo_estimado = '{$costo}',
                        grupo_id = '{$grupo}',
                        tipo_id = '{$tipo}',
                        modelo_ficha_id = '{$ficha}',
                        monofasico_trifasico = '{$monofasica_trifasica}',
                        nroserie_garantia = '{$nroSerie}',
                        gama_prod = '{$gama}',
                        cargo_red = '{$cargoReducido}',
                        media_union = '{$mediaUnion}',
                        activo = '{$activoProducto}',
                        codigo_adonix = '{$codigoSinonimo}',
                        descrip_adonix = '{$descripcionSinonimo}',
                        canje_flag = '{$canjeProducto}'
                        WHERE producto_id = '{$id}'";           
                
                $sentenciaSQL   = $conexion->prepare($query);
                //var_dump($sentenciaSQL);
                $respuesta      = $sentenciaSQL->execute();
                $arrayRespuesta = array();   
    
                if($respuesta){
                    $arrayRespuesta['estado'] = 'Transacción exitosa';
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
                }
            }

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);

    }