<?php include ('mod_sirep/nav_sirep/nav_sirep.php');?>
<div class="row">
    <div class="wrapper wrapper-content  animated fadeInRight">       
        <div class="col-lg-8 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox-title text-center">
                    <h3>Listado de Estantes</h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="tabla_estantes" class="table table-striped table-hover">
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
        <div class="col-lg-4 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox content">
                    <div class="ibox-title text-center">
                        <h3>Estante</h3>
                    </div>
                    <form id="formEstantes">
                        <div class="ibox-content">
                            <div class="form-group">
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Id</span>
                                    <input type="text" id="idEstantes" class="form-control input-sm" readonly>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Descripción">Desc.</span>
                                    <input type="text" id="descripcionEstantes" class="form-control input-sm">
                                </div>
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
                    </form>
                    <div class="ibox-content text-center">
                        <button id="btnGrabaEstantes" class="btn btn-success btn-outline">Grabar</button>
                        <button id="btnEliminaEstantes" class="btn btn-danger btn-outline">Eliminar</button>
                        <button id="btnCancelaEstantes" class="btn btn-default btn-outline">Cancelar</button>
                    </div>                                                   
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_sirep/admin/tablas/estantes/script_estantes.js"></script>