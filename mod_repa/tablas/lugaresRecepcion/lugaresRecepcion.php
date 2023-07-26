<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Estados de Reparación</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-5 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-dark text-white text-center"><i>Lugar de Recepción</i></h4>
            <form id="formLugaresRecepcion">
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="idLugaresRecepcion" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idLugaresRecepcion" class="form-control input-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="descripcionLugaresRecepcion" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                        <div class="col-sm-10">
                            <input type="text" id="descripcionLugaresRecepcion" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="demoraLugaresRecepcion" class="col-sm-2 col-form-label" title="Descripción">Demora</label>
                        <div class="col-sm-10">
                            <input type="text" id="demoraLugaresRecepcion" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="activoLugaresRecepcion" class="col-sm-2 col-form-label">Activo</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="activoLugaresRecepcion" class="form-check-input bigCheck">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="fleteLugaresRecepcion" class="col-sm-2 col-form-label">Flete</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="fleteLugaresRecepcion" class="form-check-input bigCheck">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button id="btnGrabaLugaresRecepcion" class="btn btn-success btn-outline">Grabar</button>
                    <button id="btnEliminaLugaresRecepcion" class="btn btn-danger btn-outline">Eliminar</button>
                    <button id="btnCancelaLugaresRecepcion" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
    <div class="col-md-7 mb-3">
        <div class="card h-100">
        <h4 class="card-header bg-dark text-white text-center"><i>Listado de Lugares de Recepción</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_lugaresRecepcion" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Días de demora</th>
                                <th>Activo</th>
                                <th>Flete</th>                          
                            </thead>
                            <tbody id="tbodyLugaresRecepcionList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/tablas/lugaresRecepcion/script_lugaresRecepcion.js?v=<?php echo uniqid();?>"></script>