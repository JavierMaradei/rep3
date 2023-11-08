(() => {
    let formulario          = document.querySelector('#form')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let nombreCliente       = document.querySelector('#nombreCliente')
    let provincia           = document.querySelector('#provincia_id')
    let localidad           = document.querySelector('#localidad_id')
    let calle               = document.querySelector('#calle')
    let numeroCalle         = document.querySelector('#numeroCalle')
    let dpto                = document.querySelector('#dpto')
    let tecnico             = document.querySelector('#tecnico')
    let hojaRuta            = document.querySelector('#hojaRuta')//Captura de boton cancelar
    let btnGrabar           = document.querySelector('#btnGrabar')//Captura de boton grabar
    let btnCancelar         = document.querySelector('#btnCancelar')//Captura de boton cancelar
    let btnPrefiltro        = document.querySelector('#btnPrefiltro')
    let edit                = false//flag de edición de registro existente o nuevo registro
    let id                  = ''
    let arrayVal = {
        idPedido        : {},
        nombreCliente   : {},
        provincia_id    : {},
        localidad_id    : {},
        calle           : {},
        numeroCalle     : {},
        dpto            : {},
        tecnico         : {noCero: true, required : true},
        hojaRuta        : {}
    }

    cargaTecnicos(tecnico)
    listaProvincias(provincia, 'S')
    hojaRuta.checked = false

    function limpieza(){
        cleanInputs(inputs) 
        cleanFormData(inputs, formData)
        tabla.ajax.reload();
        hojaRuta.checked    = false
        btnGrabar.disabled  = true
        id                  = ''
        edit                = false
    }

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
            {"data" : "tecnico"},
            {"data" : "hojaRuta"},
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
        showDataReloaded(id, url, inputs).then((r) =>{
            console.log(r)
            listaLocalidades(localidad,r.provincia_id, 'S').then(() => {
                $('#localidad_id').val(r.localidad_id)
            })    
        })
        edit = true
        btnGrabar.disabled = false
    })

    //Funcionalidad del botón de Grabar
    btnGrabar.addEventListener('click', e => {
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = ''
            let editar = 'mod_repa/procesos/hojaRuta/hojaRuta_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        limpieza()
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
        }
    })

    btnPrefiltro.addEventListener('click', e =>{
        e.preventDefault()

    })
    
    //Funcionalidad del botón de Cancelar
    btnCancelar.addEventListener('click', e => {
        e.preventDefault()
        limpieza()
    })
})()