        <nav id="mainnav-container" class="mainnav">
            <div class="mainnav__inner">

                <!-- Navigation menu -->
                <div class="mainnav__top-content scrollable-content pb-5">

                    <!-- Profile Widget -->
                    <div class="mainnav__profile mt-3 d-flex3">

                        <div class="mt-2 d-mn-max"></div>

                        <!-- Profile picture  -->
                        <div class="mininav-toggle text-center py-2">
                            <img class="mainnav__avatar img-md rounded-circle border" src="assets/img/profile-photos/1.png" alt="Profile Picture">
                        </div>

                        <div class="mininav-content collapse d-mn-max">
                            <div class="d-grid">

                                <!-- User name and position -->
                                <button class="d-block btn shadow-none p-2" data-bs-toggle="collapse" data-bs-target="#usernav" aria-expanded="false" aria-controls="usernav">
                                    <span class="dropdown-toggle d-flex justify-content-center align-items-center">
                                        <h6 class="mb-0 me-1"><?php echo $_SESSION['nombre'].' '.$_SESSION['apellido'];?></h6>
                                    </span>
                                    <small class="text-muted">Administrador</small>
                                </button>

                                <!-- Collapsed user menu -->
                                <div id="usernav" class="nav flex-column collapse">
                                    <a href="#" class="nav-link">
                                        <i class="demo-pli-male fs-5 me-2"></i>
                                        <span class="ms-1">Perfil</span>
                                    </a>
                                    <a href="#" class="nav-link">
                                        <i class="demo-pli-gear fs-5 me-2"></i>
                                        <span class="ms-1">Settings</span>
                                    </a>
                                    <a href="#" class="nav-link">
                                        <i class="demo-pli-unlock fs-5 me-2"></i>
                                        <span class="ms-1">Logout</span>
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                    <!-- End - Profile widget -->

                    <!-- Navigation Category -->
                    <div class="mainnav__categoriy py-3">
                        <!-- <h6 class="mainnav__caption mt-0 px-3 fw-bold">Navegación</h6> -->
                        <ul class="mainnav__menu nav flex-column">

                            <!-- Link with submenu Accesos rápidos -->
                            <li class="nav-item has-sub">

                                <a href="#" class="mininav-toggle nav-link active"><i class="demo-pli-home fs-5 me-2"></i>
                                    <span class="nav-label ms-1">Accesos Rápidos</span>
                                </a>

                                <!-- Dashboard submenu list -->
                                <ul class="mininav-content nav collapse">
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/recepcion/recepcion" class="nav-link active">Recepción</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/diagnostico/diagnostico" class="nav-link active">Diagnóstico</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/reparacion/reparacion" class="nav-link active">Reparación</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/embalaje/embalaje" class="nav-link active">Embalaje</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/presupuesto/presupuesto" class="nav-link active">Presupuesto</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/resolucion/resolucion" class="nav-link active">Resolución</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/buscar/buscar" class="nav-link active">Buscador</a>
                                    </li>
                                </ul>
                                <!-- END : Dashboard submenu list -->

                            </li>
                            <!-- END : Link with submenu -->

                        </ul>
                    </div>
                    <!-- END : Navigation Category -->

                    <!-- Components Category -->
                    <div class="mainnav__categoriy py-3">
                        <h6 class="mainnav__caption mt-0 px-3 fw-bold">Reparaciones</h6>
                        <ul class="mainnav__menu nav flex-column">

                            <!-- Link with submenu Tablas -->
                            <li class="nav-item has-sub">

                                <a href="#" class="mininav-toggle nav-link collapsed"><i class="demo-pli-split-vertical-2 fs-5 me-2"></i>
                                    <span class="nav-label ms-1">Tablas</span>
                                </a>

                                <!-- Layouts submenu list -->
                                <ul class="mininav-content nav collapse">
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/clientes/clientes" class="nav-link">Clientes</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/despieces/despieces" class="nav-link">Despieces</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/estadosReparacion/estadosReparacion" class="nav-link">Estados reparación</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/estantes/estantes" class="nav-link">Estante</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/familias/familias" class="nav-link">Familias</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/feriados/feriados" class="nav-link">Feriados</a>
                                    </li> -->
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/formasRetiro/formasRetiro" class="nav-link">Formas de retiro</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/localidades/localidades" class="nav-link">Localidades</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/lugaresRecepcion/lugaresRecepcion" class="nav-link">Lugar recepción</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/marcas/marcas" class="nav-link">Marcas</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/motivosAnulacion/motivosAnulacion" class="nav-link">Motivos anulación</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/piezas/piezas" class="nav-link">Piezas</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/productos/productos" class="nav-link">Productos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/provincias/provincias" class="nav-link">Provincias</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/tablas/sucursales/sucursales" class="nav-link">Sucursales</a>
                                    </li>
                                </ul>
                                <!-- END : Layouts submenu list -->

                            </li>
                            <!-- END : Link with submenu -->

                            <!-- Link with submenu Procesos -->
                            <li class="nav-item has-sub">

                                <a href="#" class="mininav-toggle nav-link collapsed"><i class="demo-pli-repair fs-5 me-2"></i>
                                    <span class="nav-label ms-1">Procesos</span>
                                </a>

                                <!-- Layouts submenu list -->
                                <ul class="mininav-content nav collapse">
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Anular orden</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Anular resolución</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/buscar/buscar" class="nav-link">Buscador</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Cambiar de sucursal</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/diagnostico/diagnostico" class="nav-link">Diagnóstico</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/embalaje/embalaje" class="nav-link">Embalaje</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Modificar orden</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Orden facturada</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/presupuesto/presupuesto" class="nav-link">Presupuesto</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/recepcion/recepcion" class="nav-link">Recepción</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/reparacion/reparacion" class="nav-link">Reparación</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/procesos/resolucion/resolucion" class="nav-link">Resolución</a>
                                    </li>
                                </ul>
                                <!-- END : Layouts submenu list -->

                            </li>
                            <!-- END : Link with submenu -->

                            <!-- Link with submenu Informes -->
                            <li class="nav-item has-sub">

                                <a href="#" class="mininav-toggle nav-link collapsed"><i class="demo-pli-bar-chart fs-5 me-2"></i>
                                    <span class="nav-label ms-1">Informes</span>
                                </a>

                                <!-- Layouts submenu list -->
                                <ul class="mininav-content nav collapse">
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Ingresos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Diagnósticos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Embalajes</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Resoluciones</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link">Pendientes resolución</a>
                                    </li>
                                </ul>
                                <!-- END : Layouts submenu list -->

                            </li>
                            <!-- END : Link with submenu -->

                            <!-- Link with submenu Configuración -->
                            <li class="nav-item has-sub">

                                <a href="#" class="mininav-toggle nav-link collapsed"><i class="demo-pli-gear fs-5 me-2"></i>
                                    <span class="nav-label ms-1">Configuración</span>
                                </a>

                                <!-- Layouts submenu list -->
                                <ul class="mininav-content nav collapse">
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/configuracion/parametros/parametros" class="nav-link">Parámetros</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/configuracion/perfiles/perfiles" class="nav-link">Perfiles</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?page=mod_repa/configuracion/usuarios/usuarios" class="nav-link">Usuarios</a>
                                    </li>
                                </ul>
                                <!-- END : Layouts submenu list -->

                            </li>
                            <!-- END : Link with submenu -->

                        </ul>
                    </div>
                    <!-- END : Components Category -->

                </div>
                <!-- End - Navigation menu -->

                <!-- Bottom navigation menu -->
                <div class="mainnav__bottom-content border-top pb-2">
                    <ul id="mainnav" class="mainnav__menu nav flex-column">
                        <li class="nav-item">
                            <a href="logout.php" class="nav-link"><i class="demo-pli-unlock fs-5 me-2"></i>Logout</a>
                        </li>
                    </ul>
                </div>
                <!-- End - Bottom navigation menu -->

            </div>
        </nav>