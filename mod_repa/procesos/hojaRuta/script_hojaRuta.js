(() => {
    let formulario          = document.querySelector('#form')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let nombreCliente       = document.querySelector('#nombreCliente')
    let provincia           = document.querySelector('#provincia')
    let localidad           = document.querySelector('#localidad')
    let calle               = document.querySelector('#calle')
    let numeroCalle         = document.querySelector('#numeroCalle')
    let dpto                = document.querySelector('#dpto')
    let tecnico             = document.querySelector('#tecnico')
    let hojaRuta            = document.querySelector('#hojaRuta')//Captura de boton cancelar
    let btnGrabar           = document.querySelector('#btnGrabar')//Captura de boton grabar
    let btnCancelar         = document.querySelector('#btnCancelar')//Captura de boton cancelar
    let edit                = false//flag de edición de registro existente o nuevo registro
    let id                  = ''
    let arrayVal = {
        idPedido        : {readonly : true},
        nombreCliente   : {readonly : true},
        provincia       : {readonly : true},
        localidad       : {readonly : true},
        calle           : {readonly : true},
        numeroCalle     : {readonly : true},
        dpto            : {readonly : true},
        tecnico         : {required : true},
        hojaRuta        : {}
    }
    
    hojaRuta.checked = false

    //Declaración del complemento DataTable
    let tabla = $('#tabla').DataTable( {
        "ajax": {
            url: 'mod_repa/procesos/hojaRuta/hojaRuta_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "reparacion_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    }, 
            },
            {"data" : "cliente"},
            {"data" : "provincia"},
            {"data" : "localidad"},
            {"data" : "calle"},
            {"data" : "nro_calle"},
            {"data" : "dpto"}
        ],
        processing: true,
        paging: true,
        bLengthChange: false,
        iDisplayLength: 10,
        bInfo: true,
        bAutoWidth: false,
        dom:
            "<'row'<'col-sm-4'B><'col-sm-4 text-center'l><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'i><'col-sm-6'p>>",
        buttons: [
            {extend: 'excel', title: 'Lista de estantes', text: 'Exportar a Excel'},
        ],
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
    $(document).on('click', '.task-item', (e) => {
        e.preventDefault()
        cleanInputs(inputs)
        id= e.target.innerText
        url = 'mod_repa/procesos/hojaRuta/hojaRuta_single.php'
        showData(id, url, inputs)
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabar.addEventListener('click', e => {
        e.preventDefault()
/*         let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = 'mod_repa/tablas/estantes/estantes_add.php'
            let editar = 'mod_repa/tablas/estantes/estantes_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaEstantes).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        activoEstantes.checked = true
                        id = ''
                        edit = false
                        break;
                    case 'Sesión expirada':
                        sesionExpiradaMensajeFlotante()
                        break;
                    case 'Error perfil':
                        msgErrorPerfil()
                        cleanFormData(inputs, formData)
                        break;
                    default:
                        msgAlgoNoFueBien()
                        cleanFormData(inputs, formData)
                        break;
                }
            })
        } */
    })
    
    //Funcionalidad del botón de Cancelar
    btnCancelar.addEventListener('click', e => {
        e.preventDefault()
        /* cleanInputs(inputs)
        edit = false
        activoEstantes.checked = true
        id = '' */
    })
})()