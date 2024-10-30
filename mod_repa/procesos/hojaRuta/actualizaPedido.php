<div class="row" style="padding-top: 2vh; padding-bottom: 2vh;">
    <form id="formActualizaPedido">
        <div class="col-sm-12 mb-2">
            <label for="actualizaIdPedido" class="form-label">Nro.Orden</label>
            <input type="text" class="form-control" id="actualizaIdPedido" disabled>
        </div>
        <div class="col-sm-12 mb-2">
            <label for="actualizaFVisita" class="form-label" title="Fecha de posible visita">F.Visita</label>
            <input type="date" class="form-control" id="actualizaFVisita">
        </div>
        <div class="col-sm-12 mb-2">
            <label for="tecnicoFichaHojaRuta" class="form-label" title="Técnico asignado">Técnico</label>
            <select id="tecnicoFichaHojaRuta" class="form-select" disabled></select>
        </div>
        <div class="col-sm-12 mb-2">
            <label for="actualizaMotivo" class="form-label" title="Técnico asignado">Motivo</label>
            <select id="actualizaMotivo" class="form-select"></select>
        </div>
        <div class="row mb-2">
            <div class="col-sm-12 pt-3 text-center">
                <div class="form-check form-check-inline">
                    <input id="actualizaConfirmarCoordinacion" class="form-check-input" type="checkbox">
                    <label for="actualizaConfirmarCoordinacion" class="form-check-label">Confirmar coord.</label>
                </div>

                <div class="form-check form-check-inline">
                    <input id="actualizaEnviaAviso" class="form-check-input" type="checkbox">
                    <label for="actualizaEnviaAviso" class="form-check-label">Envíar aviso (S/N)</label>
                </div>
            </div>
        </div>
        <div class="ibox-content" style ="padding: 15px 20px 0px 20px;">
            <div class="row">
                <div class="table-responsive">
                    <table id="actualizaTablaNotasPedFicha" class="table table-striped table-hover" style="font-size: 11px; overflow:auto; margin-bottom: 0px;">
                        <thead>
                            <th>Fecha</th>
                            <th>Notas del pedido (Coordinación)</th>
                        </thead>
                        <tbody id="actualizaTablaNotasPed_bodyFicha">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </form>                                               
</div>