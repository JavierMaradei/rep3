<!--Modal Prefiltro-->
<div id="modalPrefiltro" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnCloseModalPrefiltro" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Filtros</h4>
            </div>
            <form id="formPrefiltro">
                <div class="modal-body">
                    <div style="overflow-x: auto;">
                        <div class="row m-3">
                            <div class="col-md-12">
                                <!-- Simple widget and reports -->
                                <div class="list-group list-group-borderless mb-3">
                                    <div class="col-sm-12 mb-2">
                                        <label for="filtroOrden" class="form-label">Orden</label>
                                        <input type="text" class="form-control" id="filtroOrden"> 
                                    </div>  
                                    <div class="row">
                                        <div class="col-sm-6 mb-2">
                                            <label for="filtroFechas" class="form-label">Fecha Desde</label>
                                            <input type="date" id="filtroDesde" class="form-control">
                                        </div>
                                        <div class="col-sm-6 mb-2">
                                            <label for="filtroFechas" class="form-label">Fecha Hasta</label>
                                            <input type="date" id="filtroHasta" class="form-control">
                                        </div>
                                    </div>           
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-sm-12 text-center">
                        <button class="btn btn-success" type="button" id="btnBuscarPrefiltro">Buscar</button>
                        <button class="btn btn-danger" type="button" id="btnCancelarPrefiltro">Cancelar</button>
                        <button id="btnCerrarModalPrefiltro" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>