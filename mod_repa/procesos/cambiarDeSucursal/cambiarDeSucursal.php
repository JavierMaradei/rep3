<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="col-md-12 text-end">
                    <h2><i>Cambiar de sucursal</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>
<form id="inputsCambiarDeSucursal">
    <div class="row mt-3">
        <div class="col-md-12 mb-3">
            <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                <h4 class="card-header bg-black text-white text-center"><i>Cambio de sucursal</i></h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-3 mb-2">
                            <label for="orden" class="form-label">Orden</label>
                            <input type="text" class="form-control" id="orden"> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="fechaRecepcion" class="form-label">Fecha de recepción</label>
                            <input type="text" class="form-control" id="fechaRecepcion" disabled> 
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="sucursalOrden" class="form-label">Sucursal origen</label>
                            <select id="sucursalOrden" class="form-select" disabled></select>
                        </div>
                        <div class="col-sm-3 mb-2">
                            <label for="estado" class="form-label">Estado</label>
                            <select id="estado" class="form-select" disabled></select>
                        </div>
                        <div class="col-sm-2 mb-2">
                            <label for="idCliente" class="form-label">Id cliente</label>
                            <input type="text" class="form-control" id="idCliente" disabled> 
                        </div>
                        <div class="col-sm-10 mb-2">
                            <label for="cliente" class="form-label">Cliente</label>
                            <input type="text" class="form-control" id="cliente" disabled> 
                        </div>
                        <div class="col-sm-10 mb-2">
                            <label for="producto" class="form-label">Producto</label>
                            <input type="text" class="form-control" id="producto" disabled> 
                        </div>
                        <div class="col-sm-2 mb-2">
                            <label for="serie" class="form-label">Nro.serie</label>
                            <input type="text" class="form-control" id="serie" disabled> 
                        </div>
                        <div class="col-sm-6 mb-2">
                            <label for="sucursal" class="form-label">Sucursal destino</label>
                            <select id="sucursal" class="form-select"></select>
                        </div>
                        <div class="col-sm-6 mb-2">
                            <label for="remitoSucursal" class="form-label">Remito sucursal</label>
                            <input type="text" class="form-control" id="remitoSucursal"></input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12 text-center mt-2">
                            <button id="btnCancelar" type="button" class="btn btn-lg btn-danger">Cancelar</button>
                            <button id="btnGrabar" type="button" class="btn btn-lg btn-success">Grabar</button>
                            <div id="respuesta" class="text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</form>

    </div>

<script src="./mod_repa/procesos/cambiarDeSucursal/script.js?v=<?php echo uniqid();?>"></script>