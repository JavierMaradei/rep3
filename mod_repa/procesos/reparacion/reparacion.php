<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Diagnóstico</i></h2>
            <!-- User dropdown -->
            <div class="dropdown">

                <!-- Toggler -->
                <button class="header__btn btn btn-icon btn-sm" type="button" data-bs-toggle="dropdown" aria-label="User dropdown" aria-expanded="false">
                    <i class="demo-psi-male"></i>
                </button>

                <!-- User dropdown menu -->
                <div class="dropdown-menu dropdown-menu-end w-md-450px">

                    <!-- User dropdown header -->
                    <div class="d-flex align-items-center border-bottom px-3 py-2">
                        <div class="flex-grow-1 ms-3">
                            <h5 class="mb-0">Buscador</h5>
                        </div>
                    </div>

                    <div class="row m-3">
                        <div class="col-md-12">

                            <!-- Simple widget and reports -->
                            <div class="list-group list-group-borderless mb-3">
                                <div class="row mb-2">
                                    <label for="nroDeOrden" class="col-sm-2 col-form-label">Orden</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="nroDeOrden">
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label for="rangoFecha" class="col-sm-2 col-form-label">Fechas</label>
                                    <div class="col-sm-10">
                                        <div class="input-group mb-3">
                                            <input type="date" class="form-control" value="<?php echo date('Y-m-d'); ?>">
                                            <span class="input-group-text">hasta</span>
                                            <input type="date" class="form-control" value="<?php echo date('Y-m-d'); ?>">
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label for="lugarRecepcion" class="col-sm-2 col-form-label">L.Recepción</label>
                                    <div class="col-sm-10">
                                        <select id="lugarRecepcion" class="form-select">
                                            <option value="1" selected>Villa Devoto</option>
                                            <option value="2">Pilar</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label for="tipoReparacion" class="col-sm-2 col-form-label">Tipo</label>
                                    <div class="col-sm-10">
                                        <select id="tipoReparacion" class="form-select">
                                            <option value="1" selected>Reparación</option>
                                            <option value="2">Presupuesto</option>
                                            <option value="3">Plan canje</option>
                                            <option value="3">Cambio de equipo</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label for="atencion" class="col-sm-2 col-form-label">Atención</label>
                                    <div class="col-sm-10">
                                        <select id="atencion" class="form-select">
                                            <option value="1" selected>Revisar</option>
                                            <option value="2">Reparar en el momento</option>
                                        </select>
                                    </div>
                                </div>
                                
                            </div>
                            <hr>
                            <div class="col-sm-12 text-center">
                                <button class="btn btn-success" type="button" id="btnBuscar">Buscar</button>
                                <button class="btn btn-danger" type="button" id="btnCancelar">Cancelar</button>
                            </div>

                        </div>
                        
                    </div>

                </div>
            </div>
            <!-- End - User dropdown -->

        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-12 mb-3">
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">Buscador</h5>
                <hr>
                <div class="row g-3">
                    <div class="col-md-4">
                        <label for="nroDeOrden" class="form-label">Orden</label>
                        <input type="text" class="form-control" id="nroDeOrden"> 
                    </div>
                    <div class="col-md-4">
                        <label for="lugarRecepcion" class="form-label">L.Recepción</label>
                        <select id="lugarRecepcion" class="form-select">
                            <option value="1" selected>Villa Devoto</option>
                            <option value="2">Pilar</option>
                        </select>    
                    </div>
                    <div class="col-md-4">
                        <label for="tipoReparacion" class="form-label">Tipo</label>
                        <select id="tipoReparacion" class="form-select">
                            <option value="1" selected>Reparación</option>
                            <option value="2">Presupuesto</option>
                            <option value="3">Plan canje</option>
                            <option value="3">Cambio de equipo</option>
                        </select>    
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="nroDeOrden" class="col-sm-2 col-form-label">Orden</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="nroDeOrden">
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="rangoFecha" class="col-sm-2 col-form-label">Fechas</label>
                    <div class="col-sm-10">
                        <div class="input-group mb-3">
                            <input type="date" class="form-control" value="<?php echo date('Y-m-d'); ?>">
                            <span class="input-group-text">hasta</span>
                            <input type="date" class="form-control" value="<?php echo date('Y-m-d'); ?>">
                        </div>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="lugarRecepcion" class="col-sm-2 col-form-label">L.Recepción</label>
                    <div class="col-sm-10">
                        <select id="lugarRecepcion" class="form-select">
                            <option value="1" selected>Villa Devoto</option>
                            <option value="2">Pilar</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="tipoReparacion" class="col-sm-2 col-form-label">Tipo</label>
                    <div class="col-sm-10">
                        <select id="tipoReparacion" class="form-select">
                            <option value="1" selected>Reparación</option>
                            <option value="2">Presupuesto</option>
                            <option value="3">Plan canje</option>
                            <option value="3">Cambio de equipo</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-2">
                    <label for="atencion" class="col-sm-2 col-form-label">Atención</label>
                    <div class="col-sm-10">
                        <select id="atencion" class="form-select">
                            <option value="1" selected>Revisar</option>
                            <option value="2">Reparar en el momento</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="col-sm-12 text-center">
                    <button class="btn btn-lg btn-success" type="button" id="btnBuscar">Buscar</button>
                    <button class="btn btn-lg btn-danger" type="button" id="btnCancelar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    
</div>