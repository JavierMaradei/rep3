<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $fechaDefault               = new DateTime("01-01-1900");
        $codigoProducto             = filter_var($_POST['codigoProducto'], FILTER_SANITIZE_STRING);
        $descripcionProducto        = filter_var($_POST['descripcionProducto'], FILTER_SANITIZE_STRING);
        $marcaProducto              = filter_var($_POST['marcaProducto'], FILTER_SANITIZE_STRING);
        $familiaProducto            = filter_var($_POST['familiaProducto'], FILTER_SANITIZE_STRING);
        $serieProducto              = filter_var($_POST['serieProducto'], FILTER_SANITIZE_STRING);
        $problemaProducto           = filter_var($_POST['problemaProducto'], FILTER_SANITIZE_STRING);
        $observacionesProducto      = filter_var($_POST['observacionesProducto'], FILTER_SANITIZE_STRING);
        $clienteId                  = filter_var($_POST['clienteId'], FILTER_SANITIZE_STRING);
        $clienteApellido            = filter_var($_POST['clienteApellido'], FILTER_SANITIZE_STRING);
        $clienteNombre              = filter_var($_POST['clienteNombre'], FILTER_SANITIZE_STRING);
        $clienteTelefono            = filter_var($_POST['clienteTelefono'], FILTER_SANITIZE_STRING);
        $clienteCelular             = filter_var($_POST['clienteCelular'], FILTER_SANITIZE_STRING);
        $clienteDireccion           = filter_var($_POST['clienteDireccion'], FILTER_SANITIZE_STRING);
        $clienteEmail               = filter_var($_POST['clienteEmail'], FILTER_SANITIZE_STRING);
        $localidad                  = filter_var($_POST['localidad'], FILTER_SANITIZE_STRING);
        $calle                      = filter_var($_POST['calle'], FILTER_SANITIZE_STRING);
        $numeroCalle                = filter_var($_POST['numeroCalle'], FILTER_SANITIZE_STRING);
        $dpto                       = filter_var($_POST['dpto'], FILTER_SANITIZE_STRING);
        $sucursalRecepcion          = filter_var($_POST['sucursalRecepcion'], FILTER_SANITIZE_STRING);
        $lugarRecepcion             = filter_var($_POST['lugarRecepcion'], FILTER_SANITIZE_STRING);
        $tipoReparacion             = filter_var($_POST['tipoReparacion'], FILTER_SANITIZE_STRING);
        $atencion                   = filter_var($_POST['atencion'], FILTER_SANITIZE_STRING);
        $remitoCliente              = filter_var($_POST['remitoCliente'], FILTER_SANITIZE_STRING);
        $fechaReparacion            = new DateTime($_POST['fechaReparacion']);
        $tecnico                    = filter_var($_POST['tecnico'], FILTER_SANITIZE_STRING);
        $costoProducto              = filter_var($_POST['costoProducto'], FILTER_SANITIZE_STRING);
        $codigoProductoCanje        = filter_var($_POST['codigoProductoCanje'], FILTER_SANITIZE_STRING);
        $descripcionProductoCanje   = filter_var($_POST['descripcionProductoCanje'], FILTER_SANITIZE_STRING);
        $nuevoCliente               = $_POST['nuevoCliente'] == 'true' ? 'S' : 'N';
        $nuevoNroSerie              = $_POST['nuevoNroSerie'] == 'true' ? 'S' : 'N';
        $garantia                   = $_POST['garantia'] == 'true' ? 'S' : 'N';
        $flete                      = $_POST['flete'] == 'true' ? 'S' : 'N';
        $perfilSirep                = recuperaPerfil($_SESSION['usuario_id']);
        $fecha                      = new DateTime();
        $formateadaArg              = $fecha->format("Y-m-d H:i:s");
        $fechaReparacion            = $fechaReparacion->format("Y-m-d");
        $fechaDefault               = $fechaDefault->format("Y-m-d");
        $productoId                 = recuperaIdProducto($codigoProducto);
        $usuarioId                  = recuperaIdUsuario($_SESSION['usuario_id']);
        $conexion                   = conectar(DB_DSN, DB_USER, DB_PASS);

        switch ($tipoReparacion) {
            case 'P':
            case 'R':
                $estado             = $_POST['lugarRecepcion'] == '2' ? '1' : '2';
                $armado             = 'N';
                $productoIdCanje    = 0;
                break; 
            case 'C':
                $estado             = 6;
                $armado             = 'S';
                $productoIdCanje    = recuperaIdProducto($codigoProductoCanje);
                break;       
            default:
                $estado             = 2;
                $armado             = 'N';
                $productoIdCanje    = 0;
                break;
        }    

        if($perfilSirep == 1){

            for ($i=0; $i < 5 ; $i++) {
                $queryLock     = "SELECT valor AS bloqueo FROM rep3_parametros WHERE parametro_id = 5";
                $sentenciaSQL  = $conexion->prepare($queryLock);
                $respuestaLock = $sentenciaSQL->execute();
                $respuestaLock = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

                if($respuestaLock['bloqueo'] == 'N'){
                    break;
                }

                usleep(500000);
            }

            if($respuestaLock['bloqueo'] == 'S'){
                $arrayRespuesta['estado'] = "Tabla bloqueada";
                header("Content-type: aplication/json");
                echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
                exit();
            } else {
                $queryLock     = "UPDATE rep3_parametros SET valor = 'S' WHERE parametro_id = 5";
                $sentenciaSQL  = $conexion->prepare($queryLock);
                $respuestaLock = $sentenciaSQL->execute();
            }

            if($nuevoNroSerie == 'S'){
                $query2         = "SELECT valor FROM rep3_parametros WHERE parametro_id = 4";
                $sentenciaSQL   = $conexion->prepare($query2);
                $respuesta2     = $sentenciaSQL->execute();
                $serieNuevo		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
                $serieProducto  = ++$serieNuevo['valor'];
            }

            if($nuevoCliente == 'S' && $clienteId == ''){                  

                $query4 = " INSERT INTO rep3_clientes (
                                nombre, 
                                apellido, 
                                telefono, 
                                celular, 
                                email,
                                localidad_id,
                                calle, 
                                nro_calle,
                                dpto,
                                activo
                            ) VALUES (
                                '{$clienteNombre}', 
                                '{$clienteApellido}', 
                                '{$clienteTelefono}', 
                                '{$clienteCelular}', 
                                '{$clienteEmail}', 
                                '{$localidad}', 
                                '{$calle}', 
                                '{$numeroCalle}', 
                                '{$dpto}', 
                                'S'
                            )
                        ";
                $sentenciaSQL= $conexion->prepare($query4);
                $sentenciaSQL->execute();

                $query5         = "SELECT cliente_id FROM rep3_clientes ORDER BY cliente_id DESC LIMIT 1";
                $sentenciaSQL   = $conexion->prepare($query5);
                $respuesta5     = $sentenciaSQL->execute();
                $clienteId      = $respuesta5['cliente_id'];

            } else {
                $query4 = " UPDATE 
                                rep3_clientes 
                            SET 
                                nombre          = '{$clienteNombre}', 
                                apellido        = '{$clienteApellido}', 
                                telefono        = '{$clienteTelefono}', 
                                celular         = '{$clienteCelular}',
                                email           = '{$clienteEmail}',
                                localidad_id    = '{$localidad}',
                                calle           = '{$calle}',
                                nro_calle       = '{$numeroCalle}',
                                dpto            = '{$dpto}'
                            WHERE 
                                cliente_id  = '{$clienteId}'
                        ";
                $sentenciaSQL= $conexion->prepare($query4);
                //var_dump($sentenciaSQL);
                $sentenciaSQL->execute();
            }
           
            $query1 = " INSERT INTO rep3_reparaciones (
                            frecepcion, 
                            reclama_garantia, 
                            flete,
                            problema, 
                            observaciones, 
                            nro_serie, 
                            fretiro, 
                            costo, 
                            fdiagnostico, 
                            freparacion, 
                            fembalaje, 
                            fpresupuesto, 
                            fresolucion, 
                            reparacion_detalle, 
                            anulado, 
                            fanulado, 
                            cajon, 
                            finalizado, 
                            remito_cliente, 
                            estado_id, 
                            lugar_recepcion_id, 
                            tipo_ingreso, 
                            tipo_atencion, 
                            producto_id, 
                            forma_retiro_id, 
                            motivo_anulacion_id, 
                            cliente_id, 
                            estante_id, 
                            producto_canje_id, 
                            diagnosticador_id, 
                            reparador_id, 
                            embalador_id, 
                            anulador_id, 
                            presupuestador_id, 
                            finalizador_id, 
                            usuario_id, 
                            sucursal_id, 
                            tecnico_id,
                            armado,
                            farmado
                        ) VALUES (
                            '{$formateadaArg}',
                            '{$garantia}',
                            '{$flete}',
                            '{$problemaProducto}',
                            '{$observacionesProducto}',
                            '{$serieProducto}',
                            '{$fechaReparacion}',
                            '{$costoProducto}',
                            '{$fechaDefault}',
                            '{$fechaReparacion}',
                            '{$fechaDefault}',
                            '{$fechaDefault}',
                            '{$fechaDefault}',
                            '',
                            'N',
                            '{$fechaDefault}',
                            '',
                            'N',
                            '{$remitoCliente}',
                            '{$estado}',
                            '{$lugarRecepcion}',
                            '{$tipoReparacion}',
                            '{$atencion}',
                            '{$productoId}',
                            '0',
                            '0',
                            '{$clienteId}',
                            '0',
                            '{$productoIdCanje}',
                            '0',
                            '0',
                            '0',
                            '0',
                            '0',
                            '0',
                            '{$usuarioId}',
                            '{$sucursalRecepcion}',
                            '{$tecnico}',
                            '{$armado}',
                            '{$fechaDefault}'
                        )
                    ";

            $sentenciaSQL = $conexion->prepare($query1);
            //var_dump($sentenciaSQL);
            $respuesta1 = $sentenciaSQL->execute();

            $queryLock     = "UPDATE rep3_parametros SET valor = 'N' WHERE parametro_id = 5";
            $sentenciaSQL  = $conexion->prepare($queryLock);
            $respuestaLock = $sentenciaSQL->execute();

            if($respuesta1){
                if($nuevoNroSerie == 'S'){
                    $query3         = "UPDATE rep3_parametros SET valor = '{$serieProducto}' WHERE parametro_id = 4";
                    $sentenciaSQL   = $conexion->prepare($query3);
                    $respuesta3     = $sentenciaSQL->execute();
                }

                $query6         = " SELECT 
                                        rep3_reparaciones.frecepcion,
                                        rep3_reparaciones.reparacion_id,
                                        rep3_reparaciones.producto_id,
                                        rep3_productos.descripcion as modelo,
                                        rep3_reparaciones.nro_serie,
                                        rep3_reparaciones.problema,
                                        rep3_reparaciones.observaciones,
                                        rep3_reparaciones.cliente_id,
                                        rep3_clientes.nombre as nombre_cliente,
                                        rep3_clientes.apellido as apellido_cliente,
                                        rep3_clientes.telefono as telefono_cliente,
                                        rep3_clientes.celular as celular_cliente,
                                        rep3_clientes.email as email_cliente,
                                        rep3_reparaciones.reclama_garantia,
                                        rep3_reparaciones.usuario_id,
                                        rep3_usuarios.nombre as nombre_usuario,
                                        rep3_usuarios.apellido as apellido_usuario,
                                        Case rep3_reparaciones.tipo_ingreso
                                        when 'R' then 'REPARACIÓN'
                                        when 'P' then 'PRESUPUESTO'
                                        when 'C' then 'PLAN CANJE'
                                        when 'E' then 'CAMBIO EQUIPO'
                                        end As tipo_ingreso,
                                        Case rep3_reparaciones.tipo_atencion
                                        when '1' then 'REVISAR'
                                        when '2' then 'REPARAR EN EL MOMENTO'
                                        end As tipo_atencion
                                    FROM 
                                        rep3_reparaciones
                                    INNER JOIN
                                        rep3_productos
                                    ON
                                        rep3_reparaciones.producto_id = rep3_productos.producto_id 
                                    INNER JOIN
                                        rep3_clientes
                                    ON
                                        rep3_reparaciones.cliente_id = rep3_clientes.cliente_id 
                                    INNER JOIN
                                        rep3_usuarios
                                    ON
                                        rep3_reparaciones.usuario_id = rep3_usuarios.usuario_id 
                                    ORDER BY 
                                        reparacion_id 
                                    DESC LIMIT 1
                                ";
                $sentenciaSQL   = $conexion->prepare($query6);
                $respuesta6     = $sentenciaSQL->execute();
                $respuesta6		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

                $arrayRespuesta['estado'] = 'Transacción exitosa';
                $arrayRespuesta['valores'] = $respuesta6;
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            } 

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);

        if($clienteEmail != '' && $arrayRespuesta['estado'] == 'Transacción exitosa'){
            //require_once('envioMail.php');
        }

    };