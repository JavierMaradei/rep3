<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i style="color: white;">Provincias</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-4 mb-3">
        <div class="card h-100">
            <form id="formProvincias">
                <h4 class="card-header bg-light text-center"><i>Provincia</i></h4>
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="idProvincia" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idProvincia" class="form-control input-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="descripcionProvincia" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                        <div class="col-sm-10">
                            <input type="text" id="descripcionProvincia" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="activoProvincia" class="col-sm-2 col-form-label">Activo</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="activoProvincia" class="form-check-input bigCheck">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button id="btnGrabar" class="btn btn-success btn-outline">Grabar</button>
                    <button id="btnEliminar" class="btn btn-danger btn-outline">Eliminar</button>
                    <button id="btnCancelar" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
    <div class="col-md-8 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Listado de Provincias</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_provincias" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Activo</th>                          
                            </thead>
                            <tbody id="tbodyProvinciasList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/tablas/provincias/script_provincias.js?v=<?php echo uniqid();?>"></script>