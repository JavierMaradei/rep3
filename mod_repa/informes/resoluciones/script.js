(() =>{
    let formulario              = document.querySelector('#inputsPrefiltro')//Captura del formulario
    let inputs                  = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                = new FormData() //Creo el formData para transferencia de información con el Backend
    let respBtn                 = document.querySelector('#respuesta')//Div para mostrar los avisos de espera
    let f_inicial               = document.querySelector('#desdeFechaResolucion')
    let f_final                 = document.querySelector('#hastaFechaResolucion')
    let lugarRecepcion          = document.querySelector('#lugarRecepcion')
    let hasta                   = moment(new Date()).format('YYYY-MM-DD');
    let desde                   = moment().subtract(18, 'months').format('YYYY-MM-DD');
    let btnBuscar               = document.querySelector('#btnBuscar')
    let btnCancelar             = document.querySelector('#btnCancelar')

    cargaLugaresRecepcion(lugarRecepcion)

    //Declaración del complemento DataTable
    let tabla = $('#tabla').DataTable( {
        "order": [[1,'asc'], [0,'asc']],
        columnDefs: [
            {
                "targets"   : 0,
                "render"    : function ( data, type, row, meta ) {
                    return '<a class="reparacion-item" href="'+data+'">'+data+'</a>'}
            },
            {
                targets: [1,2],
                render: $.fn.dataTable.render.moment('YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY')
            } 
        ],
        processing: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Informe de embalajes'},
            {extend: 'pdf', title: 'Informe de embalajes'},
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

    function recargaTabla(){
        let xhr = new XMLHttpRequest
        xhr.open('POST', 'mod_repa/informes/resoluciones/resoluciones_search.php')//Envío la información del filtro
        xhr.send(formData)

        xhr.addEventListener('load', () => { //Cuando me vuelven los datos de la query armo la tabla
            tabla.clear() // Primero la vacío de registros preexistentes
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                respuesta.forEach(element => {//Si las fechas son del año 1900 limpio el valor
                    if(element.freparacion == '01/01/1900'){
                        element.freparacion = ''
                    }                  
                    tabla.row.add([ //Agrego las nuevas filas
                        element.reparacion_id,
                        element.frecepcion,
                        element.fretiro,
                        element.producto_codigo,
                        element.producto_descripcion,
                        element.nro_serie,
                        element.cliente_completo,
                        element.lugar_recepcion_descripcion,
                        element.atencion,
                        element.RepPres,
                        element.sucursal_descripcion
                    ])
                });
                tabla.draw() //Imprimo la tabla en pantalla
            }
        })

        xhr.addEventListener('loadend', () => { //Cuando termina la carga de los datos borro el mensaje de espera
            respBtn.innerHTML= ''
            //cleanInputs(inputs)
            cleanFormData(inputs, formData)
        })
    }

    btnBuscar.addEventListener('click', e => {//Al hacer click en el botón Buscar del prefiltro...
        e.preventDefault()
        $('html, body').animate({scrollTop: $("#tabla").offset().top}, 100);
        let progreso = '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span>Procesando los filtros... <br><i>Esta operación puede demorarse dependiendo del rango de fechas que hayas seleccionado.</i></span>'
        respBtn.innerHTML = progreso //Muestro un aviso de espera
        collectData(inputs, formData)//Recolecto los datos
        recargaTabla()
    })

    btnCancelar.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        f_inicial.value         = desde
        f_final.value           = hasta
        lugarRecepcion.value    = '0'
        tabla.clear().draw()
    })

    setTimeout(() => {
        dataGeneral()
    }, 500);

})()