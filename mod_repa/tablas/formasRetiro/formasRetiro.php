<?php include ('mod_sirep/nav_sirep/nav_sirep.php');?>
<div class="row">
    <div class="wrapper wrapper-content  animated fadeInRight">       
        <div class="col-lg-8 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox-title text-center">
                    <h3>Listado de Formas de Retiro</h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="tabla_formasRetiro" class="table table-striped table-hover">
                            <thead>
                                <th>Id</th>
                                <th>Descripción</th>
                                <th>Activo</th>
                                <th>Valorizado</th>                             
                            </thead>
                            <tbody id="tbodyFormasRetiroList">
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
                        <h3>Formas de Retiro</h3>
                    </div>
                    <form id="formFormasRetiro">
                        <div class="ibox-content">
                            <div class="form-group">
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Id</span>
                                    <input type="text" id="idFormasRetiro" class="form-control input-sm" readonly>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Descripción">Desc.</span>
                                    <input type="text" id="descripcionFormasRetiro" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Activo</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="activoFormasRetiro" checked>
                                                <label class="onoffswitch-label" for="activoFormasRetiro">
                                                    <span class="onoffswitch-inner"></span>
                                                    <span class="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Valorizado</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="valorizadoFormasRetiro">
                                                <label class="onoffswitch-label" for="valorizadoFormasRetiro">
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
                        <button id="btnGrabaFormasRetiro" class="btn btn-success btn-outline">Grabar</button>
                        <button id="btnEliminaFormasRetiro" class="btn btn-danger btn-outline">Eliminar</button>
                        <button id="btnCancelaFormasRetiro" class="btn btn-default btn-outline">Cancelar</button>
                    </div>                                                   
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_sirep/admin/tablas/formasRetiro/script_formasRetiro.js"></script>