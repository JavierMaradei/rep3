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
                                    <h4 class="card-header text-center"><i>Datos generales de Ingreso</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="ordenFicha" class="form-label">Orden</label>
                                            <input type="text" class="form-control" id="ordenFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="lugarRecepcionFicha" class="form-label">Lugar de Recepción</label>
                                            <select id="lugarRecepcionFicha" class="form-select"></select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="sucursalRecepcionFicha" class="form-label">Sucursal</label>
                                            <select id="sucursalRecepcionFicha" class="form-select"></select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="tecnicoFicha" class="form-label">Técnico</label>
                                            <select id="tecnicoFicha" class="form-select"></select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="emisorFicha" class="form-label">Emisor</label>
                                            <select id="emisorFicha" class="form-select"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Card fechas -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Fechas generales</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="fechaRecepcionFicha" class="form-label">Fecha de Recepción</label>
                                            <input type="text" class="form-control" id="fechaRecepcionFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="fechaDiagnosticoFicha" class="form-label">Fecha de Diagnóstico</label>
                                            <input type="text" class="form-control" id="fechaDiagnosticoFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="fechaReparacionFicha" class="form-label">Fecha de Reparación</label>
                                            <input type="text" class="form-control" id="fechaReparacionFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="fechaEmbalajeFicha" class="form-label">Fecha de Embalaje</label>
                                            <input type="text" class="form-control" id="fechaEmbalajeFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="fechaCierreFicha" class="form-label">Fecha de Cierre</label>
                                            <input type="text" class="form-control" id="fechaCierreFicha"> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Card datos del cliente -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Datos Cliente</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="clienteIdFicha" class="form-label">ID Cliente</label>
                                            <input type="text" class="form-control" id="clienteIdFicha" readonly> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="clienteApellidoFicha" class="form-label">Apellido</label>
                                            <input type="text" class="form-control" id="clienteApellidoFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="clienteNombreFicha" class="form-label">Nombre</label>
                                            <input type="text" class="form-control" id="clienteNombreFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="clienteDireccionFicha" class="form-label">Dirección</label>
                                            <input type="text" class="form-control" id="clienteDireccionFicha"> 
                                        </div>
                                        <div class="col-sm-12 pt-4 text-center">
                                            <button class="btn btn-outline-secondary" type="button" id="btnDatosClienteFIcha">+ Datos</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Card Datos Reparación -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Datos de Recepción</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="tipoReparacionFicha" class="form-label">Tipo de Reparación</label>
                                            <select id="tipoReparacionFicha" class="form-select"><?php echo tiposReparacion(); ?></select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="atencionFicha" class="form-label">Atención</label>
                                            <select id="atencionFicha" class="form-select"><?php echo tiposAtencion(); ?></select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="garantiaFicha" class="form-label">Reclama garantía</label>
                                            <input type="text" class="form-control" id="garantiaFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="fleteFicha" class="form-label">Flete</label>
                                            <input type="text" class="form-control" id="fleteFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="remitoClienteFicha" class="form-label">Remito</label>
                                            <input type="text" class="form-control" id="remitoClienteFicha"> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card datos del producto -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Datos del Producto</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="marcaProductoFicha" class="form-label">Marca</label>
                                            <input type="text" class="form-control" id="marcaProductoFicha" disabled> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="familiaProductoFicha" class="form-label">Familia</label>
                                            <input type="text" class="form-control" id="familiaProductoFicha" disabled> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="productoFicha" class="form-label">Producto</label>
                                            <input type="text" class="form-control" id="productoFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="serieProductoFicha" class="form-label">Serie</label>
                                            <input type="text" id="serieProductoFicha" class="form-control">
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="problemaProductoFicha" class="form-label">Problema</label>
                                            <input type="text" class="form-control" id="problemaProductoFicha"> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="observacionesProductoFicha" class="form-label">Observaciones</label>
                                            <textarea class="form-control" id="observacionesProductoFicha" cols="30" rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Estados -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Estado</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="estadoFicha" class="form-label">Estado</label>
                                            <input type="text" class="form-control" id="estadoFicha" disabled> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="estanteFicha" class="form-label">Estante</label>
                                            <input type="text" class="form-control" id="estanteFicha" disabled> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="detalleEmbalajeFicha" class="form-label">Detalle del embalaje</label>
                                            <textarea class="form-control" id="detalleEmbalajeFicha" cols="30" rows="3"></textarea>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="diagnosticadorFicha" class="form-label">Diagnosticador</label>
                                            <select class="form-select" id="diagnosticadorFicha"> </select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="reparadorFicha" class="form-label">Reparador</label>
                                            <select class="form-select" id="reparadorFicha"> </select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="embaladorFicha" class="form-label">Embalador</label>
                                            <select class="form-select" id="embaladorFicha"> </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Producto destino Canje -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Producto destino Canje</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="codigoProductoCanje" class="form-label">Código</label>
                                            <input type="text" class="form-control" id="codigoProductoCanje" disabled> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="descripcionProductoCanje" class="form-label">Descripción</label>
                                            <input type="text" id="descripcionProductoCanje" class="form-control" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Remito -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Remito</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="remitoResolucionFicha" class="form-label">Remito de Despacho</label>
                                            <input type="text" class="form-control" id="remitoResolucionFicha" disabled> 
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="remitoFechaResolucionFicha" class="form-label">Fecha</label>
                                            <input type="text" id="remitoFechaResolucionFicha" class="form-control" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Resolución / cargo -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Resolución / Cargo</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="formaResolucionFicha" class="form-label">Forma de Resolución</label>
                                            <select class="form-select" id="formaResolucionFicha"></select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="costoFicha" class="form-label">Costo</label>
                                            <input type="text" id="costoFicha" class="form-control" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Presupuesto -->
                            <div class="col-md-6 mb-3">
                                <div class="card h-100 shadow">
                                    <h4 class="card-header text-center"><i>Presupuesto</i></h4>
                                    <div class="card-body">
                                        <div class="col-sm-12 mb-2">
                                            <label for="presupuestadorFicha" class="form-label">Presupuestado por:</label>
                                            <select class="form-select" id="presupuestadorFicha"></select>
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="fechaPresupuestoFicha" class="form-label">Fecha</label>
                                            <input type="text" id="fechaPresupuestoFicha" class="form-control">
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="cajonPresupuestoFicha" class="form-label">Cajón</label>
                                            <input type="text" id="cajonPresupuestoFicha" class="form-control">
                                        </div>
                                        <div class="col-sm-12 mb-2">
                                            <label for="numeroPresupuestoFicha" class="form-label">Número de Presupuesto</label>
                                            <input type="text" id="numeroPresupuestoFicha" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- End - Chat tab content -->

                    <!-- Reports tab content -->
                    <div id="nav-ficha" class="tab-pane fade py-4" role="tabpanel" aria-labelledby="nav-reports-tab">

                        <!-- Billing and Resports -->
                        <div class="px-3">
                            <h5 class="mb-3">Billing &amp Reports</h5>
                            <p>Get <span class="badge bg-danger">$15.00 off</span> your next bill by making sure your full payment reaches us before August 5th.</p>

                            <h5 class="mt-5 mb-0">Amount Due On</h5>
                            <p>August 17, 2028</p>
                            <p class="h1">$83.09</p>

                            <div class="d-grid">
                                <button class="btn btn-success" type="button">Pay now</button>
                            </div>
                        </div>
                        <!-- End - Billing and Resports -->

                        <!-- Additional actions nav -->
                        <h5 class="mt-5 px-3">Additional Actions</h5>
                        <div class="list-group list-group-borderless">
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="demo-pli-information me-2 fs-5"></i>
                                Services Information
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="demo-pli-mine me-2 fs-5"></i>
                                Usage
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="demo-pli-credit-card-2 me-2 fs-5"></i>
                                Payment Options
                            </a>
                            <a href="#" class="list-group-item list-group-item-action">
                                <i class="demo-pli-support me-2 fs-5"></i>
                                Messages Center
                            </a>
                        </div>
                        <!-- End - Additional actions nav -->

                        <!-- Contact widget -->
                        <div class="px-3 mt-5 text-center">
                            <div class="mb-3">
                                <i class="demo-pli-old-telephone display-4 text-primary"></i>
                            </div>
                            <p>Have a question ?</p>
                            <p class="h5 mb-0"> (415) 234-53454 </p>
                            <small><em>We are here 24/7</em></small>
                        </div>
                        <!-- End - Contact widget -->

                    </div>
                    <!-- End - Reports tab content -->

                    <!-- Settings content -->
                    <div id="nav-cerrar" class="tab-pane fade py-4" role="tabpanel" aria-labelledby="nav-settings-tab">

                        <!-- Account settings -->
                        <h5 class="px-3">Account Settings</h5>
                        <div class="list-group list-group-borderless">

                            <div class="list-group-item mb-1">
                                <div class="d-flex justify-content-between mb-1">
                                    <label class="form-check-label" for="_dm-sbPersonalStatus">Show my personal status</label>
                                    <div class="form-check form-switch">
                                        <input id="_dm-sbPersonalStatus" class="form-check-input" type="checkbox" checked>
                                    </div>
                                </div>
                                <small class="text-muted">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</small>
                            </div>

                            <div class="list-group-item mb-1">
                                <div class="d-flex justify-content-between mb-1">
                                    <label class="form-check-label" for="_dm-sbOfflineContact">Show offline contact</label>
                                    <div class="form-check form-switch">
                                        <input id="_dm-sbOfflineContact" class="form-check-input" type="checkbox">
                                    </div>
                                </div>
                                <small class="text-muted">Aenean commodo ligula eget dolor. Aenean massa.</small>
                            </div>

                            <div class="list-group-item mb-1">
                                <div class="d-flex justify-content-between mb-1">
                                    <label class="form-check-label" for="_dm-sbInvisibleMode">Invisible Mode</label>
                                    <div class="form-check form-switch">
                                        <input id="_dm-sbInvisibleMode" class="form-check-input" type="checkbox">
                                    </div>
                                </div>
                                <small class="text-muted">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</small>
                            </div>

                        </div>
                        <!-- End - Account settings -->

                        <!-- Public Settings -->
                        <h5 class="mt-5 px-3">Public Settings</h5>
                        <div class="list-group list-group-borderless">

                            <div class="list-group-item d-flex justify-content-between mb-1">
                                <label class="form-check-label" for="_dm-sbOnlineStatus">Online Status</label>
                                <div class="form-check form-switch">
                                    <input id="_dm-sbOnlineStatus" class="form-check-input" type="checkbox" checked>
                                </div>
                            </div>

                            <div class="list-group-item d-flex justify-content-between mb-1">
                                <label class="form-check-label" for="_dm-sbMuteNotifications">Mute Notifications</label>
                                <div class="form-check form-switch">
                                    <input id="_dm-sbMuteNotifications" class="form-check-input" type="checkbox" checked>
                                </div>
                            </div>

                            <div class="list-group-item d-flex justify-content-between mb-1">
                                <label class="form-check-label" for="_dm-sbMyDevicesName">Show my device name</label>
                                <div class="form-check form-switch">
                                    <input id="_dm-sbMyDevicesName" class="form-check-input" type="checkbox" checked>
                                </div>
                            </div>

                        </div>
                        <!-- End - Public Settings -->

                    </div>
                    <!-- End - Settings content -->

                </div>
                <!-- End - Sidebar tabs content -->

            </div>
        </aside>