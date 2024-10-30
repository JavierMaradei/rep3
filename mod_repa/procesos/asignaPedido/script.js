(() => {
    //let formulario                          = document.querySelector('#formFichaPedido')//Captura del formulario
    //let inputs                              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                            = new FormData() //Creo el formData para transferencia de información con el Backend
    let divTecnicos                         = document.querySelector('#divTecnicos')
    let templateTecnicos                    = ''
    let totalPedidosAbiertos                = document.querySelector('#totalPedidosAbiertos')
    let totalPedidosPendientes              = document.querySelector('#totalPedidosPendientes')
    let totalPedidosCoordinados             = document.querySelector('#totalPedidosCoordinados')
    let totalPedidosConcluidos              = document.querySelector('#totalPedidosConcluidos')
    let pedidosFilter                       = document.querySelector('#pedidosFilter') 
    let pendientesFilter                    = document.querySelector('#pendientesFilter') 
    let coordinadosFilter                   = document.querySelector('#coordinadosFilter') 
    let concluidosFilter                    = document.querySelector('#concluidosFilter') 
    let filtroEstados                       = 'T'
    let idPedido                            = ''
    let tecnicoId                           = ''
    let btnCerrarModal                      = document.querySelector('#btnCerrarModal')
    let btnCloseModal                       = document.querySelector('#btnCloseModal')
    let btnGrabarModalHojaRuta              = document.querySelector('#btnGrabarModalHojaRuta')
    let btnCerrarModalHojaRuta              = document.querySelector('#btnCerrarModalHojaRuta')
    let btnCloseModalHojaRuta               = document.querySelector('#btnCloseModalHojaRuta')
    let tecnicoFichaHojaRuta                = document.querySelector('#tecnicoFichaHojaRuta')
    let titleTable                          = document.querySelector('#titleTable')
    let titleTableTecnico                   = document.querySelector('#titleTableTecnico')
    let formActualizaPedido                 = document.querySelector('#formActualizaPedido')
    let inputsActualizaPedido               = formActualizaPedido.querySelectorAll('input,textarea,select')
    let pedidoSeleccionado                  = ''
    let actualizaFVisita                    = document.querySelector('#actualizaFVisita')
    let actualizaMotivo                     = document.querySelector('#actualizaMotivo')
    let actualizaTablaNotasPed_bodyFicha    = document.querySelector('#actualizaTablaNotasPed_bodyFicha')
    let actualizaConfirmarCoordinacion      = document.querySelector('#actualizaConfirmarCoordinacion')
    let prefiltroFechaDesde                 = document.querySelector('#prefiltroFechaDesde')
    let prefiltroFechaHasta                 = document.querySelector('#prefiltroFechaHasta')
    let btnPrefiltroFechas                  = document.querySelector('#btnPrefiltroFechas')
    let btnLimpiarFechas                    = document.querySelector('#btnLimpiarFechas')
    
    
    let arrayVal = {
        id_pedido                   : {},
        apellidoFicha               : {},
        nombreFicha                 : {},
        categoriaFicha              : {},
        id_provinciaFicha           : {},
        id_localidadFicha           : {},
        id_zonaFicha                : {},
        id_countryFicha             : {},
        calleFicha                  : {},
        numeroFicha                 : {},
        pisoFicha                   : {},
        dptoFicha                   : {},
        loteFicha                   : {},
        manzanaFicha                : {},
        entreCallesFicha            : {},
        direccionGeolocalizadaFicha : {},
        latitudFicha                : {},
        longitudFicha               : {},
        telFicha                    : {},
        tel2Ficha                   : {},
        celFicha                    : {},
        cel2Ficha                   : {},
        correoFicha                 : {},
        observacionesClienteFicha   : {},
        productoFicha               : {},
        problemaFicha               : {},
        fVisitaFicha                : {},
        observacionesPedidoFicha    : {},
        tecnicoFijadoFicha          : {},
        prioritarioFicha            : {}
    }

    let arrayValHojaRuta                = {
        actualizaIdPedido               : {required: true},
        actualizaFVisita                : {required: true},
        tecnicoFichaHojaRuta            : {required: true},
        actualizaMotivo                 : {required: false},
        actualizaConfirmarCoordinacion  : {required: false},
        actualizaEnviaAviso             : {required: false}
    }

    let tabla = $('#tabla_pedidos').DataTable({
        "order": [[4,'asc']],
        dom: '<"html5buttons"B>lTfgtip',
        columnDefs  : [
            {
                "targets"   : 0,
                "render"    : function ( data, type, row, meta ) {
                    return '<a class="reparacion-item" href="'+data+'">'+data+'</a>'}
            },
            {
                "targets"   : [3],
                "render"    : $.fn.dataTable.render.moment('YYYY-MM-DD', 'DD/MM/YYYY')
            },
            {
                "targets"   : [4],
                "render"    : $.fn.dataTable.render.moment('YYYY-MM-DD', 'DD/MM/YYYY')
            }
        ],
        buttons: [
            //{extend: 'copy'},
            //{extend: 'csv'},
            //{extend: 'excel', title: 'Asignación de pedidos'}
            //{extend: 'pdf', title: 'Informe de control de estanterías', orientation: 'landscape'},  
            //{extend: 'print',}
        ],
        language: {
            "decimal"       : "",
            "emptyTable"    : "No hay información",
            "info"          : "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty"     : "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered"  : "(Filtrado de _MAX_ total entradas)",
            "infoPostFix"   : "",
            "thousands"     : ",",
            "lengthMenu"    : "Mostrar _MENU_ Entradas",
            "loadingRecords": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Cargando...</span> ',
            "processing"    : '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Procesando...</span>',
            "search"        : "Buscar:",
            "zeroRecords"   : "Sin resultados encontrados",
            "paginate"      : {
                "first"     : "Primero",
                "last"      : "Ultimo",
                "next"      : "Siguiente", 
                "previous"  : "Anterior"
            }
        }
    })

    titleTable.innerText = 'Total de pedidos abiertos'
    //servMotivos(actualizaMotivo, 'S')
    $('#divTecnicoFichaHojaRuta').show()

    function recargaData(filtro, tecnico, fd = '', fh = ''){
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/procesos/asignaPedido/asignaPedido_search.php?filtro='+filtro+'&tecnico='+tecnico+'&fd='+fd+'&fh='+fh)//Envío la información del filtro
        xhr.send()

        xhr.addEventListener('load', () => { //Cuando me vuelven los datos de la query armo la tabla
            if(xhr.status == 200){
                let respuesta       = JSON.parse(xhr.response)
                let data            = respuesta.agrupadosPorTecnico
                let estadoPedido    = ''
                let clase           = ''
                //properties          = []
                tabla.clear().draw()
                
                totalPedidosAbiertos.innerText      = respuesta.total
                totalPedidosPendientes.innerText    = respuesta.pendientes
                totalPedidosCoordinados.innerText   = respuesta.coordinados
                totalPedidosConcluidos.innerText    = respuesta.concluidos

                templateTecnicos = `
                    <ul class="list-group" style="overflow-y: auto; max-height: 490px">
                `
                respuesta.tecnicos.forEach(element => {
                    let porcentaje = 0
                    if(parseInt(element.coordinados) == 0){
                        porcentaje = 100
                    } else {
                        porcentaje = (parseInt(element.concluidos) * 100) / (parseInt(element.coordinados) + parseInt(element.concluidos))
                    }

                    let totalPedidosTecnicos    = 0
                    totalPedidosTecnicos        = parseInt(element.pendientes) + parseInt(element.coordinados) + parseInt(element.concluidos)

                    let totalPedidosCoordinados = 0
                    totalPedidosCoordinados     = parseInt(element.coordinados) + parseInt(element.concluidos)

                    templateTecnicos += `
                        <li class="list-group-item" title="Pedidos concluidos ${element.concluidos} de ${totalPedidosCoordinados} coordinados">
                            <a href="#" value="${element.usuario_id}" class="tecnico-list">${element.nombre} ${element.apellido}</a>
                            <div class="text-right mb-1">
                                <a href='' class="tecnicosPedAbiertos"><span class="badge bg-warning" title="Pedidos abiertos">${totalPedidosTecnicos}</span></a>
                                <a href='' class="tecnicosPedPendientes"><span class="badge bg-danger" title="Pedidos pendientes">${element.pendientes}</span></a>
                                <a href='' class="tecnicosPedCoordinados"><span class="badge bg-success" title="Pedidos coordinados">${element.coordinados}</span></a>
                                <a href='' class="tecnicosPedConcluidos"><span class="badge bg-primary" title="Pedidos concluidos">${element.concluidos}</span></a>
                            </div>
                            <div class="progress">
                                <div style="width: ${porcentaje}%;" class="progress-bar progress-bar-striped bg-secondary"></div>
                            </div>
                        </li>
                        
                    `
                });

                templateTecnicos += `
                    </ul>
                `
                
                divTecnicos.innerHTML = templateTecnicos

                respuesta.pedidos.forEach(element => {

                    let hojaDeRuta    = `<button type="button" class="btn btn-light btn-xs coordinarPedido" value="${element.reparacion_id}">Actualizar</button>`
                    //clase = element.coordinado == 'S' ? 'badge badge-info' : 'badge badge-danger'
                    if(element.coordinado == 'S' && element.visita_concluida == 'N'){
                        clase = 'badge bg-info'
                    } else if(element.visita_concluida == 'S'){
                        clase = 'badge bg-secondary'
                        element.coordinadoDesc = 'Concluido'
                        hojaDeRuta = ''
                    } else {
                        clase = 'badge bg-danger'
                    }
                    estadoPedido    = `<span class="${clase}">${element.coordinadoDesc}</span>`

                    tabla.row.add([
                        element.reparacion_id,
                        hojaDeRuta,
                        estadoPedido,
                        element.fechaRecepcion,
                        element.fechaReparacion,
                        element.tecnico,
                        element.cliente,
                        element.calle,
                        element.nro_calle,
                        element.localidad,
                        element.provincia,
                        element.producto,
                        element.problema
                    ])
                    tabla.draw()
                });

                //initMap()
            }
        })
    }

    recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)

    //Total de pedidos
    pedidosFilter.addEventListener('click', e => {
        e.preventDefault()
        tabla.search('').draw()
        filtroEstados   = 'T'
        tecnicoId       = ''
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos abiertos'
        titleTableTecnico.innerText = ''
    })

    //Pendientes
    pendientesFilter.addEventListener('click', e => {
        e.preventDefault()
        tabla.search('').draw()
        filtroEstados   = 'P'
        tecnicoId       = ''
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos pendientes'
        titleTableTecnico.innerText = ''

    })

    //Coordinados
    coordinadosFilter.addEventListener('click', e => {
        e.preventDefault()
        tabla.search('').draw()
        filtroEstados   = 'C'
        tecnicoId       = ''
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos coordinados'
        titleTableTecnico.innerText = ''
    })

    //Concluidos
    concluidosFilter.addEventListener('click', e => {
        e.preventDefault()
        tabla.search('').draw()
        filtroEstados   = 'F'
        tecnicoId       = ''
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos concluidos'
        titleTableTecnico.innerText = ''
    })

    //Técnicos
    $(document).on('click', '.tecnico-list', (e) => {
        e.preventDefault()
        tabla.search('').draw()
        tecnicoId = e.target.getAttribute('value')
        filtroEstados = 'T'
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos abiertos'
        titleTableTecnico.innerText = 'Técnico: '+e.target.innerText
    })

    $(document).on('click', '.tecnicosPedAbiertos', (e) => {
        e.preventDefault()
        tabla.search('').draw()
        tecnicoId = e.target.parentNode.parentNode.parentNode.children[0].getAttribute('value')
        filtroEstados = 'T'
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos abiertos'
        titleTableTecnico.innerText = 'Técnico: '+e.target.parentNode.parentNode.parentNode.children[0].innerText
    })

    $(document).on('click', '.tecnicosPedPendientes', (e) => {
        e.preventDefault()
        tabla.search('').draw()
        tecnicoId = e.target.parentNode.parentNode.parentNode.children[0].getAttribute('value')
        filtroEstados = 'P'
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos pendientes'
        titleTableTecnico.innerText = 'Técnico: '+e.target.parentNode.parentNode.parentNode.children[0].innerText
    })

    $(document).on('click', '.tecnicosPedCoordinados', (e) => {
        e.preventDefault()
        tabla.search('').draw()
        tecnicoId = e.target.parentNode.parentNode.parentNode.children[0].getAttribute('value')
        filtroEstados = 'C'
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos coordinados'
        titleTableTecnico.innerText = 'Técnico: '+e.target.parentNode.parentNode.parentNode.children[0].innerText
    })

    $(document).on('click', '.tecnicosPedConcluidos', (e) => {
        e.preventDefault()
        tabla.search('').draw()
        tecnicoId = e.target.parentNode.parentNode.parentNode.children[0].getAttribute('value')
        filtroEstados = 'F'
        recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos concluidos'
        titleTableTecnico.innerText = 'Técnico: '+e.target.parentNode.parentNode.parentNode.children[0].innerText
    })

    setTimeout(() => {
        dataGeneral()
    }, 500);



    btnCerrarModalHojaRuta.addEventListener('click', e => {
        e.preventDefault()
        $('#modalHojaRuta').hide()
    })

    btnCloseModalHojaRuta.addEventListener('click', e => {
        e.preventDefault()
        $('#modalHojaRuta').hide()
    })

    $(document).on('click', '.coordinarPedido', (e) => {
        e.preventDefault()
        $('#modalHojaRuta').show()
        cleanInputs(inputsActualizaPedido)
        actualizaTablaNotasPed_bodyFicha.innerHTML  = ''
        pedidoSeleccionado = e.target.getAttribute('value')

        cargaDataDomicilio(pedidoSeleccionado).then((r) =>{
            $('#actualizaIdPedido').val(r.data.reparacion_id);
            $('#actualizaFVisita').val(r.data.fecha);
            cargaTecnicos(tecnicoFichaHojaRuta).then(() =>{
                $('#tecnicoFichaHojaRuta').val(r.data.tecnico_id);
                r.data.coordinado == 'S' ? $('#actualizaConfirmarCoordinacion').prop('checked', true) : $('#actualizaConfirmarCoordinacion').prop('checked', false);
                if(r.data.coordinado == 'S'){
                    actualizaMotivo.disabled        = true
                    actualizaFVisita.disabled       = false
                    tecnicoFichaHojaRuta.disabled   = true
                } else {
                    actualizaMotivo.disabled        = false
                    actualizaFVisita.disabled       = true
                    tecnicoFichaHojaRuta.disabled   = false
                }
    
                //**************Inicio Notas del pedido**********
                let templateNotas = ''
                if(r.data.obsSeg.length != 0){
                    r.data.obsSeg.forEach(element => {
                        templateNotas = `
                                        <tr>
                                            <td>${element.fecha}</td>
                                            <td>${element.descripcion}</td>
                                        </tr>
                                    `          
                        actualizaTablaNotasPed_bodyFicha.insertRow(-1).innerHTML = templateNotas
                    }); 
                } else {
                    templateNotas = `
                                <tr class="text-center">
                                    <td colspan="2"><i>Sin registros.</i></td>
                                </tr>
                            `
                    actualizaTablaNotasPed_bodyFicha.innerHTML = templateNotas
                }
                //**************Fin Notas del pedido*************
            })
        }) 
    })

    actualizaConfirmarCoordinacion.addEventListener('change', e => {
        e.preventDefault()
        if(e.target.checked){
            actualizaMotivo.value           = ''
            actualizaMotivo.disabled        = true
            actualizaFVisita.disabled       = false
        } else {
            actualizaMotivo.disabled        = false
            actualizaFVisita.disabled       = true
        }
    })

    btnGrabarModalHojaRuta.addEventListener('click', e => {
        e.preventDefault()
        let validacion = validateData(inputsActualizaPedido, arrayValHojaRuta)
        if(validacion){
            collectData(inputsActualizaPedido, formData)
            formData.append('pedidoNro', pedidoSeleccionado)
            btnGrabarModalHojaRuta.disabled = true

            let xhr = new XMLHttpRequest
            xhr.open('POST', 'mod_serv/procesos/hojaDeRuta/actualizaPedido_edit.php')
            xhr.send(formData)
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)

                    btnGrabarModalHojaRuta.disabled = false
                    cleanFormData(inputsActualizaPedido, formData)
                    formData.delete('pedidoNro')

                    switch (respuesta.estado) {
                        case 'ok':
                            recargaData(filtroEstados, tecnicoId, prefiltroFechaDesde.value, prefiltroFechaHasta.value)
                            msgTransaccionExitosa()
                            cleanInputs(inputsActualizaPedido)
                            $('#modalHojaRuta').hide()
                            break;
                        case 'errFechaVisita':
                            swal({
                                title: "Error fecha de visita",
                                text: "La fecha de visita no puede ser anterior a la del día",
                                type: "warning",
                            });
                            break;
                        case 'user undefined':
                            msgUserUndefined()
                            break;          
                        case 'sesión expirada':
                            sesionExpiradaMensajeFlotante()
                            break;
                        case 'error perfil':
                            msgErrorPerfil()
                            break;
                        default:
                            msgAlgoNoFueBien()
                            break;
                    }
                }
            })
        }
    })

    btnPrefiltroFechas.addEventListener('click', e => {
        e.preventDefault()
        recargaData(filtroEstados, '', prefiltroFechaDesde.value, prefiltroFechaHasta.value)
    })

    btnLimpiarFechas.addEventListener('click', e => {
        e.preventDefault()
        tabla.search('').draw()
        prefiltroFechaDesde.value = ''
        prefiltroFechaHasta.value = ''
        filtroEstados = 'T'
        recargaData(filtroEstados, '', prefiltroFechaDesde.value, prefiltroFechaHasta.value)
        titleTable.innerText        = 'Total de pedidos abiertos'
        titleTableTecnico.innerText = ''
    })

})()