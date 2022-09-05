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
                    <label for="filtroFechas" class="form-label">Fecha</label>
                    <div class="input-group mb-3">
                        <input type="date" id="filtroDesde" class="form-control">
                        <span class="input-group-text">hasta</span>
                        <input type="date" id="filtroHasta" class="form-control">
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


