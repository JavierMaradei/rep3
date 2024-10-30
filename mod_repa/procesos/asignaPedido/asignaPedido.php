<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i style="color: white;">Asignar pedidos</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-3">
                <button type="button" class="btn btn-warning" id="pedidosFilter" style="width: 100%;">
                    <h3 style="color: white;">
                        Pedidos</br>abiertos <span class="badge bg-light" id="totalPedidosAbiertos" style="color: black;"></span>
                    </h3>
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-danger" id="pendientesFilter" style="width: 100%;">
                    <h3 style="color: white;">
                        Pedidos</br>pendientes <span class="badge bg-light" id="totalPedidosPendientes" style="color: black;"></span>
                    </h3>
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-info" id="coordinadosFilter" style="width: 100%;">
                    <h3 style="color: white;">
                        Pedidos</br>coordinados <span class="badge bg-light" id="totalPedidosCoordinados" style="color: black;"></span>
                    </h3>
                </button>
            </div>
            <div class="col-md-3">
                <button type="button" class="btn btn-secondary" id="concluidosFilter" style="width: 100%;">
                    <h3 style="color: white;">
                        Pedidos</br>concluidos <span class="badge bg-light" id="totalPedidosConcluidos" style="color: black;"></span>
                    </h3>
                </button>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-12 mb-3">
                <div class="card h-100">
                    <div class="col-sm-12">
                        <h4 class="card-header bg-light">
                            <div class="row">
                                <div class="col-sm-6">
                                    <i id="titleTable"></i>
                                </div>
                                <div class="col-sm-6">
                                    <i id="titleTableTecnico"></i>
                                </div>
                            </div>
                        </h4>
                    </div>

                    <div class="card-body">
                        <div class="row mb-2">
                            <div class="table-responsive">
                                <table id="tabla_pedidos" class="table table-striped table-hover" style="font-size: 11px; overflow: auto; font-weight: 400;">
                                    <thead>
                                        <th>N°Orden</th>
                                        <th>Hoja Ruta</th>
                                        <th>Coordinación</th>
                                        <th>Fecha alta <i class="fa fa-clock-o"></i></th>
                                        <th>Fecha visita <i class="fa fa-clock-o"></i></th>
                                        <th>Técnico</th>
                                        <th>Cliente</th>
                                        <th>Calle</th>
                                        <th>Nro</th>
                                        <th>Localidad</th>
                                        <th>Provincia</th>
                                        <th>Modelo</th>
                                        <th>Problema</th>
                                    </thead>
                                    <tbody id="tablaPedidos_body">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>

    </div>

    <div class="col-md-3 mb-3">

        <div class="card">
            <h5 class="card-header bg-light">Discriminado por técnico</h5>
            <div class="card-body">
                <div class="text-center mb-2">
                    <input type="date" class="form-control input-sm" id="prefiltroFechaDesde" title="Desde fecha de visita">
                    <input type="date" class="form-control input-sm" id="prefiltroFechaHasta" title="Hasta fecha de visita">
                    <div style="padding-top: 1vh;">
                        <button class="btn btn-info btn-sm" id="btnPrefiltroFechas">Buscar</button>
                        <button class="btn btn-light btn-sm" id="btnLimpiarFechas">Limpiar Filtros</button>
                    </div>
                </div>
                <div id="divTecnicos">
                </div>
            </div>
        </div>

    </div>

</div>

<!--Modal-->
<div id="modalHojaRuta" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-md" >
        <!-- Modal content-->
        <div class="modal-content" id="modalContent">
            <div class="modal-header text-center">
                <button id="btnCloseModalHojaRuta" type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 class="modal-title">Actualizar pedido</h3>
            </div>
            <div class="modal-body" style="background-color: #EEEEEE;">
                <div id="modalBody">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12" style="overflow-x: auto;">
                                    <?php include ('mod_repa/procesos/hojaRuta/actualizaPedido.php');?>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnGrabarModalHojaRuta" type="button" class="btn btn-success" data-dismiss="modal">Grabar</button>
                <button id="btnCerrarModalHojaRuta" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/procesos/asignaPedido/script.js?v=<?php echo uniqid();?>"></script>