(() =>{
    let formulario      = document.querySelector('#inputsAnularOrden')//Captura del formulario
    let inputs          = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData        = new FormData() //Creo el formData para transferencia de información con el Backend
    let orden           = document.querySelector('#orden')
    let estado          = document.querySelector('#estado')
    let motivo          = document.querySelector('#motivo') 
    let btnCancelar     = document.querySelector('#btnCancelar') 
    let btnAnularOrden  = document.querySelector('#btnAnularOrden') 
    let reparacionId    = ''
    let arrayVal    = {
        orden           : {required: true, validated: 'numeric', maxlength: 6},
        fechaRecepcion  : {},
        estado          : {},
        idCliente       : {},
        cliente         : {},
        producto        : {},
        serie           : {},
        motivo          : {required: true}
    }

    soloNumeros(orden)
    cargaMotivosAnulacion(motivo, 'S')
    estadosDeReparacion(estado)

    function limpieza(){
        cleanInputs(inputs)
    }

    function cargaDataOrden(orden){
        reparacionId = ''
        let xhr3 = new XMLHttpRequest
        xhr3.open('GET', 'mod_repa/querys/reparaciones_single.php?orden='+orden)
        xhr3.send()
        xhr3.addEventListener('load', ()=>{
            if(xhr3.status == 200){
                let respuesta3 = JSON.parse(xhr3.response)
                $('#fechaRecepcion').val(respuesta3.fechaRecepcionFinal);
                $('#estado').val(respuesta3.estado_id);
                $('#idCliente').val(respuesta3.cliente_id);
                $('#cliente').val( respuesta3.cliente_completo);
                $('#producto').val(respuesta3.producto_codigo+' - '+respuesta3.producto_descripcion);
                $('#serie').val(respuesta3.nro_serie);
                reparacionId = respuesta3.reparacion_id;
            }
        })
    }

    orden.addEventListener('keyup', e =>{
        e.preventDefault()
        if(e.keyCode === 13){
            let xhr5 = new XMLHttpRequest
            xhr5.open('GET', 'mod_repa/querys/reparaciones_single.php?orden='+orden.value)
            xhr5.send()
            xhr5.addEventListener('load', ()=>{
                if(xhr5.status == 200){
                    let respuesta5 = JSON.parse(xhr5.response)
                    if(respuesta5.reparacion_id == ''){
                        swal('Atención', 'Nro de orden inexistente', 'warning')
                    } else {
                        let xhr = new XMLHttpRequest
                        xhr.open('GET', 'mod_repa/querys/ordenesAnuladas_search.php?orden='+orden.value)
                        xhr.send()
                        xhr.addEventListener('load', ()=>{
                            if(xhr.status == 200){
                                let respuesta = JSON.parse(xhr.response)
                                if(respuesta.anulado == 'S'){
                                    swal('Atención', 'Orden anulada anteriormente :(', 'warning')
                                    cleanInputs(inputs)
                                } else {
                                    let xhr2 = new XMLHttpRequest
                                    xhr2.open('GET', 'mod_repa/querys/perfil_search.php')
                                    xhr2.send()
                                    xhr2.addEventListener('load', ()=>{
                                        if(xhr2.status == 200){
                                            let respuesta2 = JSON.parse(xhr2.response)
                                            if(respuesta2.perfil_id == '1'){
                                                cargaDataOrden(orden.value)
                                            } else {
                                                let xhr4 = new XMLHttpRequest
                                                xhr4.open('GET', 'mod_repa/querys/ordenDiagnosticada_search.php?orden='+orden.value)
                                                xhr4.send()
                                                xhr4.addEventListener('load', ()=>{
                                                    if(xhr4.status == 200){
                                                        let respuesta4 = JSON.parse(xhr4.response)
                                                        if(respuesta4.reparacion_id == '' || respuesta4.reparacion_id == undefined){
                                                            cargaDataOrden(orden.value)
                                                        } else {
                                                            swal('Atención', 'Orden con diagnostico, no se puede anular. En caso de ser necesario enviar un email a soporte', 'warning')
                                                            cleanInputs(inputs)                        
                                                        }
                                                    }
                                                })        
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })

        }
    })

    btnAnularOrden.addEventListener('click', e =>{
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
                        xhr.open('POST', 'mod_repa/procesos/anularOrden/anularOrden_edit.php')//Envío la información del filtro
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