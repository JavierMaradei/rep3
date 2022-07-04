<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Recepción de productos</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-6 mb-3">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">Datos generales de Ingreso</h5>
                <hr>
                <div class="row mb-2">
                    <label for="nroDeOrden" class="col-sm-2 col-form-label">Orden</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="nroDeOrden" value="1" readonly>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="fechaRecepcion" class="col-sm-2 col-form-label">Fecha</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="fechaRecepcion" value="<?php echo date('Y-m-d'); ?>" readonly>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="lugarRecepcion" class="col-sm-2 col-form-label">L.Recepción</label>
                    <div class="col-sm-10">
                        <select id="lugarRecepcion" class="form-select">
                            <option value="1" selected>Villa Devoto</option>
                            <option value="2">Pilar</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="tipoReparacion" class="col-sm-2 col-form-label">Tipo</label>
                    <div class="col-sm-10">
                        <select id="tipoReparacion" class="form-select">
                            <option value="1" selected>Reparación</option>
                            <option value="2">Presupuesto</option>
                            <option value="3">Plan canje</option>
                            <option value="3">Cambio de equipo</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="atencion" class="col-sm-2 col-form-label">Atención</label>
                    <div class="col-sm-10">
                        <select id="atencion" class="form-select">
                            <option value="1" selected>Revisar</option>
                            <option value="2">Reparar en el momento</option>
                        </select>
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
            <div class="card-body">
                <h5 class="card-title">Datos Cliente</h5>
                <hr>
                <div class="row mb-3">
                    <div class="col-sm-12 text-center">
                        <button id="btnNuevoCliente" type="button" class="btn btn-lg btn-info">Nuevo cliente</button>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" id="searchCliente" class="form-control" placeholder="Ingrese código, nombre o apellido">
                    <button class="btn btn-outline-secondary" type="button" id="btnBuscarCliente">Buscar cliente</button>
                </div>
                <div class="row mb-2">
                    <label for="clienteCodigo" class="col-sm-2 col-form-label">Código</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="clienteCodigo" readonly>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="clienteApellido" class="col-sm-2 col-form-label">Apellido</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="clienteApellido">
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="clienteNombre" class="col-sm-2 col-form-label">Nombre</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="clienteNombre">
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="clienteTelefono" class="col-sm-2 col-form-label">Teléfono</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="clienteTelefono">
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="clienteCelular" class="col-sm-2 col-form-label">Celular</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="clienteCelular">
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="clienteEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="clienteEmail">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6 mb-3">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">Datos del Producto</h5>
                <hr>
                <div class="row mb-2">
                    <label for="codigoProducto" class="col-sm-2 col-form-label">Código</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="codigoProducto">
                    </div>
                </div>
                <div class="input-group mb-3">
                    <label for="descripcionProducto" class="col-sm-2 col-form-label">Descripción</label>
                    <input type="text" id="descripcionProducto" class="form-control" readonly>
                    <button class="btn btn-outline-secondary" type="button" id="buscarProducto">Buscar</button>
                </div>

                <div class="input-group mb-3">
                    <label for="serieProducto" class="col-sm-2 col-form-label">Serie</label>
                    <input type="text" id="serieProducto" class="form-control">
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
            <div class="card-body">
                <h5 class="card-title">Datos Retiro</h5>
                <hr>
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
        <div class="card h-50 " id="divCanje">
            <div class="card-body">
                <h5 class="card-title">Producto destino Canje</h5>
                <hr>
                <div class="row mb-2">
                    <label for="codigoProductoCanje" class="col-sm-2 col-form-label">Código</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="codigoProductoCanje" readonly>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <label for="descripcionProductoCanje" class="col-sm-2 col-form-label">Descripción</label>
                    <input type="text" id="descripcionProductoCanje" class="form-control" readonly>
                    <button class="btn btn-outline-secondary" type="button" id="buscarProductoCanje" disabled>Buscar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-12 mb-3">
        <div class="card h-100">
            <div class="card-body">
                <div class="col-sm-12 text-center">
                    <button class="btn btn-lg btn-success" type="button" id="generarOrdenProducto">Generar orden</button>
                    <button class="btn btn-lg btn-danger" type="button" id="cancelarOrdenProducto">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    
</div>

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