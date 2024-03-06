        <aside class="sidebar">
            <div class="sidebar__inner scrollable-content">
                <!-- This element is only visible when sidebar Stick mode is active. -->
                <div class="sidebar__stuck align-item-center mb-3 px-4">
                    <p class="m-0 text-danger"></p>
                    <button type="button" class="sidebar-toggler btn-close btn-lg rounded-circle ms-auto" aria-label="Close"></button>
                </div>

                <!-- Sidebar tabs nav -->
                <div class="sidebar__wrap">
                    <nav class="px-3">
                        <div class="nav nav-callout nav-fill flex-nowrap" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="solapaDatosFicha" data-bs-toggle="tab" data-bs-target="#nav-datos" type="button" role="tab" aria-controls="nav-chat" aria-selected="true">
                                <i class="d-block demo-pli-information fs-3 mb-2"></i>
                                <span>Datos</span>
                            </button>

                            <button class="nav-link"  id="solapaFichaTecnica" data-bs-toggle="tab" data-bs-target="#nav-ficha" type="button" role="tab" aria-controls="nav-reports" aria-selected="false">
                                <i class="d-block demo-pli-wrench fs-3 mb-2"></i>
                                <span>Despiece</span>
                            </button>

                            <button id="cerrarSidebar" class="nav-link" data-bs-toggle="tab" data-bs-target="#nav-cerrar" type="button" role="tab" aria-controls="nav-settings" aria-selected="false">
                                <i class="d-block demo-pli-close fs-3 mb-2"></i>
                                <span>Cerrar</span>
                            </button>
                        </div>
                    </nav>
                </div>
                <!-- End - Sidebar tabs nav -->

                <!-- Sideabar tabs content -->
                <div class="tab-content sidebar__wrap" id="nav-tabContent">
                    <!-- DATOS tab Content -->
                    <div id="nav-datos" class="tab-pane fade py-4 show active" role="tabpanel" aria-labelledby="nav-chat-tab">
                        <?php include 'mod_repa/fichas/fichaSolapa1.php';?>
                    </div>
                    <!-- End - DATOS tab content -->

                    <!-- FICHA TECNICA tab content -->
                    <div id="nav-ficha" class="tab-pane fade py-4" role="tabpanel" aria-labelledby="nav-reports-tab">
                        <!-- Include a ficha según service técnico o taller -->
                        <?php include 'mod_repa/fichas/fichaSolapa2.php';?>
                    </div>
                    <!-- End - FICHA TECNICA tab content -->

                    <!-- CERRAR tab content -->
                    <div id="nav-cerrar" class="tab-pane fade py-4" role="tabpanel" aria-labelledby="nav-settings-tab">

                    </div>
                    <!-- End - CERRAR tab content -->

                    <!-- Action buttons -->
                    <div class="card-footer">
                        <div class="col-sm-12 text-center">
                            <button class="btn btn-lg btn-danger" type="button" id="btnSalirFicha" hidden>Salir</button>
                            <button class="btn btn-lg btn-danger" type="button" id="btnCancelarFicha">Cancelar</button>
                            <button class="btn btn-lg btn-success" type="button" id="btnEnviarFicha">Enviar</button>
                        </div>
                    </div>
                    <!-- End - Action buttons -->

                </div>
                <!-- End - Sidebar tabs content -->

            </div>
        </aside>