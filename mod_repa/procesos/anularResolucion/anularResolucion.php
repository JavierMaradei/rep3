<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="col-md-12 text-end">
                    <h2><i>Anular resolución</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>
<form id="inputsAnularResolucion">
    <div class="row mt-3">
        <div class="col-md-12 mb-3">
            <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                <h4 class="card-header bg-black text-white text-center"><i>Anulación de resolución</i></h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-4 mb-2">
                            <label for="orden" class="form-label">Orden</label>
                            <input type="text" class="form-control" id="orden"> 
                        </div>
                        <div class="col-sm-4 mb-2">
                            <label for="fechaRecepcion" class="form-label">Fecha de recepción</label>
                            <input type="text" class="form-control" id="fechaRecepcion" disabled> 
                        </div>
                        <div class="col-sm-4 mb-2">
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
                        <div class="col-sm-4 mb-2">
                            <label for="formaResolucion" class="form-label">Forma de Resolución</label>
                            <select class="form-select" id="formaResolucion" disabled></select>
                        </div>
                        <div class="col-sm-4 mb-2">
                            <label for="costoFicha" class="form-label">Costo</label>
                            <input type="text" id="costoFicha" class="form-control" disabled>
                        </div>
                        <div class="col-sm-4 mb-2">
                            <label for="usuarioCierre" class="form-label">Cerrado por:</label>
                            <select class="form-select" id="usuarioCierre" disabled> </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12 text-center mt-2">
                            <button id="btnCancelar" type="button" class="btn btn-lg btn-danger">Cancelar</button>
                            <button id="btnAnularResolucion" type="button" class="btn btn-lg btn-success">Anular resolución</button>
                            <div id="respuesta" class="text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</form>

    </div>

<script src="./mod_repa/procesos/anularResolucion/script.js?v=<?php echo uniqid();?>"></script>