(() =>{
    let formulario          = document.querySelector('#inputsAnularResolucion')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let orden               = document.querySelector('#orden')
    let fechaRecepcion      = document.querySelector('#fechaRecepcion')
    let estado              = document.querySelector('#estado')
    let idCliente           = document.querySelector('#idCliente')
    let cliente             = document.querySelector('#cliente')
    let producto            = document.querySelector('#producto')
    let serie               = document.querySelector('#serie')
    let formaResolucion     = document.querySelector('#formaResolucion')
    let costoFicha          = document.querySelector('#costoFicha')
    let usuarioCierre       = document.querySelector('#usuarioCierre')
    let btnCancelar         = document.querySelector('#btnCancelar') 
    let btnAnularResolucion = document.querySelector('#btnAnularResolucion') 
    let reparacionId        = ''
    let arrayVal    = {
        orden               : {required: true, validated: 'numeric', maxlength: 6},
        fechaRecepcion      : {},
        estado              : {},
        idCliente           : {},
        cliente             : {},
        producto            : {},
        serie               : {},
        formaResolucion     : {},
        costoFicha          : {},
        usuarioCierre       : {}
    }

    soloNumeros(orden)
    estadosDeReparacion(estado)
    cargaFormasDeRetiro(formaResolucion, 'S')
    cargaEmisores(usuarioCierre)

    function limpieza(){
        cleanInputs(inputs)
        formaResolucion.value   = '0'
        usuarioCierre.value     = '0'
        reparacionId            = ''
    }

    orden.addEventListener('keyup', e =>{
        e.preventDefault()
        if(e.keyCode === 13){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/querys/reparaciones_single.php?orden='+orden.value)
            xhr.send()
            xhr.addEventListener('load', ()=>{
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)

                    if(respuesta.reparacion_id == ''){
                        swal('Atención', 'Nro de orden inexistente', 'warning')
                    } else {
                        if(respuesta.finalizado == 'N'){
                            swal('Atención', 'La orden no se encuentra cerrada', 'warning')
                            limpieza()
                        } else if (respuesta.anulado == 'S'){
                            swal('Atención', 'La orden se encuentra anulada', 'warning')
                            limpieza()
                        } else{
                            fechaRecepcion.value    = respuesta.fechaRecepcionFinal
                            estado.value            = respuesta.estado_id
                            idCliente.value         = respuesta.cliente_id
                            cliente.value           = respuesta.cliente_completo
                            producto.value          = respuesta.producto_codigo+' - '+respuesta.producto_descripcion
                            serie.value             = respuesta.nro_serie
                            formaResolucion.value   = respuesta.forma_retiro_id
                            costoFicha.value        = respuesta.costo
                            usuarioCierre.value     = respuesta.finalizador_id
                            reparacionId            = respuesta.reparacion_id
                        }
                    }
                }
            })
        }
    })

    btnAnularResolucion.addEventListener('click', e =>{
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)

        if(validacion){
            swal({
                title               : "Confirma la grabación?",
                type                : "warning",
                showCancelButton    : true,
                confirmButtonColor  : "#DD6B55",
                confirmButtonText   : "Si, confirmar!",
                cancelButtonText    : "No, Cancelar!",
                closeOnConfirm      : false,
                closeOnCancel       : false },
    
                function (isConfirm) {
                    if (isConfirm) {
                        let btnAceptarSwal      = document.querySelector('.confirm')
                        btnAceptarSwal.disabled = true
                        collectData(inputs, formData)//Recolecto los datos
                        formData.append('reparacionId', reparacionId)
                        let xhr = new XMLHttpRequest
                        xhr.open('POST', 'mod_repa/procesos/anularResolucion/anularResolucion_edit.php')//Envío la información del filtro
                        xhr.send(formData)
                        xhr.addEventListener('load', ()=> {
                            if (xhr.status == 200){
                                let respuesta = JSON.parse(xhr.response)
                                formData.delete('reparacionId')
                                btnAceptarSwal.disabled = false
                                switch (respuesta.estado) {
                                    case 'ok':
                                        msgTransaccionExitosa()
                                        cleanFormData(inputs, formData)
                                        limpieza()
                                        break;
                                    case 'Sesión expirada':
                                        sesionExpiradaMensajeFlotante()
                                        break;
                                    case 'Error perfil':
                                        msgErrorPerfil()
                                        cleanFormData(inputs, formData)
                                        break;
                                    case 'errOrden':
                                        swal('Atención', 'Ingrese una orden y presione la tecla enter para cargar la información', 'warning')
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
                }
            )                    
        }
    })

    btnCancelar.addEventListener('click', e =>{
        e.preventDefault()
        limpieza()
    })

})()