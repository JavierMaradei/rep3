(function iniciaDiagnostico() {
    let formData            = new FormData()
    let sideBar             = document.querySelector('#root')



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
                                                        datosFichaSolapa1(e.target.innerText).then(() =>{
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


})()