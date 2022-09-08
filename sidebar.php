        <aside class="sidebar">
            <div class="sidebar__inner scrollable-content">

                <!-- This element is only visible when sidebar Stick mode is active. -->
                <div class="sidebar__stuck align-item-center mb-3 px-4">
                    <p class="m-0 text-danger">Close the sidebar =></p>
                    <button type="button" class="sidebar-toggler btn-close btn-lg rounded-circle ms-auto" aria-label="Close"></button>
                </div>

                <!-- Sidebar tabs nav -->
                <div class="sidebar__wrap">
                    <nav class="px-3">
                        <div class="nav nav-callout nav-fill flex-nowrap" id="nav-tab" role="tablist">
                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-datos" type="button" role="tab" aria-controls="nav-chat" aria-selected="true">
                                <i class="d-block demo-pli-information fs-3 mb-2"></i>
                                <span>Datos</span>
                            </button>

                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-ficha" type="button" role="tab" aria-controls="nav-reports" aria-selected="false">
                                <i class="d-block demo-pli-wrench fs-3 mb-2"></i>
                                <span>Ficha</span>
                            </button>

                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-cerrar" type="button" role="tab" aria-controls="nav-settings" aria-selected="false">
                                <i class="d-block demo-pli-close fs-3 mb-2"></i>
                                <span>Cerrar</span>
                            </button>
                        </div>
                    </nav>
                </div>
                <!-- End - Sidebar tabs nav -->

                <!-- Sideabar tabs content -->
                <div class="tab-content sidebar__wrap" id="nav-tabContent">

                    <!-- Chat tab Content -->
                    <div id="nav-datos" class="tab-pane fade py-4 show active" role="tabpanel" aria-labelledby="nav-chat-tab">
                        <div class="row p-3">

                            <!-- Card datos del ingreso -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Datos generales de Ingreso</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6 mb-2">
                                                <label for="ordenFicha" class="form-label">Orden</label>
                                                <input type="text" class="form-control" id="ordenFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="lugarRecepcionFicha" class="form-label">Lugar de Recepción</label>
                                                <select id="lugarRecepcionFicha" class="form-select" disabled></select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="sucursalRecepcionFicha" class="form-label">Sucursal</label>
                                                <select id="sucursalRecepcionFicha" class="form-select" disabled></select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="tecnicoFicha" class="form-label">Técnico</label>
                                                <select id="tecnicoFicha" class="form-select" disabled></select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="emisorFicha" class="form-label">Emisor</label>
                                                <select id="emisorFicha" class="form-select" disabled></select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Card fechas -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Fechas generales</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6 mb-2">
                                                <label for="fechaRecepcionFicha" class="form-label">Fecha de Recepción</label>
                                                <input type="text" class="form-control" id="fechaRecepcionFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="fechaDiagnosticoFicha" class="form-label">Fecha de Diagnóstico</label>
                                                <input type="text" class="form-control" id="fechaDiagnosticoFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="fechaReparacionFicha" class="form-label">Fecha de Reparación</label>
                                                <input type="text" class="form-control" id="fechaReparacionFicha" readonly>  
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="fechaEmbalajeFicha" class="form-label">Fecha de Embalaje</label>
                                                <input type="text" class="form-control" id="fechaEmbalajeFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="fechaCierreFicha" class="form-label">Fecha de Cierre</label>
                                                <input type="text" class="form-control" id="fechaCierreFicha" readonly> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Card datos del cliente -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Datos Cliente</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-4 mb-2">
                                                <label for="clienteIdFicha" class="form-label">ID Cliente</label>
                                                <input type="text" class="form-control" id="clienteIdFicha" readonly> 
                                            </div>
                                            <div class="col-sm-8 mb-2">
                                                <label for="clienteApellidoFicha" class="form-label">Apellido</label>
                                                <input type="text" class="form-control" id="clienteApellidoFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="clienteNombreFicha" class="form-label">Nombre</label>
                                                <input type="text" class="form-control" id="clienteNombreFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="clienteDireccionFicha" class="form-label">Dirección</label>
                                                <input type="text" class="form-control" id="clienteDireccionFicha" readonly> 
                                            </div>
                                            <div class="col-sm-12 pt-4 text-center">
                                                <button class="btn btn-outline-secondary" type="button" id="btnDatosClienteFIcha">+ Datos</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Card Datos Reparación -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Datos de Recepción</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6 mb-2">
                                                <label for="tipoReparacionFicha" class="form-label">Tipo de Reparación</label>
                                                <select id="tipoReparacionFicha" class="form-select" disabled><?php echo tiposReparacion(); ?></select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="atencionFicha" class="form-label">Atención</label>
                                                <select id="atencionFicha" class="form-select" disabled><?php echo tiposAtencion(); ?></select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="garantiaFicha" class="form-label">Reclama garantía</label>
                                                <input type="text" class="form-control" id="garantiaFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="fleteFicha" class="form-label">Flete</label>
                                                <input type="text" class="form-control" id="fleteFicha" readonly> 
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="remitoClienteFicha" class="form-label">Remito</label>
                                                <input type="text" class="form-control" id="remitoClienteFicha" readonly> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card datos del producto -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Datos del Producto</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6 mb-2">
                                                <label for="marcaProductoFicha" class="form-label">Marca</label>
                                                <select id="marcaProductoFicha" class="form-select" disabled></select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="familiaProductoFicha" class="form-label">Familia</label>
                                                <select id="familiaProductoFicha" class="form-select" disabled></select>
                                            </div>
                                            <div class="col-sm-8 mb-2">
                                                <label for="productoFicha" class="form-label">Producto</label>
                                                <input type="text" class="form-control" id="productoFicha" readonly> 
                                            </div>
                                            <div class="col-sm-4 mb-2">
                                                <label for="serieProductoFicha" class="form-label">Serie</label>
                                                <input type="text" id="serieProductoFicha" class="form-control" readonly>
                                            </div>
                                            <div class="col-sm-12 mb-2">
                                                <label for="problemaProductoFicha" class="form-label">Problema</label>
                                                <input type="text" class="form-control" id="problemaProductoFicha" readonly> 
                                            </div>
                                            <div class="col-sm-12 mb-2">
                                                <label for="observacionesProductoFicha" class="form-label">Observaciones</label>
                                                <textarea class="form-control" id="observacionesProductoFicha" cols="30" rows="4" readonly></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Estados -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Estado</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-6 mb-2">
                                                <label for="estadoFicha" class="form-label">Estado</label>
                                                <select id="estadoFicha" class="form-select" disabled></select>
                                            </div>
                                            <div class="col-sm-4 mb-2">
                                                <label for="estanteFicha" class="form-label">Estante</label>
                                                <input type="text" class="form-control" id="estanteFicha" readonly> 
                                            </div>
                                            <div class="col-sm-12 mb-2">
                                                <label for="detalleEmbalajeFicha" class="form-label">Detalle del embalaje</label>
                                                <textarea class="form-control" id="detalleEmbalajeFicha" cols="30" rows="3" readonly></textarea>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="diagnosticadorFicha" class="form-label">Diagnosticador</label>
                                                <select class="form-select" id="diagnosticadorFicha" disabled> </select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="reparadorFicha" class="form-label">Reparador</label>
                                                <select class="form-select" id="reparadorFicha" disabled> </select>
                                            </div>
                                            <div class="col-sm-6 mb-2">
                                                <label for="embaladorFicha" class="form-label">Embalador</label>
                                                <select class="form-select" id="embaladorFicha" disabled> </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Producto destino Canje -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Producto destino Canje</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-4 mb-2">
                                                <label for="codigoProductoCanje" class="form-label">Código</label>
                                                <input type="text" class="form-control" id="codigoProductoCanje" readonly> 
                                            </div>
                                            <div class="col-sm-8 mb-2">
                                                <label for="descripcionProductoCanje" class="form-label">Descripción</label>
                                                <input type="text" id="descripcionProductoCanje" class="form-control" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Remito -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Remito</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-8 mb-2">
                                                <label for="remitoResolucionFicha" class="form-label">Remito de Despacho</label>
                                                <input type="text" class="form-control" id="remitoResolucionFicha" readonly> 
                                            </div>
                                            <div class="col-sm-4 mb-2">
                                                <label for="remitoFechaResolucionFicha" class="form-label">Fecha</label>
                                                <input type="text" id="remitoFechaResolucionFicha" class="form-control" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Resolución / cargo -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Resolución / Cargo</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-12 mb-2">
                                                <label for="formaResolucionFicha" class="form-label">Forma de Resolución</label>
                                                <select class="form-select" id="formaResolucionFicha" disabled></select>
                                            </div>
                                            <div class="col-sm-4 mb-2">
                                                <label for="costoFicha" class="form-label">Costo</label>
                                                <input type="text" id="costoFicha" class="form-control" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Presupuesto -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header bg-danger text-white text-center"><i>Presupuesto</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-8 mb-2">
                                                <label for="presupuestadorFicha" class="form-label">Presupuestado por:</label>
                                                <select class="form-select" id="presupuestadorFicha" disabled></select>
                                            </div>
                                            <div class="col-sm-4 mb-2">
                                                <label for="fechaPresupuestoFicha" class="form-label">Fecha</label>
                                                <input type="text" id="fechaPresupuestoFicha" class="form-control" readonly>
                                            </div>
                                            <div class="col-sm-8 mb-2">
                                                <label for="numeroPresupuestoFicha" class="form-label">Número de Presupuesto</label>
                                                <input type="text" id="numeroPresupuestoFicha" class="form-control" readonly>
                                            </div>
                                            <div class="col-sm-4 mb-2">
                                                <label for="cajonPresupuestoFicha" class="form-label">Cajón</label>
                                                <input type="text" id="cajonPresupuestoFicha" class="form-control" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- End - Chat tab content -->

                    <!-- Reports tab content -->
                    <div id="nav-ficha" class="tab-pane fade py-4" role="tabpanel" aria-labelledby="nav-reports-tab">

                        <!-- Public Settings -->
                        <div class="row p-3">
                            <div class="col-sm-4">
                                <div class="list-group list-group-borderless">
                                    <div class="col-sm-12">
                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">Monofásica</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Trifásica</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Tensión</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">Presión en cañería</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Vol. tanque hidro</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Estado Instalación</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">Ruido excesivo</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Presión exceso</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Presión baja</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Caudal Bajo</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Caudal bajo</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="list-group list-group-borderless">
                                    <div class="col-sm-12">
                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">No aspira</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Válvula de retención</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Medida tanque</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">Tanque elevado</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Tanque cisterna</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Funciona intermitente</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">No arranca</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Exceso de consumo</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Motor inundado</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>
                                        
                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Press</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Flow</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="list-group list-group-borderless">
                                    <div class="col-sm-12">
                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">Presostato</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Capacitor</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Roce impulsor</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">Inducción de motor</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">No varía la velocidad</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Boluta pinchada</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbOnlineStatus">Sarro en bomba</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMuteNotifications">Pérdidas</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>

                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Diámetro cañería entrada</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>
                                        
                                        <div class="list-group-item d-flex justify-content-between mb-1">
                                            <label class="form-check-label" for="_dm-sbMyDevicesName">Diametro cañería salida</label>
                                            <div class="form-check form-switch">
                                                <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Observaciones -->
                            <div class="col-md-12 mb-3 mt-4">
                                <div class="card border-2 border-danger">
                                    <h4 class="card-header"><i>Observaciones</i></h4>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-12 mb-2">
                                                <textarea class="form-control" id="observacionesProductoFichaTecnica" cols="30" rows="6"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
        
                    </div>
                    <!-- End - Reports tab content -->

                    <!-- Settings content -->
                    <div id="nav-cerrar" class="tab-pane fade py-4" role="tabpanel" aria-labelledby="nav-settings-tab">

                    </div>
                    <!-- End - Settings content -->

                </div>
                <!-- End - Sidebar tabs content -->

            </div>
        </aside>