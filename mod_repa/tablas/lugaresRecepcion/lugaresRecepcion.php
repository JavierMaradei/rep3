<?php include ('mod_sirep/nav_sirep/nav_sirep.php');?>
<div class="row">
    <div class="wrapper wrapper-content  animated fadeInRight">       
        <div class="col-lg-8 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox-title text-center">
                    <h3>Listado de Lugares de Recepción</h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="tabla_lugaresRecepcion" class="table table-striped table-hover">
                            <thead>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Días de demora</th>
                                <th>Activo</th>
                                <th>Flete</th>
                                <th>Hoja 1</th>   
                                <th>Hoja 2</th>                              
                            </thead>
                            <tbody id="tbodyLugaresRecepcionList">
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
                        <h3>Lugar de Recepción</h3>
                    </div>
                    <form id="formLugaresRecepcion">
                        <div class="ibox-content">
                            <div class="form-group">
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Id</span>
                                    <input type="text" id="idLugaresRecepcion" class="form-control input-sm" readonly>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Descripción">Desc.</span>
                                    <input type="text" id="descripcionLugaresRecepcion" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Días de demora">Demora</span>
                                    <input type="text" id="demoraLugaresRecepcion" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Activo</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="activoLugaresRecepcion" checked>
                                                <label class="onoffswitch-label" for="activoLugaresRecepcion">
                                                    <span class="onoffswitch-inner"></span>
                                                    <span class="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Flete</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="fleteLugaresRecepcion">
                                                <label class="onoffswitch-label" for="fleteLugaresRecepcion">
                                                    <span class="onoffswitch-inner"></span>
                                                    <span class="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <h3 class="text-center">Impresión de ticket</h3>
                            <div class="form-group">
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Hoja 1</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="hoja1LugaresRecepcion">
                                                <label class="onoffswitch-label" for="hoja1LugaresRecepcion">
                                                    <span class="onoffswitch-inner"></span>
                                                    <span class="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Hoja 2</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="hoja2LugaresRecepcion">
                                                <label class="onoffswitch-label" for="hoja2LugaresRecepcion">
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
                        <button id="btnGrabaLugaresRecepcion" class="btn btn-success btn-outline">Grabar</button>
                        <button id="btnEliminaLugaresRecepcion" class="btn btn-danger btn-outline">Eliminar</button>
                        <button id="btnCancelaLugaresRecepcion" class="btn btn-default btn-outline">Cancelar</button>
                    </div>                                                   
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_sirep/admin/tablas/lugaresRecepcion/script_lugaresRecepcion.js"></script>