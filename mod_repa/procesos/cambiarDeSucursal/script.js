(() =>{
    let formulario      = document.querySelector('#inputsCambiarDeSucursal')//Captura del formulario
    let inputs          = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData        = new FormData() //Creo el formData para transferencia de información con el Backend
    let orden           = document.querySelector('#orden')
    let fechaRecepcion  = document.querySelector('#fechaRecepcion')
    let sucursalOrden   = document.querySelector('#sucursalOrden')
    let estado          = document.querySelector('#estado')
    let idCliente       = document.querySelector('#idCliente')
    let cliente         = document.querySelector('#cliente')
    let producto        = document.querySelector('#producto')
    let serie           = document.querySelector('#serie')
    let sucursal        = document.querySelector('#sucursal') 
    let remitoSucursal  = document.querySelector('#remitoSucursal') 
    let btnCancelar     = document.querySelector('#btnCancelar') 
    let btnGrabar       = document.querySelector('#btnGrabar') 
    let reparacionId    = ''
    let sucursalOrigen  = ''
    let arrayVal    = {
        orden           : {required: true, validated: 'numeric', maxlength: 6},
        fechaRecepcion  : {},
        sucursalOrden   : {},
        estado          : {},
        idCliente       : {},
        cliente         : {},
        producto        : {},
        serie           : {},
        sucursal        : {required: true},
        remitoSucursal  : {required: false, validated: true, maxlength: 45}
    }

    soloNumeros(orden)
    limitaCaracteres(remitoSucursal, 45)
    cargaSucursales(sucursalOrden)
    cargaSucursales(sucursal, 'N')
    estadosDeReparacion(estado)

    function limpieza(){
        cleanInputs(inputs)
        sucursalOrden.value = '0'
        sucursal.value      = '2'
        reparacionId        = ''
        sucursalOrigen      = ''
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
                        limpieza()
                    } else {
                        if(respuesta.anulado == 'S'){
                            swal('Atención', 'Orden anulada', 'warning')
                            limpieza()
                        } else {
                            if(respuesta.estado_id == '7'){
                                swal('Atención', 'La orden ya fue entregada', 'warning')
                                limpieza()
                            } else {
                                fechaRecepcion.value    = respuesta.fechaRecepcionFinal
                                sucursalOrden.value     = respuesta.sucursal_id
                                estado.value            = respuesta.estado_id
                                idCliente.value         = respuesta.cliente_id
                                cliente.value           = respuesta.cliente_completo
                                producto.value          = respuesta.producto_codigo+' - '+respuesta.producto_descripcion
                                serie.value             = respuesta.nro_serie
                                reparacionId            = respuesta.reparacion_id
                                sucursalOrigen          = respuesta.sucursal_id
    
                            }
                        }
                    }
                }
            })
        }
    })

    btnGrabar.addEventListener('click', e =>{
        e.preventDefault()
        if(sucursalOrigen == sucursal.value){
            swal('Atención', 'La sucursal de origen no puede ser la misma que la sucursal de destino', 'warning')
        } else {
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
                            xhr.open('POST', 'mod_repa/procesos/cambiarDeSucursal/cambiarDeSucursal_edit.php')//Envío la información del filtro
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
        }
    })

    btnCancelar.addEventListener('click', e =>{
        e.preventDefault()
        limpieza()
    })

})()