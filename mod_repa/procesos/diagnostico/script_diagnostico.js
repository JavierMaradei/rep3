(function iniciaDiagnostico() {
    let formData            = new FormData()
    let sideBar             = document.querySelector('#root')
    let id                  = ''
    let tipoIngreso         = ''
    let equipoConDespiece   = false
    let arrayVal            = {

    }

    //Declaración del complemento DataTable
    let tabla = $('#tabla_diagnostico').DataTable( {
        "ajax": {
            url: 'mod_repa/procesos/diagnostico/diagnostico_search.php',
            type: 'GET',
            dataSrc: "",
            //Envío de parámetros Ajax datatable.
            data: function(d){
                d.orden     = filtroOrden.value;
                d.fdesde    = filtroDesde.value;
                d.fhasta    = filtroHasta.value;
            }
        },
        "order": [[1,'asc'], [0,'asc']],
        "columns": [  
            {"data" : "reparacion_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="reparacion-item" href="'+data+'">' + data + '</a>';
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
            {extend: 'excel', title: 'Lista de diagnósticos'},
            {extend: 'pdf', title: 'Lista de diagnósticos'},
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

    //Tomo el link de la tabla con el ID del registro
    $(document).on('click', '.reparacion-item', (e) => {
        e.preventDefault()
        id                              = e.target.innerText
        let lugarRecepcionFicha         = document.querySelector('#lugarRecepcionFicha')
        let sucursalRecepcionFicha      = document.querySelector('#sucursalRecepcionFicha')
        let tecnicoFicha                = document.querySelector('#tecnicoFicha')
        let emisorFicha                 = document.querySelector('#emisorFicha')
        let familiaProductoFicha        = document.querySelector('#familiaProductoFicha')
        let marcaProductoFicha          = document.querySelector('#marcaProductoFicha')
        let estadoFicha                 = document.querySelector('#estadoFicha')
        let estanteFicha                = document.querySelector('#estanteFicha')
        let diagnosticadorFicha         = document.querySelector('#diagnosticadorFicha')
        let reparadorFicha              = document.querySelector('#reparadorFicha')
        let embaladorFicha              = document.querySelector('#embaladorFicha')
        let reparadorFichaDiagnostico   = document.querySelector('#reparadorFichaDiagnostico')
        let cajonFichaDiagnostico       = document.querySelector('#cajonFichaDiagnostico')
        let cerrarSidebar               = document.querySelector('#cerrarSidebar')
        let solapaDatosFicha            = document.querySelector('#solapaDatosFicha')
        let solapaFichaTecnica          = document.querySelector('#solapaFichaTecnica')
        let navDatos                    = document.querySelector('#nav-datos')
        let navFicha                    = document.querySelector('#nav-ficha')
        let navCerrar                   = document.querySelector('#nav-cerrar')
        let bodySolapa2                 = document.querySelector('#bodySolapa2')
        let productoImagenDespiece      = document.querySelector('#productoImagenDespiece')
        let totalTabla                  = document.querySelector('#totalTabla')
        reparadorFichaDiagnostico.value = ''   
        cajonFichaDiagnostico.value     = '' 
        totalTabla.innerText            = "Total: $0"
        
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
        $('#divEstadoOrden').hide()
        $('#divDatosCanje').hide()
        $('#divDatosRemito').hide()
        $('#divDatosResolucion').hide()
        $('#divDatosPresupuesto').hide()
        $('#divMonitorPresupuesto').hide()
        $('#divMonitorEmbalaje').hide()
        $('#divMonitorResolucion').hide()    
        //console.log(e.target.innerText)

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
                                                            tipoIngreso = respuestaSolapa1.tipo_ingreso
                                                            despiece(respuestaSolapa1.producto_id).then((respuestaDespiece) =>{
                                                                if(respuestaDespiece[0].productoImagenDespiece != ''){
                                                                    productoImagenDespiece.src = `mod_repa/tablas/productos/adjuntos/${respuestaDespiece[0].productoImagenDespiece}`
                                                                } else {
                                                                    productoImagenDespiece.src = '../../hdn/img/sinImagen.png'
                                                                }

                                                                let template = ''
                                                                if(respuestaDespiece[0].despiece.length > 0){
                                                                    equipoConDespiece = true
                                                                    respuestaDespiece[0].despiece.forEach(element => {
                                                                        template += `
                                                                            <tr>
                                                                                <td>${element.referencia}</td>
                                                                                <td>${element.codigo}</td>
                                                                                <td>${element.descripcion}</td>
                                                                                <td>${element.costo}</td>
                                                                                <td><input type="text" class="cantDiagnostico" value="0"></input></td>
                                                                                <td class="subtotal">0</td>
                                                                            </tr>
                                                                        ` 
                                                                    });

                                                                    bodySolapa2.innerHTML = template
    
                                                                    let cantDiagnostico = document.querySelectorAll(".cantDiagnostico")
                                                                    cantDiagnostico.forEach(element => {
                                                                        soloNumeros(element)
                                                                    });
                                                                } else {
                                                                    template += `
                                                                    <tr class="text-center">
                                                                        <td colspan="6">El equipo no posee despiece. El mismo debe realizarse desde Tablas->Despieces</td>
                                                                    </tr>`
                                                                    bodySolapa2.innerHTML = template

                                                                    totalTabla.innerText = ""
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

        sideBar.classList.add("sb--show")

    })

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
    
    $(document).on('keyup', '.cantDiagnostico', (e) => {
        e.preventDefault()
        let cantidad    = e.target.value
        let td          = e.target.parentNode.parentNode
        let linea       = td.querySelector("td:nth-of-type(4)").innerText
        td.querySelector("td:nth-of-type(6)").innerText = linea * cantidad

        let contadorTotal = 0
        let subtotales = document.querySelectorAll('.subtotal')
        subtotales.forEach(element => {
            contadorTotal = contadorTotal + parseInt(element.innerText)
        });
        totalTabla.innerText = "Total: $"+contadorTotal
    })

    setTimeout(() => {
        let btnGrabar           = document.querySelector('#btnEnviarFicha')
        btnGrabar.addEventListener('click', e => {
            e.preventDefault()
            let validateDatosTabla  = false
            let tablaDiagnostico    = document.querySelectorAll('#bodySolapa2 tr')
            let arrayTabla          = {}

            if(equipoConDespiece){
                if(cajonFichaDiagnostico.value != '' && reparadorFichaDiagnostico.value != ''){
                    tablaDiagnostico.forEach( (element, index) => {
                        let codigo      = element.querySelector("td:nth-of-type(2)").innerText
                        let cantidad    = element.querySelector("td:nth-of-type(5)")
                        cantidad        = cantidad.querySelector("input").value
        
                        if(cantidad != 0){
                            validateDatosTabla = true
                            arrayTabla[index] = {
                                'codigo'        : codigo,
                                'cantidad'      : cantidad
                            }
                        }
                    });
        
                    let datosTabla = JSON.stringify(arrayTabla)
                    if(validateDatosTabla) {
                        formData.append('data', datosTabla)
                        formData.append('orden', id)
                        formData.append('tipoIngreso', tipoIngreso)
                        formData.append('reparador', reparadorFichaDiagnostico.value)
                        formData.append('cajon', cajonFichaDiagnostico.value)
        
                        //envia data al back
                        let xhr = new XMLHttpRequest
                        xhr.open('POST', 'mod_repa/procesos/diagnostico/diagnostico_add.php')
                        xhr.send(formData)
                        xhr.addEventListener('load', () => {
                            if(xhr.status == 200){
                                let respuesta = JSON.parse(xhr.response)
                                formData.delete('data')
                                formData.delete('orden')
                                formData.delete('tipoIngreso')
                                formData.delete('reparador')
                                formData.delete('cajon')
        
                                switch (respuesta.estado) {
                                    case 'Ok':
                                        msgTransaccionExitosa()
                                        sideBar.classList.remove("sb--show")
                                        tabla.ajax.reload()
                                        reparadorFichaDiagnostico.value = ''   
                                        cajonFichaDiagnostico.value     = ''  
                                        equipoConDespiece               = false   
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
                        swal('Atención', 'Debe seleccionar alguna pieza', 'warning')
                    }
                } else {
                    swal('Atención', 'Ingrese reparador y nro de cajón', 'warning')
                }
            } else {
                swal('Atención', 'El equipo seleccionado no posee despiece', 'warning') 
            }
        })
    }, 500);

})()