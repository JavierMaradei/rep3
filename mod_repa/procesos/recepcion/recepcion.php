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
                <h4 class="card-header bg-dark text-white text-center"><i>Datos del Producto</i></h4>
                <div class="card-body">
                    <div class="col-sm-12 mb-2">
                        <label for="codigoProducto" class="form-label">Código</label>
                        <input type="text" class="form-control" id="codigoProducto"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="descripcionProducto" class="form-label">Descripción</label>
                        <div class="input-group">
                            <input type="text" id="descripcionProducto" class="form-control" readonly>
                            <button class="btn btn-outline-secondary" type="button" id="btnBuscarProducto">Buscar</button>
                        </div>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="marcaProducto" class="form-label">Marca</label>
                        <input type="text" class="form-control" id="marcaProducto" disabled> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="familiaProducto" class="form-label">Familia</label>
                        <input type="text" class="form-control" id="familiaProducto" disabled> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="serieProducto" class="form-label">Serie</label>
                        <div class="input-group">
                            <input type="text" id="serieProducto" class="form-control">
                            <button class="btn btn-outline-secondary" type="button" id="btnGenerarNroSerie">Generar serie</button>
                        </div>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="problemaProducto" class="form-label">Problema</label>
                        <input type="text" class="form-control" id="problemaProducto"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="observacionesProducto" class="form-label">Observaciones</label>
                        <textarea class="form-control" id="observacionesProducto" cols="30" rows="6"></textarea>
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
                    <div class="col-sm-12 mb-2">
                        <label for="clienteId" class="form-label">ID Cliente</label>
                        <input type="text" class="form-control" id="clienteId" readonly> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="clienteApellido" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="clienteApellido"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="clienteNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="clienteNombre"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="clienteTelefono" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" id="clienteTelefono"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="clienteCelular" class="form-label">Celular</label>
                        <input type="text" class="form-control" id="clienteCelular"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="provincia" class="form-label">Provincia</label>
                        <select class="form-select" id="provincia"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="localidad" class="form-label">Localidad</label>
                        <select class="form-select" id="localidad"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="calle" class="form-label">Calle</label>
                        <input type="text" class="form-control" id="calle"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="numeroCalle" class="form-label">Número</label>
                        <input type="text" class="form-control" id="numeroCalle"> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="clienteEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="clienteEmail"> 
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6 mb-3">
            <div class="card h-100">
                <h4 class="card-header bg-dark text-white text-center"><i>Datos generales de Ingreso</i></h4>
                <div class="card-body">
                    <div class="col-sm-12 mb-2">
                        <label for="fechaRecepcion" class="form-label">Fecha</label>
                        <input type="date" class="form-control" id="fechaRecepcion" value="<?php echo date('Y-m-d'); ?>" readonly>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="sucursalRecepcion" class="form-label">Sucursal</label>
                        <select id="sucursalRecepcion" class="form-select"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="lugarRecepcion" class="form-label">Lugar de Recepción</label>
                        <select id="lugarRecepcion" class="form-select"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="tipoReparacion" class="form-label">Tipo de Reparación</label>
                        <select id="tipoReparacion" class="form-select"><?php echo tiposReparacion(); ?></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="atencion" class="form-label">Atención</label>
                        <select id="atencion" class="form-select"><?php echo tiposAtencion(); ?></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="remitoCliente" class="form-label">Remito</label>
                        <input type="text" class="form-control" id="remitoCliente"> 
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
            <div class="card h-60 mb-3">
                <h4 class="card-header bg-dark text-white text-center"><i>Datos Reparación</i></h4>
                <div class="card-body">
                    <div class="col-sm-12 mb-2">
                        <label for="fechaReparacion" class="form-label">Fecha de Reparación / Visita técnica</label>
                        <input type="date" class="form-control" id="fechaReparacion">
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="tecnico" class="form-label">Técnico Asignado</label>
                        <select id="tecnico" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="costoProducto" class="form-label">Costo</label>
                        <input type="text" class="form-control" id="costoProducto">
                    </div>
                </div>
            </div>
            <div class="card h-40">
                <h4 class="card-header bg-dark text-white text-center"><i>Producto destino Canje</i></h4>
                <div class="card-body">
                    <div class="col-sm-12 mb-2">
                        <label for="codigoProductoCanje" class="form-label">Código</label>
                        <input type="text" class="form-control" id="codigoProductoCanje" disabled> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="descripcionProductoCanje" class="form-label">Descripción</label>
                        <div class="input-group">
                            <input type="text" id="descripcionProductoCanje" class="form-control" readonly>
                            <button class="btn btn-outline-secondary" type="button" id="buscarProductoCanje" disabled>Buscar</button>
                        </div>
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
                        <div id="respuesta" class="text-center"></div>
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

