<?php include ('mod_sirep/nav_sirep/nav_sirep.php');?>
<div class="row">
    <div class="wrapper wrapper-content  animated fadeInRight">       
        <div class="col-lg-8 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox-title text-center">
                    <h3>Listado de Feriados</h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="tabla_feriados" class="table table-striped table-hover">
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
        <div class="col-lg-4 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox content">
                    <div class="ibox-title text-center">
                        <h3>Feriado</h3>
                    </div>
                    <form id="formFeriados">
                        <div class="ibox-content">
                            <div class="form-group">
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Id</span>
                                    <input type="text" id="idFeriados" class="form-control input-sm" readonly>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Fecha</span>
                                    <input type="date" id="fechaFeriados" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Descripción">Desc.</span>
                                    <input type="text" id="descripcionFeriados" class="form-control input-sm">
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="ibox-content text-center">
                        <button id="btnGrabaFeriados" class="btn btn-success btn-outline">Grabar</button>
                        <button id="btnEliminaFeriados" class="btn btn-danger btn-outline">Eliminar</button>
                        <button id="btnCancelaFeriados" class="btn btn-default btn-outline">Cancelar</button>
                    </div>                                                   
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_sirep/admin/tablas/feriados/script_feriados.js"></script>