<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="col-md-12 text-end">
                    <h2><i style="color: white;">Buscador</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>
<form id="inputsBuscador">
    <div class="row mt-3">
        <div class="col-md-6 mb-3">
            <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                <h4 class="card-header bg-light text-center"><i>Información de ingreso</i></h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-6 mb-2">
                            <label for="orden" class="form-label">Orden</label>
                            <input type="text" class="form-control" id="orden"> 
                        </div>
                        <div class="col-sm-6 mb-2">
                            <label for="nroPresupuesto" class="form-label">Nro.Presupuesto</label>
                            <input type="text" class="form-control" id="nroPresupuesto"> 
                        </div>
                        <div class="col-sm-6 mb-2">
                            <label for="desdeFechaRecepcion" class="form-label" >Desde fecha de recepción</label>
                            <input type="date" class="form-control" id="desdeFechaRecepcion" value="<?php echo date('Y-m-d', strtotime('-18 month')); ?>"> 
                        </div>
                        <div class="col-sm-6 mb-2">
                            <label for="hastaFechaRecepcion" class="form-label">Hasta fecha de recepción</label>
                            <input type="date" class="form-control" id="hastaFechaRecepcion" value="<?php echo date('Y-m-d', strtotime('now')); ?>"> 
                        </div>
                        <div class="col-sm-6 mb-2">
                            <label for="tecnico" class="form-label">Técnico</label>
                            <select id="tecnico" class="form-select"></select>
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="remitoCliente" class="form-label">Remito cliente</label>
                            <input type="text" class="form-control" id="remitoCliente"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="remitoDespacho" class="form-label">Remito despacho</label>
                            <input type="text" class="form-control" id="remitoDespacho"> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6 mb-3">
            <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                <h4 class="card-header bg-light text-center"><i>Información del producto</i></h4>
                <div class="card-body">
                    <div class="row">
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
                            <label for="serieProducto" class="form-label">Serie</label>
                            <input type="text" id="serieProducto" class="form-control">
                            <div class="col-sm-12 pt-3 text-center">
                                <div class="form-check form-check-inline">
                                    <input id="numeroExacto" class="form-check-input" type="checkbox">
                                    <label for="numeroExacto" class="form-check-label">Número exacto</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-md-12 mb-3">
            <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                <h4 class="card-header bg-light text-center"><i>Información del cliente</i></h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-6 text-center">
                            <div class="input-group mb-3 text-end">
                                <input type="text" id="searchCliente" class="form-control" placeholder="Ingrese Id, nombre, apellido, telefono, email o calle">
                                <button class="btn btn-outline-secondary" type="button" id="btnBuscarCliente">Buscar cliente</button>
                            </div>
                        </div>
                        <div class="col-sm-3"></div>
                        <div class="col-sm-3 mb-2">
                            <label for="clienteId" class="form-label">ID Cliente</label>
                            <input type="text" class="form-control" id="clienteId" readonly> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="clienteApellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="clienteApellido"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="clienteNombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="clienteNombre"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="clienteTelefono" class="form-label">Teléfono</label>
                            <input type="text" class="form-control" id="clienteTelefono"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="clienteCelular" class="form-label">Celular</label>
                            <input type="text" class="form-control" id="clienteCelular"> 
                        </div>
                        <div class="col-sm-6 mb-2">
                            <label for="clienteEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="clienteEmail"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="provincia" class="form-label">Provincia</label>
                            <select class="form-select" id="provincia"></select>
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="localidad" class="form-label">Localidad</label>
                            <select class="form-select" id="localidad"></select>
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="calle" class="form-label">Calle</label>
                            <input type="text" class="form-control" id="calle"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="numeroCalle" class="form-label">Número</label>
                            <input type="text" class="form-control" id="numeroCalle"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="dpto" class="form-label">Dpto.</label>
                            <input type="text" class="form-control" id="dpto"> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12 text-center mt-2">
                            <button id="btnCancelar" type="button" class="btn btn-lg btn-danger">Cancelar</button>
                            <button id="btnBuscar" type="button" class="btn btn-lg btn-success">Buscar</button>
                            <div id="respuesta" class="text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</form>

    <div class="col-md-12 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Tabla de órdenes</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_buscador" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Orden</th>
                                <th>F.Recepción</th>
                                <th>F.Retiro</th>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Nro.Serie</th>
                                <th>Cliente</th>
                                <th>Ingreso</th>
                                <th>Atención</th>  
                                <th>Tipo</th>                          
                                <th>Sucursal</th>                          
                            </thead>
                            <tbody id="tbodyBuscadorList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>

<!--Modal Buscador-->
<div id="modalBuscador" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnCloseModalBuscador" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="tituloBuscador"></h4>
            </div>
            <div class="modal-body">
                <div id="bodyBuscador" style="overflow-x: auto;"></div>
            </div>
            <div class="modal-footer">
                <button id="btnCerrarModalBuscador" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/procesos/buscar/script_buscar.js?v=<?php echo uniqid();?>"></script>