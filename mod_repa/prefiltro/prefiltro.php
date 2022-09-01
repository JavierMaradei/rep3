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
            <form id="formPrefiltro">
                <div class="col-sm-12 mb-2">
                    <label for="filtroOrden" class="form-label">Orden</label>
                    <input type="text" class="form-control" id="filtroOrden"> 
                </div>
                <div class="col-sm-12 mb-2">
                    <label for="filtroTipo" class="form-label">Tipo Ingreso</label>
                    <select class="form-select" id="filtroTipo"><?php echo tiposReparacion(); ?></select>
                </div>
                <div class="col-sm-12 mb-2">
                    <label for="filtroAtencion" class="form-label">Atención</label>
                    <select class="form-select" id="filtroAtencion"><?php echo tiposAtencion(); ?></select>
                </div>
                <div class="col-sm-12 mb-2">
                    <label for="filtroLugarRecepcion" class="form-label">Lugar de Recepción</label>
                    <select class="form-select" id="filtroLugarRecepcion"></select>
                </div>                    
                <div class="col-sm-12 mb-2">
                    <label for="filtroFechas" class="form-label">Fecha</label>
                    <div class="input-group mb-3">
                        <input type="date" id="filtroDesde" class="form-control" value="<?php echo date('Y-m-d'); ?>">
                        <span class="input-group-text">hasta</span>
                        <input type="date" id="filtroHasta" class="form-control" value="<?php echo date('Y-m-d'); ?>">
                    </div>
                </div>
            </form>
        </div>
        <hr>
        <div class="col-sm-12 text-center">
            <button class="btn btn-success" type="button" id="btnBuscarPrefiltro">Buscar</button>
            <button class="btn btn-danger" type="button" id="btnCancelarPrefiltro">Cancelar</button>
        </div>

    </div>
    
</div>


