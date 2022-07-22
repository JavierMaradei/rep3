<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Parámetros</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-8 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-dark text-white text-center"><i>Listado de Parámetros</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_parametros" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Valor</th>                          
                            </thead>
                            <tbody id="tbodyParametrosList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4 mb-3">
        <div class="card h-100">
            <form id="formParametros">
                <h4 class="card-header bg-dark text-white text-center"><i>Parámetro</i></h4>
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="idParametros" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idParametros" class="form-control input-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="descripcionParametros" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                        <div class="col-sm-10">
                            <input type="text" id="descripcionParametros" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="valorParametros" class="col-sm-2 col-form-label">Valor</label>
                        <div class="col-sm-10 text-center">
                            <input type="text" id="valorParametros" class="form-control input-sm">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button id="btnGrabaParametros" class="btn btn-success btn-outline">Grabar</button>
                    <!-- <button id="btnEliminaParametros" class="btn btn-danger btn-outline">Eliminar</button> -->
                    <button id="btnCancelaParametros" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="./mod_repa/configuracion/parametros/script_parametros.js?v=<?php echo uniqid();?>"></script>