(() =>{
    let formData                = new FormData()
    let sideBar                 = document.querySelector('#root')
    let chkTodasLasSucursales   = document.querySelector('#chkTodasLasSucursales')
    let filtro                  = [chkTodasLasSucursales]
    let modal                   = document.querySelector('#modal')
    let modalBody               = document.querySelector('#body')
    let modalTitulo             = document.querySelector('#titulo')
    let btnCloseModal           = document.querySelector('#btnCloseModal')
    let btnCerrarModal          = document.querySelector('#btnCerrarModal')
    let producto                = ''
    let id                      = ''

    //Declaración del complemento DataTable
    let tabla = $('#tabla_presupuesto').DataTable( {
        "ajax": {
            url: 'mod_repa/procesos/presupuesto/presupuesto_search.php',
            type: 'GET',
            dataSrc: "",
            //Envío de parámetros Ajax datatable.
            data: function(d){
                d.orden                     = filtroOrden.value;
                d.fdesde                    = filtroDesde.value;
                d.fhasta                    = filtroHasta.value;
                d.ordenesTotalesSucursales  = chkTodasLasSucursales.checked;
            }
        },
        "order": [[1,'asc'], [0,'asc']],
        "columns": [  
            {"data" : "reparacion_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="presupuesto-item" href="'+data+'">' + data + '</a>';
                }, 
            },
            {"data" : "frecepcion"},
            {"data" : "fretiro"},
            {"data" : "producto_codigo"},
            {"data" : "producto_descripcion"},
            {"data" : "nro_serie"},   
            {"data" : "cliente_completo"},   
            {"data" : "lugar_recepcion_descripcion"},
            {"data" : "atencion"}, 
            {"data" : "RepPres"},  
            {"data" : "sucursal_descripcion"}  
        ],
        columnDefs: [ {
            targets: [1,2],
            render: $.fn.dataTable.render.moment('YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY')
        } ],
        processing: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Lista de presupuestos'},
            {extend: 'pdf', title: 'Lista de presupuestos'},
            {extend: 'print',}
        ],
        "bLengthChange": false,
        "iDisplayLength": 10,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Cargando...</span> ',
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Procesando...</span>',
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
    })

    filtro.forEach(element => {
        element.addEventListener('change', e => {
            e.preventDefault()
            tabla.ajax.reload()
        })
    });

    function limpieza(){
        id                                          = ''
        producto                                    = ''
        tipoFichaPresupuesto.value                  = ''
        atencionFichaPresupuesto.value              = ''
        numeroFichaPresupuesto.value                = ''
        cargoFichaPresupuesto.value                 = ''
        costoFichaPresupuesto.value                 = ''
        observacionesFichaPresupuesto.value         = ''
        codigoProductoCanjePresupuesto.value        = ''
        descripcionProductoCanjePresupuesto.value   = ''
        $('#divPlanCanjePresupuesto').hide()
    }

    function accionesPrefiltro(){
        let btnPrefiltro            = document.querySelector('#btnPrefiltro')
        let formPrefiltro           = document.querySelector('#formPrefiltro')
        let filtroOrden             = document.querySelector('#filtroOrden')
        let filtroDesde             = document.querySelector('#filtroDesde')
        let filtroHasta             = document.querySelector('#filtroHasta')
        let btnBuscarPrefiltro      = document.querySelector('#btnBuscarPrefiltro')
        let btnCancelarPrefiltro    = document.querySelector('#btnCancelarPrefiltro')
        let btnCerrarModalPrefiltro = document.querySelector('#btnCerrarModalPrefiltro')
        let btnCloseModalPrefiltro  = document.querySelector('#btnCloseModalPrefiltro')
        let inputsFiltro            = document.querySelectorAll('#filtroOrden, #filtroDesde, #filtroHasta')

        btnPrefiltro.addEventListener('click', e => {
            e.preventDefault()
            $('#modalPrefiltro').show()
        })

        btnCerrarModalPrefiltro.addEventListener('click', e => {
            e.preventDefault()
            $('#modalPrefiltro').hide()
        })

        btnCloseModalPrefiltro.addEventListener('click', e => {
            e.preventDefault()
            $('#modalPrefiltro').hide()
        })

        btnBuscarPrefiltro.addEventListener('click', e => {
            e.preventDefault()
            tabla.ajax.reload()
            $('#modalPrefiltro').hide()
        })
    
        btnCancelarPrefiltro. addEventListener('click', e => {
            e.preventDefault()
            filtroOrden.value = ''
            filtroDesde.value = ''
            filtroHasta.value = ''
            tabla.ajax.reload()
        })

        inputsFiltro.forEach(element => {
            element.addEventListener('keypress', e => {
                if(e.keyCode === 13){
                    e.preventDefault()
                    btnBuscarPrefiltro.click()
                }
            })
        });
    }

    accionesPrefiltro()

    btnCloseModal.addEventListener('click', e =>{
        e.preventDefault()
        $('#modal').hide()
    })

    btnCerrarModal.addEventListener('click', e =>{
        e.preventDefault()
        $('#modal').hide()
    })

    setTimeout(() => {
        let btnGrabar                           = document.querySelector('#btnEnviarFicha')
        let btnCancelarFicha                    = document.querySelector('#btnCancelarFicha')
        let lugarRecepcionFicha                 = document.querySelector('#lugarRecepcionFicha')
        let sucursalRecepcionFicha              = document.querySelector('#sucursalRecepcionFicha')
        let tecnicoFicha                        = document.querySelector('#tecnicoFicha')
        let emisorFicha                         = document.querySelector('#emisorFicha')
        let familiaProductoFicha                = document.querySelector('#familiaProductoFicha')
        let marcaProductoFicha                  = document.querySelector('#marcaProductoFicha')
        let estadoFicha                         = document.querySelector('#estadoFicha')
        let estanteFicha                        = document.querySelector('#estanteFicha')
        let diagnosticadorFicha                 = document.querySelector('#diagnosticadorFicha')
        let reparadorFicha                      = document.querySelector('#reparadorFicha')
        let embaladorFicha                      = document.querySelector('#embaladorFicha')
        let reparadorFichaDiagnostico           = document.querySelector('#reparadorFichaDiagnostico')
        let cerrarSidebar                       = document.querySelector('#cerrarSidebar')
        let solapaDatosFicha                    = document.querySelector('#solapaDatosFicha')
        let solapaFichaTecnica                  = document.querySelector('#solapaFichaTecnica')
        let navDatos                            = document.querySelector('#nav-datos')
        let navFicha                            = document.querySelector('#nav-ficha')
        let navCerrar                           = document.querySelector('#nav-cerrar')
        let bodySolapa2                         = document.querySelector('#bodySolapa2')
        let productoImagenDespiece              = document.querySelector('#productoImagenDespiece')
        let totalTabla                          = document.querySelector('#totalTabla')
        let tipoFichaPresupuesto                = document.querySelector('#tipoFichaPresupuesto')
        let atencionFichaPresupuesto            = document.querySelector('#atencionFichaPresupuesto')
        let numeroFichaPresupuesto              = document.querySelector('#numeroFichaPresupuesto')
        let cargoFichaPresupuesto               = document.querySelector('#cargoFichaPresupuesto')
        let costoFichaPresupuesto               = document.querySelector('#costoFichaPresupuesto')
        let observacionesFichaPresupuesto       = document.querySelector('#observacionesFichaPresupuesto')
        let codigoProductoCanjePresupuesto      = document.querySelector('#codigoProductoCanjePresupuesto')
        let descripcionProductoCanjePresupuesto = document.querySelector('#descripcionProductoCanjePresupuesto')
        let buscarProductoCanjePresupuesto      = document.querySelector('#buscarProductoCanjePresupuesto')                    

        limitaCaracteres(codigoProductoCanjePresupuesto, CODIGO_LENGTH)

        function grabarDatos(){
            if(cargoFichaPresupuesto.value != '0'){
                formData.append('orden', id)
                formData.append('producto', producto)
                formData.append('tipoFichaPresupuesto', tipoFichaPresupuesto.value)
                formData.append('atencionFichaPresupuesto', atencionFichaPresupuesto.value)
                formData.append('numeroFichaPresupuesto', numeroFichaPresupuesto.value)
                formData.append('cargoFichaPresupuesto', cargoFichaPresupuesto.value)
                formData.append('costoFichaPresupuesto', costoFichaPresupuesto.value)
                formData.append('observacionesFichaPresupuesto', observacionesFichaPresupuesto.value)
                formData.append('codigoProductoCanjePresupuesto', codigoProductoCanjePresupuesto.value)
                //envia data al back
                let xhr = new XMLHttpRequest
                xhr.open('POST', 'mod_repa/procesos/presupuesto/presupuesto_add.php')
                xhr.send(formData)
                xhr.addEventListener('load', () => {
                    if(xhr.status == 200){
                        let respuesta = JSON.parse(xhr.response)
                        formData.delete('orden')
                        formData.delete('producto')
                        formData.delete('tipoFichaPresupuesto')
                        formData.delete('atencionFichaPresupuesto')
                        formData.delete('numeroFichaPresupuesto')
                        formData.delete('cargoFichaPresupuesto')
                        formData.delete('costoFichaPresupuesto')
                        formData.delete('observacionesFichaPresupuesto')
                        formData.delete('codigoProductoCanjePresupuesto')

                        switch (respuesta.estado) {
                            case 'ok':
                                msgTransaccionExitosa()
                                tabla.ajax.reload()
                                limpieza() 
                                sideBar.classList.remove("sb--show")
                                break;
                            case 'Sesión expirada':
                                sesionExpiradaMensajeFlotante()
                                break;
                            case 'Error perfil':
                                msgErrorPerfil()
                                break;                        
                            default:
                                msgAlgoNoFueBien()
                                break;
                        }
                    }
                })
                
            } else {
                swal('Atención', 'Debe seleccionar un cargo/forma', 'warning')
            }
        }

        //Tomo el link de la tabla con el ID del registro
        $(document).on('click', '.presupuesto-item', (e) => {
            e.preventDefault()
            limpieza()
            id                      = e.target.innerText
            totalTabla.innerText    = "Total: $0"

            navCerrar.classList.remove("active")
            navCerrar.classList.remove("show")

            navFicha.classList.remove("active")
            navFicha.classList.remove("show")

            navDatos.classList.add("active")
            navDatos.classList.add("show")

            cerrarSidebar.classList.remove("active")
            cerrarSidebar.ariaSelected = "false"

            solapaFichaTecnica.classList.remove("active")
            solapaFichaTecnica.ariaSelected = "false"

            solapaDatosFicha.classList.add("active")
            solapaDatosFicha.ariaSelected = "true"

            $('#divDatosCliente').hide()
            $('#divDatosResolucion').hide()
            $('#divDatosPresupuesto').hide()
            $('#divMonitorEmbalaje').hide()
            $('#divMonitorResolucion').hide()
            $('#divMonitorDiagnostico').hide()
            $('#divEstadoOrden').hide()
            
            //console.log(e.target.innerText)
            cargaFormasDeRetiro(cargoFichaPresupuesto, 'S').then(() =>{
                cargaLugaresRecepcion(lugarRecepcionFicha).then(() => {
                    cargaSucursales(sucursalRecepcionFicha).then(() => {
                        cargaTecnicosFicha(tecnicoFicha).then(() => {
                            cargaEmisores(emisorFicha).then(() => {
                                cargaFamilias(familiaProductoFicha).then(() => {
                                    cargaMarcas(marcaProductoFicha).then(() => {
                                        estadosDeReparacion(estadoFicha).then(() => {
                                            estanteList(estanteFicha).then(() => {
                                                cargaDiagnosticadores(diagnosticadorFicha).then(() => {
                                                    cargaReparadores(reparadorFicha).then(() => {
                                                        cargaEmbaladores(embaladorFicha).then(() => {
                                                            cargaReparadoresActivos(reparadorFichaDiagnostico).then(() => {
                                                                datosFichaSolapa1(e.target.innerText).then((respuestaSolapa1) =>{ 
                                                                    producto = respuestaSolapa1.producto_id
                                                                    despieceDiagnostico(id, respuestaSolapa1.producto_id).then((respuestaDespieceDiagnostico) =>{
                                                                        if(respuestaDespieceDiagnostico.productoImagenDespiece != ''){
                                                                            productoImagenDespiece.src = `mod_repa/tablas/productos/adjuntos/${respuestaDespieceDiagnostico.productoImagenDespiece}`
                                                                        } else {
                                                                            productoImagenDespiece.src = '../../hdn/img/sinImagen.png'
                                                                        }

                                                                        let template    = ''
                                                                        let Subtotal    = 0
                                                                
                                                                        if(respuestaDespieceDiagnostico.despiece.length > 0){
                                                                            respuestaDespieceDiagnostico.despiece.forEach(element => {
                                                                                Subtotal  = (element.cantidad * element.costo);
                                                                                template += `
                                                                                    <tr>
                                                                                        <td>${element.referencia}</td>
                                                                                        <td>${element.codigo}</td>
                                                                                        <td>${element.descripcion}</td>
                                                                                        <td>${element.costo}</td>
                                                                                        <td>${element.cantidad}</td>
                                                                                        <td class="subtotal">${Subtotal}</td>
                                                                                    </tr>
                                                                                ` 
                                                                            });

                                                                            bodySolapa2.innerHTML = template
                                                                        } 

                                                                        let total       = 0
                                                                        let subtotales  = document.querySelectorAll('.subtotal')
                                                                        subtotales.forEach(element => {
                                                                            total = total + parseInt(element.innerText)
                                                                        });
                                                                        totalTabla.innerText = "Total: $"+total
                                                                        if(respuestaSolapa1.costo == '1.00'){
                                                                            costoFichaPresupuesto.value = total
                                                                        } else {
                                                                            costoFichaPresupuesto.value = respuestaSolapa1.costo
                                                                        }   
                                                                    })                                                          
                                                                })   
                                                            })                                              
                                                        }) 
                                                    }) 
                                                })  
                                            }) 
                                        }) 
                                    })
                                })
                            })
                        })
                    })
                }) 
            })
    
            sideBar.classList.add("sb--show")

        })

        cerrarSidebar.addEventListener('click', e => {
            e.preventDefault()
            sideBar.classList.remove("sb--show")
        })

        btnGrabar.addEventListener('click', e => {
            e.preventDefault()

            if(tipoFichaPresupuesto.value == 'C'){
                if(descripcionProductoCanjePresupuesto.value != ''){
                    grabarDatos()
                } else {
                    swal('Atención', 'Debe seleccionar un producto de destino', 'warning')
                }
            } else {
                grabarDatos()
            } 
        })

        btnCancelarFicha.addEventListener('click', e =>{
            e.preventDefault()
            sideBar.classList.remove("sb--show")
        })

        modalBuscarBombaCanje(modal, modalBody, modalTitulo, buscarProductoCanjePresupuesto, 'codigoProductoCanjePresupuesto', 'descripcionProductoCanjePresupuesto')

        codigoProductoCanjePresupuesto.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                buscarProductoCanjePresupuesto.click()
            }
    
            if(codigoProductoCanjePresupuesto.value.length == CODIGO_LENGTH){
                let xhr = new XMLHttpRequest
                xhr.open('GET', 'mod_repa/tablas/productos/productos_search.php?code='+codigoProductoCanjePresupuesto.value)
                xhr.send()
                xhr.addEventListener('load', () => {
                    if(xhr.status == 200){
                        let respuesta = JSON.parse(xhr.response)
                        if(respuesta != null && respuesta != false && respuesta.canje_flag == 'S'){
                            descripcionProductoCanjePresupuesto.value  = respuesta.descripcion
                        } else {
                            descripcionProductoCanjePresupuesto.value  = ''
                            codigoProdCanje.value       = ''
                            swal('Atención', 'Código inexistente o inválido :(', 'warning')
                        }
                    }
                })
            } else {
                descripcionProductoCanjePresupuesto.value  = ''
            }
    
        })

        tipoFichaPresupuesto.addEventListener('change', e =>{
            e.preventDefault()
            switch (e.target.value) {
                case 'S':
                    cargoFichaPresupuesto.disabled  = true
                    costoFichaPresupuesto.disabled  = true
                    cargoFichaPresupuesto.value     = '2'
                    costoFichaPresupuesto.value     = '0'
                    $('#divPlanCanjePresupuesto').hide()
                    break;
                case 'C':
                    cargoFichaPresupuesto.disabled  = true
                    costoFichaPresupuesto.disabled  = false
                    cargoFichaPresupuesto.value     = '1'
                    $('#divPlanCanjePresupuesto').show()
                    break;
                default:
                    $('#divPlanCanjePresupuesto').hide()
                    cargoFichaPresupuesto.disabled  = false
                    costoFichaPresupuesto.disabled  = false 
                    cargoFichaPresupuesto.value     = respuestaSolapa1.forma_retiro_id
                    if(respuestaSolapa1.costo == '1.00'){
                        costoFichaPresupuesto.value = total
                    } else {
                        costoFichaPresupuesto.value = respuestaSolapa1.costo
                    }
                    break;
            }
        }) 

    }, 500);

})()