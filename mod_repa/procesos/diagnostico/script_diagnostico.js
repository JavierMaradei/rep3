(function iniciaDiagnostico() {
    let btnBuscarPrefiltro      = document.querySelector('#btnBuscarPrefiltro')
    let btnCancelarPrefiltro    = document.querySelector('#btnCancelarPrefiltro')
    let formPrefiltro           = document.querySelector('#formPrefiltro')
    let inputsPrefiltro         = formPrefiltro.querySelectorAll('input,select,textarea')
    let formData                = new FormData()
    let filtroOrden             = document.querySelector('#filtroOrden')
    let filtroDesde             = document.querySelector('#filtroDesde')
    let filtroHasta             = document.querySelector('#filtroHasta')

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
                return '<a class="task-item" href="'+data+'">' + data + '</a>';
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

    btnBuscarPrefiltro.addEventListener('click', e => {
        e.preventDefault()
        //collectData(inputs, formData)
        tabla.ajax.reload()

    })

    btnCancelarPrefiltro. addEventListener('click', e => {
        e.preventDefault()
        filtroOrden.value = ''
        filtroDesde.value = ''
        filtroHasta.value = ''
    })


})()