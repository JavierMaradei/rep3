<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Recepción de productos</i></h2>
        </div>
    </div>
</div>
<form id="formRecepcion">
    <div class="row mt-3">
        <div class="col-md-6 mb-3">
            <div class="card h-100">
                <h4 class="card-header bg-dark text-white text-center"><i>Datos generales de Ingreso</i></h4>
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="fechaRecepcion" class="col-sm-2 col-form-label">Fecha</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="fechaRecepcion" value="<?php echo date('Y-m-d'); ?>" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="sucursalRecepcion" class="col-sm-2 col-form-label">Sucursal</label>
                        <div class="col-sm-10">
                            <select id="sucursalRecepcion" class="form-select"></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="lugarRecepcion" class="col-sm-2 col-form-label">L.Recepción</label>
                        <div class="col-sm-10">
                            <select id="lugarRecepcion" class="form-select"></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="tipoReparacion" class="col-sm-2 col-form-label">Tipo</label>
                        <div class="col-sm-10">
                            <select id="tipoReparacion" class="form-select"><?php echo tiposReparacion(); ?></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="atencion" class="col-sm-2 col-form-label">Atención</label>
                        <div class="col-sm-10">
                            <select id="atencion" class="form-select"><?php echo tiposAtencion(); ?></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="remitoCliente" class="col-sm-2 col-form-label">Remito</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="remitoCliente">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label class="col-sm-3 col-form-label">Adicionales</label>
                        <div class="col-sm-9 pt-3">
                            <div class="form-check form-check-inline">
                                <input id="garantia" class="form-check-input" type="checkbox">
                                <label for="garantia" class="form-check-label">Reclama garantía</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input id="flete" class="form-check-input" type="checkbox">
                                <label for="flete" class="form-check-label">Flete</label>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div class="col-md-6 mb-3">
            <div class="card h-100">
                <h4 class="card-header bg-dark text-white text-center"><i>Datos Cliente</i></h4>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-sm-12 text-center">
                            <button id="btnNuevoCliente" type="button" class="btn btn-lg btn-info">Nuevo cliente</button>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" id="searchCliente" class="form-control" placeholder="Ingrese Id, nombre, apellido, telefono, email o dirección">
                        <button class="btn btn-outline-secondary" type="button" id="btnBuscarCliente">Buscar cliente</button>
                    </div>
                    <div class="row mb-2">
                        <label for="clienteIdR" class="col-sm-2 col-form-label">ID Cliente</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="clienteIdR" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="clienteApellidoR" class="col-sm-2 col-form-label">Apellido</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="clienteApellidoR">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="clienteNombreR" class="col-sm-2 col-form-label">Nombre</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="clienteNombreR">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="clienteTelefonoR" class="col-sm-2 col-form-label">Teléfono</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="clienteTelefonoR">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="clienteCelularR" class="col-sm-2 col-form-label">Celular</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="clienteCelularR">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="clienteDireccionR" class="col-sm-2 col-form-label">Dirección</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="clienteDireccionR">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="clienteEmailR" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="clienteEmailR">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6 mb-3">
            <div class="card h-100">
                <h4 class="card-header bg-dark text-white text-center"><i>Datos del Producto</i></h4>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-sm-12 text-center">
                            <button id="btnNuevoProducto" type="button" class="btn btn-lg btn-info">Nuevo producto</button>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <label for="codigoProductoR" class="col-sm-2 col-form-label">Código</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="codigoProductoR">
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <label for="descripcionProductoR" class="col-sm-2 col-form-label">Descripción</label>
                        <input type="text" id="descripcionProductoR" class="form-control" readonly>
                        <button class="btn btn-outline-secondary" type="button" id="buscarProducto">Buscar</button>
                    </div>

                    <div class="input-group mb-3">
                        <label for="serieProductoR" class="col-sm-2 col-form-label">Serie</label>
                        <input type="text" id="serieProductoR" class="form-control">
                        <button class="btn btn-outline-secondary" type="button" id="generarNroSerie">Generar serie</button>
                    </div>
                    <div class="row mb-2">
                        <label for="problemaProducto" class="col-sm-2 col-form-label">Problema</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="problemaProducto">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="observacionesProducto" class="col-sm-2 col-form-label">Observaciones</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="observacionesProducto" cols="30" rows="4"></textarea>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-md-6 mb-3 pb-3">
            <div class="card h-50 mb-3">
                <h4 class="card-header bg-dark text-white text-center"><i>Datos Retiro</i></h4>
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="fechaRetiro" class="col-sm-2 col-form-label">F.Retiro</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="fechaRetiro"readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="costoProducto" class="col-sm-2 col-form-label">Costo</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="costoProducto">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card h-50">
                <h4 class="card-header bg-dark text-white text-center"><i>Producto destino Canje</i></h4>
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="codigoProductoCanjeR" class="col-sm-2 col-form-label">Código</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="codigoProductoCanjeR" readonly>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <label for="descripcionProductoCanjeR" class="col-sm-2 col-form-label">Descripción</label>
                        <input type="text" id="descripcionProductoCanjeR" class="form-control" readonly>
                        <button class="btn btn-outline-secondary" type="button" id="buscarProductoCanje" disabled>Buscar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 mb-3">
            <div class="card h-100">
                <div class="card-body">
                    <div class="col-sm-12 text-center">
                        <button class="btn btn-lg btn-success" type="button" id="btnGenerarOrden">Generar orden</button>
                        <button class="btn btn-lg btn-danger" type="button" id="btnCancelarOrden">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</form>

<!--Modal Recepción-->
<div id="modalRecepcion" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnCloseModal" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="titulo"></h4>
            </div>
            <div class="modal-body">
                <div id="bodyRecepcion" style="overflow-x: auto;"></div>
            </div>
            <div class="modal-footer">
                <button id="btnCerrarModal" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/procesos/recepcion/script_recepcion.js?v=<?php echo uniqid();?>"></script>