(() =>{
    let formData                    = new FormData()
    let sideBar                     = document.querySelector('#root')
    let chkTodasLasSucursales       = document.querySelector('#chkTodasLasSucursales')
    let cargoFichaResolucion        = ''
    let costoFichaResolucion        = ''
    let numeroRemitoFicha           = ''
    let modal                       = document.querySelector('#modal')
    let modalBody                   = document.querySelector('#body')
    let modalTitulo                 = document.querySelector('#titulo')
    let filtro                      = [chkTodasLasSucursales]

    //Declaración del complemento DataTable
    let tabla = $('#tabla_resoluciones').DataTable( {
        "ajax": {
            url: 'mod_repa/procesos/resolucion/resolucion_search.php',
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
                    return '<a class="resolucion-item" href="'+data+'">' + data + '</a>';
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
            {extend: 'excel', title: 'Lista de resoluciones'},
            {extend: 'pdf', title: 'Lista de resoluciones'},
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

    //Tomo el link de la tabla con el ID del registro
    $(document).on('click', '.resolucion-item', (e) => {
        e.preventDefault()
        cargoFichaResolucion.value          = ''
        costoFichaResolucion.value          = ''
        numeroRemitoFicha.value             = ''
        id                                  = e.target.innerText
        let lugarRecepcionFicha             = document.querySelector('#lugarRecepcionFicha')
        let sucursalRecepcionFicha          = document.querySelector('#sucursalRecepcionFicha')
        let tecnicoFicha                    = document.querySelector('#tecnicoFicha')
        let emisorFicha                     = document.querySelector('#emisorFicha')
        let presupuestadorFicha             = document.querySelector('#presupuestadorFicha')
        let familiaProductoFicha            = document.querySelector('#familiaProductoFicha')
        let marcaProductoFicha              = document.querySelector('#marcaProductoFicha')
        let estadoFicha                     = document.querySelector('#estadoFicha')
        let estanteFicha                    = document.querySelector('#estanteFicha')
        let diagnosticadorFicha             = document.querySelector('#diagnosticadorFicha')
        let reparadorFicha                  = document.querySelector('#reparadorFicha')
        let embaladorFicha                  = document.querySelector('#embaladorFicha')
        let reparadorFichaDiagnostico       = document.querySelector('#reparadorFichaDiagnostico')
        let cerrarSidebar                   = document.querySelector('#cerrarSidebar')
        let solapaDatosFicha                = document.querySelector('#solapaDatosFicha')
        let solapaFichaTecnica              = document.querySelector('#solapaFichaTecnica')
        let navDatos                        = document.querySelector('#nav-datos')
        let navFicha                        = document.querySelector('#nav-ficha')
        let navCerrar                       = document.querySelector('#nav-cerrar')
        let bodySolapa2                     = document.querySelector('#bodySolapa2')
        let productoImagenDespiece          = document.querySelector('#productoImagenDespiece')
        let btnCancelarFicha                = document.querySelector('#btnCancelarFicha')
        let codigoProductoCanjeResolucion   = document.querySelector('#codigoProductoCanjeResolucion')
        let buscarProductoCanjeResolucion   = document.querySelector('#buscarProductoCanjeResolucion')
        
        cargoFichaResolucion                = document.querySelector('#cargoFichaResolucion')
        costoFichaResolucion                = document.querySelector('#costoFichaResolucion')
        numeroRemitoFicha                   = document.querySelector('#numeroRemitoFicha')

        btnCancelarFicha.addEventListener('click', e =>{
            e.preventDefault()
            sideBar.classList.remove("sb--show")
        })

        //Funcionalidad botón buscar canje
        modalBuscarBombaCanje(modal, modalBody, modalTitulo, buscarProductoCanjeResolucion)

        //Funcionalidad campo código canje
        codigoProductoCanjeResolucion.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                buscarProductoCanjeResolucion.click()
            }

            if(codigoProductoCanjeResolucion.value.length == CODIGO_LENGTH){
                let xhr = new XMLHttpRequest
                xhr.open('GET', 'mod_repa/tablas/productos/productos_search.php?code='+codigoProductoCanjeResolucion.value)
                xhr.send()
                xhr.addEventListener('load', () => {
                    if(xhr.status == 200){
                        let respuesta = JSON.parse(xhr.response)
                        if(respuesta != null && respuesta != false && respuesta.canje_flag == 'S'){
                            descripcionProdCanje.value  = respuesta.descripcion
                        } else {
                            descripcionProdCanje.value  = ''
                            codigoProdCanje.value       = ''
                            alert('Código inexistente o inválido :(')
                        }
                    }
                })
            } else {
                descripcionProdCanje.value  = ''
            }

        }) 

        /*FALTANTES -> Adjuntos
                    -> Check retiro de equipos
                    -> Scroll top
                    -> Hacer arrayVal
        */

/*         solapaDatosFicha.scrollTo({
            top: 1,
            left: 1,
            behavior: 'smooth'
            }); */
        
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

        cerrarSidebar.addEventListener('click', e => {
            e.preventDefault()
            sideBar.classList.remove("sb--show")
        })

        $('#divDatosCliente').hide()
        $('#divDatosRecepcion').hide()
        $('#divDatosCanje').hide()
        $('#divDatosRemito').hide()
        $('#divDatosResolucion').hide()
        $('#divEstadoOrden').hide()
        $('#divDatosPresupuesto').hide()
        $('#divMonitorEmbalaje').hide()
        $('#divMonitorDiagnostico').hide()
        $('#divMonitorPresupuesto').hide()
        $('#precioDespiece').hide()
        $('#subTotalDespiece').hide()
        $('#totalTabla').hide()
        
        
        //console.log(e.target.innerText)
        cargaFormasDeRetiro(cargoFichaResolucion, 'S').then(() =>{
            estanteList(estanteFichaEmbalaje).then(() =>{
                cargaLugaresRecepcion(lugarRecepcionFicha).then(() => {
                    cargaSucursales(sucursalRecepcionFicha).then(() => {
                        cargaTecnicosFicha(tecnicoFicha).then(() => {
                            cargaEmisores(presupuestadorFicha).then(() => {
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
                                                                        if(respuestaSolapa1.tipo_ingreso == 'C'){
                                                                            $('#divPlanCanjeResolucion').show()
                                                                        } else {
                                                                            $('#divPlanCanjeResolucion').hide()
                                                                        }
                                                                        despieceDiagnostico(id, respuestaSolapa1.producto_id).then((respuestaDespieceDiagnostico) =>{
                                                                            if(respuestaDespieceDiagnostico.productoImagenDespiece != ''){
                                                                                productoImagenDespiece.src = `mod_repa/tablas/productos/adjuntos/${respuestaDespieceDiagnostico.productoImagenDespiece}`
                                                                            } else {
                                                                                productoImagenDespiece.src = '../../hdn/img/sinImagen.png'
                                                                            }
            
                                                                            let template = ''
                                                                            if(respuestaDespieceDiagnostico.despiece.length > 0){
                                                                                respuestaDespieceDiagnostico.despiece.forEach(element => {
                                                                                    template += `
                                                                                        <tr>
                                                                                            <td>${element.referencia}</td>
                                                                                            <td>${element.codigo}</td>
                                                                                            <td>${element.descripcion}</td>
                                                                                            <td>${element.cantidad}</td>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                        </tr>
                                                                                    ` 
                                                                                });
            
                                                                                bodySolapa2.innerHTML = template
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
            })
        })

        sideBar.classList.add("sb--show")

    })

    function limpieza(){
        sideBar.classList.remove("sb--show")
        cargoFichaResolucion        = ''
        costoFichaResolucion        = ''
        numeroRemitoFicha           = ''
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

    setTimeout(() => {
        let btnGrabar           = document.querySelector('#btnEnviarFicha')
        btnGrabar.addEventListener('click', e => {
            e.preventDefault()

            if(cargoFichaResolucion.value != '0' && costoFichaResolucion.value != ''){
                formData.append('orden', id)        
                formData.append('cargoFichaResolucion', cargoFichaResolucion.value)
                formData.append('costoFichaResolucion', costoFichaResolucion.value)
                formData.append('numeroRemitoFicha', numeroRemitoFicha.value)

                //envia data al back
                let xhr = new XMLHttpRequest
                xhr.open('POST', 'mod_repa/procesos/resolucion/resolucion_edit.php')
                xhr.send(formData)
                xhr.addEventListener('load', () => {
                    if(xhr.status == 200){
                        let respuesta = JSON.parse(xhr.response)
                        formData.delete('orden')        
                        formData.delete('cargoFichaResolucion')
                        formData.delete('costoFichaResolucion')
                        formData.delete('numeroRemitoFicha')
        
                        switch (respuesta.estado) {
                            case 'ok':
                                msgTransaccionExitosa()
                                tabla.ajax.reload()
                                limpieza() 
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
                swal('Atención', 'Debe seleccionar un cargo/forma y costo', 'warning')
            }
        })
    }, 500);

})()