<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Formas de Retiro</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-8 mb-3">
        <div class="card h-100">
            <div class="card-body">
                <h3 class="card-title text-center"><i>Listado de Formas de Retiro</i></h3>
                <hr>
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_formasRetiro" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Activo</th>                      
                            </thead>
                            <tbody id="tbodyFormasRetiroList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4 mb-3">
        <div class="card h-100">
            <form id="formFormasRetiro">
                <div class="card-body">
                    <h3 class="card-title text-center"><i>Forma de Retiro</i></h3>
                    <hr>
                    <div class="row mb-2">
                        <label for="idFormasRetiro" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idFormasRetiro" class="form-control input-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="descripcionFormasRetiro" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                        <div class="col-sm-10">
                            <input type="text" id="descripcionFormasRetiro" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="activoFormasRetiro" class="col-sm-2 col-form-label">Activo</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="activoFormasRetiro" class="form-check-input bigCheck">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button id="btnGrabaFormasRetiro" class="btn btn-success btn-outline">Grabar</button>
                    <button id="btnEliminaFormasRetiro" class="btn btn-danger btn-outline">Eliminar</button>
                    <button id="btnCancelaFormasRetiro" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="./mod_repa/tablas/formasRetiro/script_formasRetiro.js?v=<?php echo uniqid();?>"></script>