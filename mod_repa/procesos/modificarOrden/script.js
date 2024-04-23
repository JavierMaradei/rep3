(() =>{
    let formulario              = document.querySelector('#inputsBuscador')//Captura del formulario
    let inputs                  = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                = new FormData() //Creo el formData para transferencia de información con el Backend
    let respBtn                 = document.querySelector('#respuesta')//Div para mostrar los avisos de espera
    let orden                   = document.querySelector('#orden')
    let btnBuscar               = document.querySelector('#btnBuscar')
    let btnCancelar             = document.querySelector('#btnCancelar')
    let btnCerrarModal          = document.querySelector('#btnCerrarModal')
    let btnCloseModal           = document.querySelector('#btnCloseModal')
    
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
        //dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Lista de reparaciones'},
            {extend: 'pdf', title: 'Lista de reparaciones'},
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
        xhr.open('POST', 'mod_repa/procesos/modificarOrden/modificarOrden_search.php')//Envío la información del filtro
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

    formulario.addEventListener('submit', e => {
        e.preventDefault()
    })

    orden.addEventListener('keyup', e =>{
        e.preventDefault()
        if(e.keyCode === 13){
            btnBuscar.click()
        }
    })

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
        tabla.clear().draw()
    })

    /////////////////// PRODUCTOS ///////////////////
   /*  codigoProducto.addEventListener('keyup', (e) => {
        if(e.keyCode === 13){
            btnBuscarProducto.click()
        }

        if(codigoProducto.value.length == CODIGO_LENGTH){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/productos/productos_search.php?code='+codigoProducto.value)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    if(respuesta != null && respuesta != false){
                        descripcionProducto.value   = respuesta.descripcion
                    } else {
                        descripcionProducto.value   = ''
                        codigoProducto.value        = ''
                        swal('Atención', 'Código inexistente o inválido :(', 'warning')
                    }
                }
            })
        } else {
            descripcionProducto.value   = ''
        }
    })

    btnBuscarProducto.addEventListener('click', e => {
        e.preventDefault()

        busquedaPorProducto('#modalBuscador', '#bodyBuscador', '#tituloBuscador').then(() => {
            let marcaProductoModal      = document.querySelector('#marcaProductoModal')
            let familiaProductoModal    = document.querySelector('#familiaProductoModal')
            let buscadorModal           = document.querySelector('#buscadorModal')
            let btnBuscarEquipo         = document.querySelector('#btnBuscarEquipo')
            let modalBusquedaTabla      = document.querySelector('#modalBusquedaTabla')

            cargaFamilias(familiaProductoModal)
            cargaMarcas(marcaProductoModal)

            let filtros = document.querySelectorAll('#marcaProductoModal, #familiaProductoModal, #buscadorModal')
            filtros.forEach(element => {
                if(element.keyCode === 13){
                    btnBuscarEquipo.click()
                } 
            });
            
            btnBuscarEquipo.addEventListener('click', e => {
                e.preventDefault()

                enviarParametrosModal(marcaProductoModal.value, familiaProductoModal.value, buscadorModal.value, modalBusquedaTabla)
            })
        })
    }) */

    //Click en la lista del buscador de clientes
    $(document).on('click', '.product-item', (e) => {
        e.preventDefault()
        codigo  = e.target.innerText
        url     = 'mod_repa/tablas/productos/productos_search.php?code='+codigo
        $('#modalBuscador').hide()
        
        let xhr = new XMLHttpRequest
        xhr.open('GET', url)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                codigoProducto.value        = respuesta.codigo
                descripcionProducto.value   = respuesta.descripcion
            }
        })
    })

    //Cierro modal
    btnCerrarModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal').hide()
    })

    //Cierro modal 2
    btnCloseModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal').hide()
    })
    /////////////////// FIN PRODUCTOS ///////////////////

    setTimeout(() => {
        dataGeneral()
    }, 500);

})()