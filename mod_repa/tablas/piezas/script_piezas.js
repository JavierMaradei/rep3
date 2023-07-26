(function iniciarProductos(){
    let formulario          = document.querySelector('#formPiezas')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnGrabaPieza    = document.querySelector('#btnGrabaPieza')//Captura de boton grabar
    let btnEliminaPieza  = document.querySelector('#btnEliminaPieza')//Captura de boton eliminar
    let btnCancelaPieza  = document.querySelector('#btnCancelaPieza')//Captura de boton cancelar
    let piezaCodigo      = document.querySelector('#piezaCodigo')
    let piezaDescripcion = document.querySelector('#piezaDescripcion')
    let piezaCosto       = document.querySelector('#piezaCosto')
    let piezaMarca       = document.querySelector('#piezaMarca')//Captura de boton cancelar
    let piezaFamilia     = document.querySelector('#piezaFamilia')//Captura de boton cancelar
    let piezaSubirFoto   = document.querySelector('#piezaSubirFoto')
    let piezaImagen      = document.querySelector('#piezaImagen')
    let edit                = false//flag de edición de registro existente o nuevo registro
    let id                  = ''
    let arrayVal = {
        piezaId             : {},
        piezaCodigo         : {required: true, maxlength: 30, validated: true},
        piezaRef            : {required: false, maxlength: 20, validated: true},
        piezaMarca          : {required: true, validated: true, noCero: true},
        piezaDescripcion    : {required: true, maxlength: 100, validated: true},
        piezaCosto          : {maxlength: 21, validated: true},
        piezaSubirFoto      : {maxlength: 100},
        piezaActivo         : {validated: true}
    }

    limitaCaracteres(piezaCodigo, 30)
    limitaCaracteres(piezaDescripcion, 100)
    limitaCaracteres(piezaCosto, 10)
    cargaMarcas(piezaMarca)
    piezaActivo.checked = true
    $(btnEliminaPieza).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    //Declaración del complemento DataTable
    let tabla = $('#tabla_piezas').DataTable( {
        "ajax": {
            url: 'mod_repa/tablas/piezas/piezas_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "pieza_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    }, 
            },
            {"data" : "codigo"},
            {"data" : "referencia"},
            {"data" : "descripcion"},
            {"data" : "marca"},
            {"data" : "costo"},
            {"data" : "activo"}
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
            {extend: 'excel', title: 'Lista de Piezas', text: 'Exportar a Excel'}  
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
        }
    })
    
    //Tomo el link de la tabla con el ID del registro
    $(document).on('click', '.task-item', (e) => {
        e.preventDefault()
        cleanInputs(inputs)
        id= e.target.innerText
        url = 'mod_repa/tablas/piezas/piezas_single.php'
        showDataReloaded(id, url, inputs).then((r) => {
            if(r.piezaImagen != ''){
                piezaImagen.src = `mod_repa/tablas/piezas/adjuntos/${r.piezaImagen}`
            } else {
                piezaImagen.src = '../../hdn/img/sinImagen.png'
            }
        })
        $(btnEliminaPieza).show()
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaPieza.addEventListener('click', e => {
        e.preventDefault()
        
        let validacion = validateData(inputs, arrayVal)
        
        if(validacion){
            collectData(inputs, formData)
            formData.append('archivoAdjunto', piezaSubirFoto.files[0])

            let agregar = 'mod_repa/tablas/piezas/piezas_add.php'
            let editar = 'mod_repa/tablas/piezas/piezas_edit.php'

            let estado = enviarData(agregar, editar, formData, edit, id)
            
            estado.then((respuesta) => {
                switch (respuesta.estado) {

                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaPieza).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        formData.delete('archivoAdjunto')
                        piezaActivo.checked = true
                        piezaImagen.src = '../../hdn/img/sinImagen.png'
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

                    case 'Error adjunto':
                        swal({
                            title   : "Error :( !",
                            text    : respuesta.msgError+' (Formatos permitidos: pdf, png y jpg.)',
                            type    : "error",
                        });
                        cleanFormData(inputs, formData)
                        formData.delete('archivoAdjunto')
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
    btnEliminaPieza.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url2 = 'mod_repa/tablas/piezas/piezas_use.php?id='+id
        xhr2.open('GET', url2)
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta = JSON.parse(xhr2.response)
                if(respuesta == ''){
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
                            let url = 'mod_repa/tablas/piezas/piezas_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){ 
                                    let respuesta = JSON.parse(xhr.response)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
                                            tabla.ajax.reload();
                                            $(btnEliminaPieza).hide()
                                            cleanInputs(inputs)
                                            cleanFormData(inputs, formData)
                                            piezaActivo.checked = true
                                            id = ''
                                            edit = false
                                            piezaImagen.src = '../../hdn/img/sinImagen.png'
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
    btnCancelaPieza.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        edit = false
        $(btnEliminaPieza).hide()
        piezaActivo.checked = true
        id = ''
        piezaImagen.src = '../../hdn/img/sinImagen.png'
    })
})()