<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        $arrayRespuesta     = array();
        $countEnvioOk       = 0;
        $countEnvioError    = 0;

        $query ="   SELECT 
                        rep3_reparaciones.reparacion_id,
                        rep3_reparaciones.cliente_id,
                        rep3_reparaciones.producto_id,
                        rep3_productos.codigo                                                   as codigoProducto,
                        rep3_productos.descripcion                                              as descripcionProducto,
                        CONVERT(rep3_reparaciones.freparacion, DATE)                            as fechaReparacion,
                        CONCAT(trim(rep3_clientes.apellido),', ',trim(rep3_clientes.nombre))    as cliente, 
                        rep3_clientes.localidad_id, 
                        rep3_clientes.calle, 
                        rep3_clientes.nro_calle, 
                        rep3_clientes.dpto,
                        rep3_usuarios.email                                                     as mail,
                        rep3_localidades.provincia_id, 
                        rep3_localidades.descripcion                                            as localidad,
                        rep3_provincias.descripcion                                             as provincia,
                        CONCAT(trim(rep3_usuarios.apellido),', ',trim(rep3_usuarios.nombre))    as tecnico, 
                        rep3_reparaciones.hoja_ruta                                             as hojaRuta
                    FROM 
                        rep3_reparaciones
                    INNER JOIN
                        rep3_clientes
                    ON
                        rep3_reparaciones.cliente_id            = rep3_clientes.cliente_id
                    INNER JOIN
                        rep3_localidades
                    ON
                        rep3_clientes.localidad_id              = rep3_localidades.localidad_id
                    INNER JOIN
                        rep3_provincias
                    ON
                        rep3_localidades.provincia_id           = rep3_provincias.provincia_id
                    INNER JOIN
                        rep3_productos
                    ON
                        rep3_reparaciones.producto_id           = rep3_productos.producto_id
                    LEFT JOIN
                        rep3_usuarios
                    ON
                        rep3_reparaciones.tecnico_id            = rep3_usuarios.usuario_id
                    WHERE 
                        rep3_reparaciones.estado_id             = '1'
                    AND
                        rep3_reparaciones.lugar_recepcion_id    = '2'
                    AND
                        rep3_reparaciones.anulado               <> 'S'
                    AND
                        rep3_reparaciones.envio_mail            = 'N'
                    AND
                        rep3_reparaciones.hoja_ruta             = 'S'
                ";

        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   ->execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $contadorFilas  = count($resultado);
        $arrayEnvios    = array();

        foreach ($resultado as $key => $value) {

            $count = 0;

            $arrayEnvios[$value['mail']][$key][$count++] = $value['reparacion_id'];
            $arrayEnvios[$value['mail']][$key][$count++] = new DateTime($value['fechaReparacion']);
            $arrayEnvios[$value['mail']][$key][$count++] = $value['cliente'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['calle'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['nro_calle'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['dpto'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['localidad'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['provincia'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['tecnico'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['codigoProducto'];
            $arrayEnvios[$value['mail']][$key][$count++] = $value['descripcionProducto'];
        }

        foreach ($arrayEnvios as $email => $agrupados) {

            if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                $tabla = "
                    <table rules='all' style='border: 2px solid #000'; font-size: '11px;'>
                        <tr>
                            <th>Nro. de Orden</th>
                            <th>Fecha Visita</th>
                            <th>Cliente</th>
                            <th>Calle</th>
                            <th>Nro</th>
                            <th>Dpto</th>
                            <th>Localidad</th>
                            <th>Provincia</th>
                            <th>Técnico</th>
                            <th>Código Producto</th>
                            <th>Desc. Producto</th>
                        </tr>
                ";
                foreach ($agrupados as $key => $value) {

                    $razonSocialCliente = $value[2];

                    $tabla .=   "
                        <tr>
                            <td>".$value[0]."</td>
                            <td>".date_format($value[1], 'd/m/Y')."</td>
                            <td>".$value[2]."</td>
                            <td>".$value[3]."</td>
                            <td>".$value[4]."</td>
                            <td>".$value[5]."</td>
                            <td>".$value[6]."</td>
                            <td>".$value[7]."</td>
                            <td>".$value[8]."</td>
                            <td>".$value[9]."</td>
                            <td>".$value[10]."</td>
                        </tr>
                    ";

                    $query99= " UPDATE 
                                    rep3_reparaciones 
                                SET 
                                    estado_id       = 2,
                                    envio_mail      = 'S' 
                                WHERE 
                                    reparacion_id   = {$value[0]} 
                            ";
                    $sentenciaSQL   = $conexion->prepare($query99);
                    $sentenciaSQL   ->execute();
                }

                $tabla .=   "
                    </table>
                ";

                //echo $tabla;
                require('hojaRuta_send.php');
            }
        }

        $arrayRespuesta['respuesta']        = 'Ok';
        $arrayRespuesta['cantRegistros']    = $contadorFilas;
        $arrayRespuesta['mailOk']           = $countEnvioOk;
        $arrayRespuesta['mailError']        = $countEnvioError;

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta);
    }