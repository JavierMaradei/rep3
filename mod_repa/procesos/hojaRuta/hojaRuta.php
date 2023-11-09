<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="dropdown col-md-4">
                    <button class="btn btn-warning btn-sm" type="button" id="btnPrefiltro">
                        Cantidad pedidos por técnico
                    </button>
                </div>

                <div class="col-md-8 text-end">
                    <h2><i>Hoja de Ruta</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-4 mb-3">
        <div class="card h-100">
            <form id="form">
                <h4 class="card-header bg-dark text-white text-center"><i>Pedido de Service</i></h4>
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="idPedido" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idPedido" class="form-control input-sm" disabled>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="nombreCliente" class="col-sm-2 col-form-label" title="Cliente">Cli.</label>
                        <div class="col-sm-10">
                            <input type="text" id="nombreCliente" class="form-control input-sm" disabled>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="provincia" class="col-sm-2 col-form-label" title="Provincia">Prov.</label>
                        <div class="col-sm-10">
                            <select class="form-select" id="provincia_id" disabled></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="localidad" class="col-sm-2 col-form-label" title="Localidad">Loc.</label>
                        <div class="col-sm-10">
                            <select class="form-select" id="localidad_id" disabled></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="calle" class="col-sm-2 col-form-label">Calle</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="calle" disabled> 
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="numeroCalle" class="col-sm-2 col-form-label">Nro.</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="numeroCalle" disabled> 
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="dpto" class="col-sm-2 col-form-label">Dpto.</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="dpto" disabled> 
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="fechaReparacion" class="col-sm-2 col-form-label" title="Fecha de visita">F.Vis.</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="fechaReparacion"> 
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="tecnico" class="col-sm-2 col-form-label" title="Técnico">Téc.</label>
                        <div class="col-sm-10">
                            <select class="form-select" id="tecnico"></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="hojaRuta" class="col-sm-2 col-form-label" title="Enviar a Hoja de Ruta">H/R</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="hojaRuta" class="form-check-input bigCheck">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button id="btnGrabar" class="btn btn-success btn-outline" disabled>Grabar</button>
                    <button id="btnCancelar" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
    <div class="col-md-8 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-dark text-white text-center"><i>Listado de Pedidos de Service</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive" style="width: 100%; overflow-y:auto; overflow-x:auto;">
                        <table id="tabla" class="table table-striped table-hover nowrap" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>F.Visita</th>
                                <th>Técnico</th>
                                <th>H.Ruta</th>
                                <th>Nombre</th>
                                <th>Provincia</th>                          
                                <th>Localidad</th>                          
                                <th>Calle</th>                          
                                <th>Número</th>                          
                                <th>Departamento</th>                          
                            </thead>
                            <tbody id="tbody">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal-->
<div id="modal" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnCloseModal" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Pedidos por técnico</h4>
            </div>
            <form id="formPrefiltro">
                <div class="modal-body">
                    <div style="overflow-x: auto;">
                        <div class="row m-3">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card-title" id="cardTitleModal"></div>
                                        <div class="d-flex flex-column gap-3" id="detalleTecnicosModal">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-sm-12 text-center">
                        <button class="btn btn-success" type="button" id="btnEnviarHR">Enviar Hoja de Ruta</button>
                        <button id="btnCerrarModal" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="./mod_repa/procesos/hojaRuta/script_hojaRuta.js?v=<?php echo uniqid();?>"></script>