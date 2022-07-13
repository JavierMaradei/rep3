(function iniciarLugaresRecepcion(){
    let formulario                  = document.querySelector('#formLugaresRecepcion')//Captura del formulario
    let inputs                      = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                    = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnGrabaLugaresRecepcion    = document.querySelector('#btnGrabaLugaresRecepcion')//Captura de boton grabar
    let btnEliminaLugaresRecepcion  = document.querySelector('#btnEliminaLugaresRecepcion')//Captura de boton eliminar
    let btnCancelaLugaresRecepcion  = document.querySelector('#btnCancelaLugaresRecepcion')//Captura de boton cancelar
    let activoLugaresRecepcion      = document.querySelector('#activoLugaresRecepcion')//Captura de boton cancelar
    let demoraLugaresRecepcion      = document.querySelector('#demoraLugaresRecepcion')

    soloNumeros(demoraLugaresRecepcion)
    
    let edit                        = false//flag de edición de registro existente o nuevo registro
    let id                          = ''
    let arrayVal = {
        idLugaresRecepcion          : {readonly : true},
        descripcionLugaresRecepcion : {required: true, maxlength: 50, validated: true},
        demoraLugaresRecepcion      : {maxlength: 3, validated: true},
        activoLugaresRecepcion      : {},
        fleteLugaresRecepcion       : {}
    }
    
    $(btnEliminaLugaresRecepcion).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    //Declaración del complemento DataTable
    let tabla = $('#tabla_lugaresRecepcion').DataTable( {
        "ajax": {
            url: 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "lugar_recepcion_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    }, 
            },
            {"data" : "descripcion"},
            {"data" : "dias_demora"},
            {"data" : "activo"},
            {"data" : "flete"}
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
            {extend: 'excel', title: 'Lista de lugares de recepcion', text: 'Exportar a Excel'}
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
        url = 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_single.php'
        showData(id, url, inputs)
        $(btnEliminaLugaresRecepcion).show()
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaLugaresRecepcion.addEventListener('click', e => {
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_add.php'
            let editar = 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaLugaresRecepcion).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        activoLugaresRecepcion.checked = true
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
        }
    })
    
    //Funcionalidad del botón de Eliminar
    btnEliminaLugaresRecepcion.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url2 = 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_use.php?id='+id
        xhr2.open('GET', url2)
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta2 = JSON.parse(xhr2.response)
                if(respuesta2 == ''){
                    swal({
                        title: "Estás seguro?",
                        text: "Si lo eliminas, el registro no podrá ser recuperado!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si, eliminar!",
                        cancelButtonText: "No, Cancelar!",
                        closeOnConfirm: false,
                        closeOnCancel: false },
                    function (isConfirm) {
                        if (isConfirm) {
                            let xhr = new XMLHttpRequest
                            let url = 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){ 
                                    let respuesta = JSON.parse(xhr.response)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
                                            tabla.ajax.reload();
                                            $(btnEliminaLugaresRecepcion).hide()
                                            cleanInputs(inputs)
                                            cleanFormData(inputs, formData)
                                            activoLugaresRecepcion.checked = true
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
                                }
                            }) 
                        } else {
                            msgCancelado()
                        }
                    });
                } else {
                    swal("Cancelado", "El registro no se puede eliminar porque se encuentra en uso", "error");
                }
            }
        })
    })
    
    //Funcionalidad del botón de Cancelar
    btnCancelaLugaresRecepcion.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        activoLugaresRecepcion.checked = true
        edit = false
        $(btnEliminaLugaresRecepcion).hide()
        id = ''
    })
})()