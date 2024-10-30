<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i style="color: white;">Feriados</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-8 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Listado de Feriados</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_feriados" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Fecha</th>
                                <th>Descripción</th>                           
                            </thead>
                            <tbody id="tbodyFeriadosList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Feriado</i></h4>
            <form id="formFeriados">
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="idFeriados" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idFeriados" class="form-control input-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="fechaFeriados" class="col-sm-2 col-form-label">Fecha</label>
                        <div class="col-sm-10">
                            <input type="date" id="fechaFeriados" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="descripcionFeriados" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                        <div class="col-sm-10">
                            <input type="text" id="descripcionFeriados" class="form-control input-sm">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button id="btnGrabaFeriados" class="btn btn-success btn-outline">Grabar</button>
                    <button id="btnEliminaFeriados" class="btn btn-danger btn-outline">Eliminar</button>
                    <button id="btnCancelaFeriados" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="./mod_repa/tablas/feriados/script_feriados.js?v=<?php echo uniqid();?>"></script>