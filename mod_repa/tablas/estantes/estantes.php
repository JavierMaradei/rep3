<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Estantes</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-8 mb-3">
        <div class="card h-100">
            <div class="card-body">
                <h3 class="card-title text-center"><i>Listado de Estantes</i></h3>
                <hr>
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_estantes" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Activo</th>                          
                            </thead>
                            <tbody id="tbodyEstantesList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4 mb-3">
        <div class="card h-100">
            <form id="formEstantes">
                <div class="card-body">
                    <h3 class="card-title text-center"><i>Estante</i></h3>
                    <hr>
                    <div class="row mb-2">
                        <label for="idEstantes" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idEstantes" class="form-control input-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="descripcionEstantes" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                        <div class="col-sm-10">
                            <input type="text" id="descripcionEstantes" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="input-group col-sm-12">
                            <span class="input-group-addon" style="font-weight: bold;">Activo</span>
                            <div class="input-group-addon">
                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" class="onoffswitch-checkbox" id="activoEstantes" checked>
                                        <label class="onoffswitch-label" for="activoEstantes">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button id="btnGrabaEstantes" class="btn btn-success btn-outline">Grabar</button>
                    <button id="btnEliminaEstantes" class="btn btn-danger btn-outline">Eliminar</button>
                    <button id="btnCancelaEstantes" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="./mod_repa/tablas/estantes/script_estantes.js?v=<?php echo uniqid();?>"></script>