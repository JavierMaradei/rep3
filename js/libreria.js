//---------------------LIBRERÍA DE FUNCIONES JS---------------------//

//Se define constante para determinar la cantidad de caractéres del campo Código.
const CODIGO_LENGTH = 12;

/**
 * Mostrar datos del ID seleccionado. Esta función se utiliza para mostrar la data de los campos en los ABM.
 * @param {string} id
 * @param {string} ruta
 * @param {array} entradas
 * @version 1.0
 */
 function showData(id, ruta, entradas){
    let xhr = new XMLHttpRequest
    xhr.open('GET', ruta+'?id='+id)
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            if (Object.entries(respuesta).length === 0) {
                edit = false
                cleanInputs(entradas)
            } else {
                edit = true
                respuesta = respuesta[0]
                for (let [key, value] of Object.entries(respuesta)) {
                    if(value != null){//Algunos datos vienen en null y tira error al hacer el matcheo
                        if(value.match(/([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/)){
                            //SI el formato del valor de respesta cumple esta condicion yyyy/mm/dd entro acá
                            let date = value.replace('/','-')
                            date = date.replace('/','-')
                            $('#'+key).val(date)
                        } else {//sino caigo al switch
                            switch (value) {
                                case 'S':
                                    $('#'+key).prop("checked", true)
                                    break;
                                case 'N':
                                    $('#'+key).prop("checked", false)
                                    break;
                                default:
                                    $('#'+key).val(value)
                                    break;
                            }
                        }
                    }
                }
            }
        }
    })
}

/**
 * Mostrar datos del ID seleccionado. Esta función se utiliza para mostrar la data de los campos en los ABM.
 * @param {string} id
 * @param {string} ruta
 * @param {array} entradas
 * @version 2.0 de showdata
 */
 function showDataReloaded(id, ruta, entradas){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', ruta+'?id='+id)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                if (Object.entries(respuesta).length === 0) {
                    edit = false
                    cleanInputs(entradas)
                } else {
                    edit = true
                    respuesta = respuesta[0]
                    resolve(respuesta)
                    for (let [key, value] of Object.entries(respuesta)) {
                        if(value != null && typeof value != 'object'){//Algunos datos vienen en null y tira error al hacer el matcheo
                            if(value.match(/([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/)){
                                //SI el formato del valor de respesta cumple esta condicion yyyy/mm/dd entro acá
                                let date = value.replace('/','-')
                                date = date.replace('/','-')
                                $('#'+key).val(date)
                            } else {//sino caigo al switch
                                switch (value) {
                                    case 'S':
                                        $('#'+key).prop("checked", true)
                                        break;
                                    case 'N':
                                        $('#'+key).prop("checked", false)
                                        break;
                                    default:
                                        $('#'+key).val(value)
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        })
    })
}

function dataGeneral(){
    let sideBar                     = document.querySelector('#root')
    let lugarRecepcionFicha         = document.querySelector('#lugarRecepcionFicha')
    let sucursalRecepcionFicha      = document.querySelector('#sucursalRecepcionFicha')
    let tecnicoFicha                = document.querySelector('#tecnicoFicha')
    let emisorFicha                 = document.querySelector('#emisorFicha')
    let presupuestadorFicha         = document.querySelector('#presupuestadorFicha')
    let familiaProductoFicha        = document.querySelector('#familiaProductoFicha')
    let marcaProductoFicha          = document.querySelector('#marcaProductoFicha')
    let estadoFicha                 = document.querySelector('#estadoFicha')
    let estanteFicha                = document.querySelector('#estanteFicha')
    let diagnosticadorFicha         = document.querySelector('#diagnosticadorFicha')
    let reparadorFicha              = document.querySelector('#reparadorFicha')
    let embaladorFicha              = document.querySelector('#embaladorFicha')
    let reparadorFichaDiagnostico   = document.querySelector('#reparadorFichaDiagnostico')
    let cerrarSidebar               = document.querySelector('#cerrarSidebar')
    let solapaDatosFicha            = document.querySelector('#solapaDatosFicha')
    let solapaFichaTecnica          = document.querySelector('#solapaFichaTecnica')
    let navDatos                    = document.querySelector('#nav-datos')
    let navFicha                    = document.querySelector('#nav-ficha')
    let navCerrar                   = document.querySelector('#nav-cerrar')
    let bodySolapa2                 = document.querySelector('#bodySolapa2')
    let productoImagenDespiece      = document.querySelector('#productoImagenDespiece')
    let btnCancelarFicha            = document.querySelector('#btnCancelarFicha')
    let formaResolucionFicha        = document.querySelector('#formaResolucionFicha')
    let codigoProductoCanje         = document.querySelector('#codigoProductoCanje')
    let descripcionProductoCanje    = document.querySelector('#descripcionProductoCanje')
    let usuarioCierreFicha          = document.querySelector('#usuarioCierreFicha')
    
    btnCancelarFicha.addEventListener('click', e =>{
        e.preventDefault()
        sideBar.classList.remove("sb--show")
    })

    cerrarSidebar.addEventListener('click', e => {
        e.preventDefault()
        sideBar.classList.remove("sb--show")
    })

    $(document).on('click', '.reparacion-item', (e) => {
        e.preventDefault()
        id = e.target.innerText     
        bodySolapa2.innerHTML = ''               
        navCerrar.classList.remove("active")
        navCerrar.classList.remove("show")

        navFicha.classList.remove("active")
        navFicha.classList.remove("show")

        navDatos.classList.add("active")
        navDatos.classList.add("show")

        cerrarSidebar.classList.remove("active")
        cerrarSidebar.ariaSelected = "false"

        solapaFichaTecnica.classList.remove("active")
        solapaFichaTecnica.ariaSelected = "false"

        solapaDatosFicha.classList.add("active")
        solapaDatosFicha.ariaSelected = "true"

        $('#divDatosCliente').hide()
        $('#divDatosCanje').hide()
        $('#divMonitorEmbalaje').hide()
        $('#divMonitorResolucion').hide()
        $('#divMonitorDiagnostico').hide()
        $('#divMonitorPresupuesto').hide()
        $('#precioDespiece').hide()
        $('#subTotalDespiece').hide()
        $('#totalTabla').hide()
        $('#btnEnviarFicha').hide()
        
        //console.log(e.target.innerText)
        cargaFormasDeRetiro(formaResolucionFicha, 'N').then(() =>{
            cargaLugaresRecepcion(lugarRecepcionFicha).then(() => {
                cargaSucursales(sucursalRecepcionFicha).then(() => {
                    cargaTecnicosFicha(tecnicoFicha).then(() => {
                        cargaEmisores(presupuestadorFicha).then(() => {
                            cargaEmisores(emisorFicha).then(() => {
                                cargaEmisores(usuarioCierreFicha).then(() => {
                                    cargaFamilias(familiaProductoFicha).then(() => {
                                        cargaMarcas(marcaProductoFicha).then(() => {
                                            estadosDeReparacion(estadoFicha).then(() => {
                                                estanteList(estanteFicha).then(() => {
                                                    cargaDiagnosticadores(diagnosticadorFicha).then(() => {
                                                        cargaReparadores(reparadorFicha).then(() => {
                                                            cargaEmbaladores(embaladorFicha).then(() => {
                                                                cargaReparadoresActivos(reparadorFichaDiagnostico).then(() => {
                                                                    datosFichaSolapa1(e.target.innerText).then((respuestaSolapa1) =>{ 
                                                                        tipoIngreso = respuestaSolapa1.tipo_ingreso
                                                                        if(respuestaSolapa1.datosCanje != ''){
                                                                            $('#divDatosCanje').show()
                                                                            codigoProductoCanje.value         = respuestaSolapa1.datosCanje.codigoProdCanje
                                                                            descripcionProductoCanje.value    = respuestaSolapa1.datosCanje.descProdCanje
                                                                        } else {
                                                                            $('#divDatosCanje').hide()
                                                                            codigoProductoCanje.value         = respuestaSolapa1.datosCanje.codigoProdCanje
                                                                            descripcionProductoCanje.value    = respuestaSolapa1.datosCanje.descProdCanje
                                                                        }
                                                                        despieceDiagnostico(id, respuestaSolapa1.producto_id).then((respuestaDespieceDiagnostico) =>{
                                                                            if(respuestaDespieceDiagnostico.productoImagenDespiece != ''){
                                                                                productoImagenDespiece.src = `mod_repa/tablas/productos/adjuntos/${respuestaDespieceDiagnostico.productoImagenDespiece}`
                                                                            } else {
                                                                                productoImagenDespiece.src = '../../hdn/img/sinImagen.png'
                                                                            }
                                                                            let template = ''
                                                                            if(respuestaSolapa1.estado_id > '2'){
                                                                                if(respuestaSolapa1.tipo_ingreso == 'C'){
                                                                                    template += `
                                                                                        <tr class="text-center">
                                                                                            <td colspan="6">Orden de tipo plan canje, no posee diagnóstico.</td>
                                                                                        </tr>
                                                                                    `
                                                                                    bodySolapa2.innerHTML = template
            
                                                                                    totalTabla.innerText = ""
                                                                                } else {
                                                                                    if(respuestaDespieceDiagnostico.despiece.length > 0){
                                                                                        respuestaDespieceDiagnostico.despiece.forEach(element => {
                                                                                            template += `
                                                                                                <tr>
                                                                                                    <td>${element.referencia}</td>
                                                                                                    <td>${element.codigo}</td>
                                                                                                    <td>${element.descripcion}</td>
                                                                                                    <td>${element.cantidad}</td>
                                                                                                    <td></td>
                                                                                                    <td></td>
                                                                                                </tr>
                                                                                            ` 
                                                                                        });
                    
                                                                                        bodySolapa2.innerHTML = template
                                                                                    } 
                                                                                } 
                                                                            } else {
                                                                                template += `
                                                                                    <tr class="text-center">
                                                                                        <td colspan="6">La orden aún no cuenta con un diagnóstico.</td>
                                                                                    </tr>
                                                                                `
                                                                                bodySolapa2.innerHTML = template
        
                                                                                totalTabla.innerText = ""
                                                                            }                                                                  
                                                                        })                                                          
                                                                    })   
                                                                })                                              
                                                            }) 
                                                        }) 
                                                    })  
                                                }) 
                                            }) 
                                        })
                                    })    
                                })
                            })
                        })
                    })
                })
            })
        })    

        sideBar.classList.add("sb--show")

    })

    let btnGrabar           = document.querySelector('#btnEnviarFicha')
    btnGrabar.addEventListener('click', e => {
        e.preventDefault()
        swal({
            title               : "Confirma la grabación?",
            type                : "warning",
            showCancelButton    : true,
            confirmButtonColor  : "#DD6B55",
            confirmButtonText   : "Si, confirmar!",
            cancelButtonText    : "No, Cancelar!",
            closeOnConfirm      : true,
            closeOnCancel       : true
            },

            function (isConfirm) {
                if (isConfirm) {
                    let btnAceptarSwal          = document.querySelector('.confirm')
                    btnAceptarSwal.disabled     = true
                    btnGrabar.disabled          = true
                    formData.append('orden', id)
    
                    //envia data al back
                    let xhr = new XMLHttpRequest
                    xhr.open('POST', 'mod_repa/procesos/reparacion/reparacion_edit.php')
                    xhr.send(formData)
                    xhr.addEventListener('load', () => {
                        if(xhr.status == 200){
                            let respuesta = JSON.parse(xhr.response)
                            btnAceptarSwal.disabled     = false
                            btnGrabar.disabled          = false        
                            formData.delete('orden')
    
                            switch (respuesta.estado) {
                                case 'ok':
                                    setTimeout(() => {
                                        msgTransaccionExitosa()
                                    }, 500);
                                    sideBar.classList.remove("sb--show")
                                    tabla.ajax.reload()
                                    break;
                                case 'Sesión expirada':
                                    sesionExpiradaMensajeFlotante()
                                    break;
                                case 'Error perfil':
                                    msgErrorPerfil()
                                    break;                        
                                default:
                                    msgAlgoNoFueBien()
                                    break;
                            }
                        }
                    })
                }
            }
        )
    })
}

/**
 * Carga de información para los pedidos de domicilio cliente
 * @param {string} campo
 * @param {string} activo
 */
function cargaDataDomicilio(idPedido) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/querys/clienteHistorial_single.php?id='+idPedido)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            }
        })
    })
}

/**
 * Limpiar inputs
 * @param {array} entradas
 * @version 1.0
 */
function cleanInputs(entradas){
    entradas.forEach(input => {
        if(input.type == "radio" || input.type == "checkbox"){
            input.checked = false
        } else {
            input.value = ''
        }
    })
    let p = document.querySelectorAll('.validacion')//Limpio los mensajes de error
    p.forEach(mensaje => {
        mensaje.remove()
    })
}

/**
 * Recolección de datos de Formulario
 * @param {Array} entradas
 * @returns {array}
 * @version 1.0
 */
function collectData(entradas, formData) {
    entradas.forEach(input => {
        if(input.type == "radio" || input.type == "checkbox"){
            formData.append(`${input.id}`, input.checked)
        } else {
            let valor = input.value.trim()
            formData.append(`${input.id}`, valor)
        }
    })
    return formData
}

/**
 * Envía datos del Formulario
 * @param {string} agregar
 * @param {string} editar
 * @param {array} data
 * @param {boolean} valorEdit
 * @param {id} id //id para editar un registro
 * @version 1.0
 */
function sendData(agregar, editar, data, valorEdit, id){
    let xhr = new XMLHttpRequest
    let url = valorEdit == false ? agregar : editar+'?id='+id
    xhr.open('POST', url, false)
    xhr.send(data)
    return xhr.status
}

/**
 * Envía datos del Formulario
 * @param {string} agregar
 * @param {string} editar
 * @param {array} data
 * @param {boolean} valorEdit
 * @param {id} id //id para editar un registro
 * @version 1.0
 */
function enviarData(agregar, editar, data, valorEdit, id){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        let url = valorEdit == false ? agregar : editar+'?id='+id
        xhr.open('POST', url)
        xhr.send(data)
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}


/**
 * Limpio FormData
 * @param {array} entradas
 * @param {string} formData
 * @version 1.0
 */
function cleanFormData(entradas, formData){
    entradas.forEach(input => {
        formData.delete(input.id)
    })
}

/**
 * Validar datos
 * Toma dos parámetros: Entradas, array con los inputs. Validacion, donde se definen los puntos a validar.
 * El formato de array de validacion es array={idDelInput:{propiedad:valor}}
 * @param {array} entradas
 * @param {array} validacion
 * @return {boolean}
 * @version 1.0
 */
function validateData(entradas, validacion){
    let respuesta = []
    let contador = 0

    let p = document.querySelectorAll('.validacion')//Limpio los mensajes de error previos
    p.forEach(mensaje => {
        mensaje.remove()
    })
    entradas.forEach(input => {
        let campo = document.querySelector('#'+input.id)
        let id = input.id
        let valor = input.value.trim()

        for (let [key, value] of Object.entries(validacion[id])){
            switch (key) {
                case 'validated':
                    switch (value) {
                        case 'email':
                            if(valor.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || valor == ''){
                                respuesta.push(true)
                                //console.log("Validated email: "+respuesta)
                            } else {
                                respuesta.push(false)
                                //console.log("Validated email: "+respuesta)
                                let respRequired = document.createElement('p')
                                respRequired.className = "validacion"
                                respRequired.innerText = "El correo que cargaste no tiene un formato correcto"
                                campo.after(respRequired)
                            }
                            break;
                        case 'fecha':
                            if(valor.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g) || (valor == '')){
                                respuesta.push(true)
                                //console.log("Validé el campo")
                            } else {
                                respuesta.push(false)
                                //console.log("No validé el campo")
                                if(valor.length > 0){
                                    let respValidated = document.createElement('p')
                                    respValidated.className = "validacion"
                                    respValidated.innerText = "Este campo no corresponde con un formato de fecha válido"
                                    campo.after(respValidated)
                                }
                            }
                            break;
                        case 'codigo':
                            if(valor.match(/^([0-9]{4}-[0-9]{4})$/g) || (valor == '')){
                                respuesta.push(true)
                                //console.log("Validé el campo")
                            } else {
                                respuesta.push(false)
                                //console.log("No validé el campo")
                                if(valor.length > 0){
                                    let respValidated = document.createElement('p')
                                    respValidated.className = "validacion"
                                    respValidated.innerText = "Este campo no corresponde con un formato de código válido"
                                    campo.after(respValidated)
                                }
                            }
                            break;
                        case 'numeric':
                            if(valor.match(/^[0-9]+$/g) || valor == ''){
                                respuesta.push(true)
                                //console.log("Validated email: "+respuesta)
                            } else {
                                respuesta.push(false)
                                //console.log("Validated email: "+respuesta)
                                let respRequired = document.createElement('p')
                                respRequired.className = "validacion"
                                respRequired.innerText = "El campo solo admite números"
                                campo.after(respRequired)
                            }
                            break;
                        default:
                            if(value == true){
                                if(valor.match(/^[A-Z@a-zÀ-ÿ0-9_\s\.\+\-\/\(\)\ñ\Ñ\,\&\:\º\#\;\*]+$/g) || (valor == '')){
                                    respuesta.push(true)
                                    //console.log("Validé el campo")
                                } else {
                                    respuesta.push(false)
                                    //console.log("No validé el campo")
                                    if(valor.length > 0){
                                        let respValidated = document.createElement('p')
                                        respValidated.className = "validacion"
                                        respValidated.innerText = `Este campo no admite caracteres especiales, Caracteres bloqueantes: ¿,?,$,[,],%,',"`
                                        campo.after(respValidated)
                                    }
                                }
                            } else {
                                respuesta.push(true)
                            }
                            break;
                    }
                    break;
                case 'required':
                    if(value == true){
                        if(valor.length != 0){
                            respuesta.push(true)
                            //console.log("Required: "+respuesta)
                        } else {
                            respuesta.push(false)
                            //console.log("Required: "+respuesta)
                            let respRequired = document.createElement('p')
                            respRequired.className = "validacion"
                            respRequired.innerText = "Necesitamos algo mas de información"
                            campo.after(respRequired)
                        }
                    }
                    break;
                case 'readonly':
                    if(input.attributes.readonly){
                        respuesta.push(true)
                        //console.log("Readonly: "+respuesta)
                    } else {
                        respuesta.push(false)
                        //console.log("Readonly: "+respuesta)
                        let respReadonly = document.createElement('p')
                        respReadonly.className = "validacion"
                        respReadonly.innerText = "Sabemos lo que estás intentado hacer"
                        campo.after(respReadonly)
                    }
                    break;
                case 'maxlength':
                    if(valor.length <= value){
                        respuesta.push(true)
                        //console.log("Maxlength: "+respuesta)
                    } else {
                        respuesta.push("Maxlength: "+false)
                        //console.log(respuesta)
                        let respMaxlength = document.createElement('p')
                        respMaxlength.className = "validacion"
                        respMaxlength.innerText = "Superaste el máximo de "+value+" caracteres"
                        campo.after(respMaxlength)
                    }
                    break;
                case 'noCero':
                    if(value == true){
                        if(valor != '0'){
                            respuesta.push(true)
                            //console.log("Maxlength: "+respuesta)
                        } else {
                            respuesta.push("Cero: "+false)
                            //console.log(respuesta)
                            let respCero = document.createElement('p')
                            respCero.className = "validacion"
                            respCero.innerText = "Necesitamos algo mas de información"
                            campo.after(respCero)
                        }
                    }
                    break;
                default:
                    respuesta.push(true)
                    break;
            }
        }
    })

    respuesta.forEach(verif => {
        if(verif == true){
            contador++
        }
    })
    if(respuesta.length == contador){
        return true
    } else {
        alert("Verificá los campos requeridos :(")
        return false
    }
}

/**
 * Verifica si el equipo buscado está catalogado como conflictivo, la busqueda se realiza por nro de serie y por id de producto
 * @param {string} codigo
 * @param {string} nroSerie
 * @return {boolean}
 * @version 1.0
 */
function equipoConflictivo(codigo, nroSerie){
    let cod = codigo
    let nroSerieId = nroSerie

    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/busquedas/equipoConflictivo_search.php?codigo='+cod+'&nroSerie='+nroSerieId, false)
    xhr.send()
    let respuesta = JSON.parse(xhr.response)
    if(respuesta.length == 0){
        return false
    } else {
        return true
    }
}

/**
 * Busca las reparaciones previas del equipo
 * @param {string} codigo
 * @param {string} nroSerie
 * @return {object}
 * @version 1.0
 */
function equipoReincidencias(codigo, nroSerie){
    let cod = codigo
    let nro = nroSerie
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/busquedas/equipoReincidencias_search.php?codigo='+cod+'&nroSerie='+nro, false)
    xhr.send()
    return JSON.parse(xhr.response)
}

/**
 * Completa el valor de un campo con el string indicado como parámetro
 * @param {string} string
 * @param {string} campo
 */
function completeInput(string, campo){
    return (campo.innerHTML = string)
}

/**
 * Busca si el producto tiene faltante de repuestos
 * @param {string} codigoProducto
 */
function productoSinRepuestos(codigoProducto){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/buscadorProductosSinRepuestos.php?codigo='+codigoProducto)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga la plantilla de Detalle Ficha requerida, dependiendo del modelo de equipo seleccionado
 * @param {string} orden
 * @param {bool} lectura
 */
function cargaPlantillaFicha(orden, lectura = false){
    return new Promise(function(resolve, reject) {
        function soloLecturaFicha(){
            if(lectura){
                let formFichaDetalleReparacion = document.querySelector('#formFichaDetalleReparacion')
                let inputsPanelDetalle = formFichaDetalleReparacion.querySelectorAll('input,textarea,select')
                inputsPanelDetalle.forEach(element => {
                    if(element.type == "radio" || element.type == "checkbox" || element.type == "select-one"){
                        element.disabled = true
                    } else {
                        element.readOnly = true
                    }
                })
            }
        }
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/procesos/diagnostico/info_search.php?id='+orden)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                if(respuesta.length > 0){
                    let grupo = respuesta[0].grupo_id
                    $('#enviarFicha').val(grupo)
                    switch (grupo) {
                        case '1':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_electrobombas.php', () => {
                                soloLecturaFicha()
                            })
                            break;
                        case '2':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_sfl.php', () => {
                                //Cargo el select de Modelos Ficha
                                let xhr3 = new XMLHttpRequest
                                xhr3.open('GET', 'mod_sirep/admin/tablas/productos/modeloFicha_list.php')
                                xhr3.send()
                                xhr3.addEventListener('load', () => {
                                    if(xhr3.status == 200){
                                        let respuesta3 = JSON.parse(xhr3.response)
                                        let option3 = ''
                                        respuesta3.forEach(element => {
                                            option3 += `<option value= ${element.MODELO_ID}>${element.NOMBRE}</option>`
                                        });
                                        let select3 = document.querySelector('#fichaProducto')
                                        select3.innerHTML = option3
                                    }
                                })
                                soloLecturaFicha()
                            })
                            break;
                        case '3':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_press.php', () => {
                                //Cargo el select de Modelos Ficha
                                let xhr3 = new XMLHttpRequest
                                xhr3.open('GET', 'mod_sirep/admin/tablas/productos/modeloFicha_list.php')
                                xhr3.send()
                                xhr3.addEventListener('load', () => {
                                    if(xhr3.status == 200){
                                        let respuesta3 = JSON.parse(xhr3.response)
                                        let option3 = ''
                                        respuesta3.forEach(element => {
                                            option3 += `<option value= ${element.MODELO_ID}>${element.NOMBRE}</option>`
                                        });
                                        let select3 = document.querySelector('#fichaProducto')
                                        select3.innerHTML = option3
                                    }
                                })
                                soloLecturaFicha()
                            })
                            break;
                        case '4':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_gpr.php', () => {
                                soloLecturaFicha()
                            })
                            break;
                        case '5':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_control_automatico.php', () => {
                                soloLecturaFicha()
                            })
                            break;
                        default:
                            $('#fd').text('No hay registros de este grupo de equipos', () => {
                                soloLecturaFicha()
                            })
                            break;
                    }
                }
                resolve(respuesta[0])
            }
        })
    })
}

function busquedaPorProducto(modal, body, titulo){
    return new Promise(function(resolve, reject) {    
        $(modal).show()
        $(body).empty()
        $(titulo).text('Equipos')

        let template = ''
        template = `
            <div class="row">
                <form id="formModalEquipos">
                    <div class="row g-3">
                        <div class="form-group col-sm-4">
                            <label for="marcaProductoModal">Marca</label>
                            <select id="marcaProductoModal" class="form-control"></select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="familiaProductoModal">Familia</label>
                            <select id="familiaProductoModal" class="form-control"></select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="buscadorModal">Buscador</label>
                            <input id="buscadorModal" type="text" class="form-control">
                        </div>
                        <div class="form-group col-sm-12 text-center">
                            <button id="btnBuscarEquipo" type="button" class="btn btn-primary">Buscar
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Marca</th>
                                <th>Familia</th>
                            </thead>
                            <tbody id="modalBusquedaTabla"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        $(body).html(template)

        resolve()
    })

}

function enviarParametrosModal(marca, familia, buscador, idBodyTabla){
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_repa/tablas/productos/productosModal_search.php?marca='+marca+'&familia='+familia+'&buscador='+buscador)
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            let template = ''
            respuesta.forEach(element => {
                template += `
                    <tr>
                        <td><a class="product-item" href="${element.codigo}">${element.codigo}</td>
                        <td>${element.descripcion}</td>
                        <td>${element.marca}</td>
                        <td>${element.familia}</td>
                    </tr>
                `
            });

            idBodyTabla.innerHTML = template
        }
    })
}

/**
 * Muestra archivo Adjunto
 * @param {string} archivo
 */
function verImagenes(archivo, divFotos, eliminar = true){
    let nombreArchivo   = ''
    let template = ''

    if(archivo.length > 0){
        template += `<div class="col-md-12 mb-3" >
                        <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                            <h4 class="card-header bg-red text-white text-center"><i>Adjuntos</i></h4>
                            <div class="card-body">
                                <div class="row">
                    `
    
        archivo.forEach(element => {
            nombreArchivo   = 'mod_repa/procesos/diagnostico/adjuntos/'+element.descripcion
            template +=`
                <div class="file-box" style="width: 180px">
                    <a target="_blank" href="${nombreArchivo}">
                        <div class="file">
                            <div class="wordBreak text-center"> ${element.descripcionCorta}</div>
                            <div class="image" style="display: flex; align-items: center; justify-content: center; height: 30px;">
                                <i class="fa fa-paperclip fa-2x"></i>
                            </div>
                            <div class="file-name" id="${nombreArchivo}">
                                <div class="text-center">
            `
            if(eliminar){
                template += `
                                    <btn style="width: 100%" class="btn btn-info btn-xs btnEliminarFoto" value="${element.adjunto_id}">
                                        Eliminar
                                    </btn>
                `
            } else {
                template += `       <small>Click para ampliar</small>`
            }
            template +=`
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `
        });

        template += `
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    divFotos.innerHTML = template
}

/**
 * Carga los valores de la solapa 1 del detalle de la ficha (Ventana desplegable lateral)
 * @param {string} numero
 */
function datosFichaSolapa1(numero){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/querys/reparaciones_single.php?orden='+numero)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                if (Object.entries(respuesta).length === 0) {
                    cleanInputs(inputsFicha)
                } else {
                    $('#ordenFicha').val(respuesta.reparacion_id);
                    $('#lugarRecepcionFicha').val(respuesta.lugar_recepcion_id);
                    $('#sucursalRecepcionFicha').val(respuesta.sucursal_id);
                    $('#tecnicoFicha').val(respuesta.tecnico_id);
                    $('#emisorFicha').val(respuesta.usuario_id);
                    $('#fechaRecepcionFicha').val(respuesta.fechaRecepcionFinal);
                    respuesta.fdiagnostico  == '1900-01-01 00:00:00' ? $('#fechaDiagnosticoFicha').val('')      : $('#fechaDiagnosticoFicha').val(respuesta.fechaDiagnosticoFinal);
                    respuesta.freparacion   == '1900-01-01 00:00:00' ? $('#fechaReparacionFicha').val('')       : $('#fechaReparacionFicha').val(respuesta.fechaReparacionFinal);
                    respuesta.farmado       == '1900-01-01 00:00:00' ? $('#fechaArmoFicha').val('')             : $('#fechaArmoFicha').val(respuesta.fechaArmadoFinal);
                    respuesta.fembalaje     == '1900-01-01 00:00:00' ? $('#fechaEmbalajeFicha').val('')         : $('#fechaEmbalajeFicha').val(respuesta.fechaEmbalajeFinal);
                    respuesta.fresolucion   == '1900-01-01 00:00:00' ? $('#fechaCierreFicha').val('')           : $('#fechaCierreFicha').val(respuesta.fechaResolucionFinal);
                    respuesta.fresolucion   == '1900-01-01 00:00:00' ? $('#fechaCierreFichaResolucion').val('') : $('#fechaCierreFichaResolucion').val(respuesta.fechaResolucionFinal);
                    respuesta.fpresupuesto  == '1900-01-01 00:00:00' ? $('#fechaPresupuestoFicha').val('')      : $('#fechaPresupuestoFicha').val(respuesta.fechaPresupuestoFinal);
                    $('#clienteIdFicha').val(respuesta.cliente_id);
                    $('#clienteDireccionFicha').val('');
                    $('#clienteApellidoFicha').val(respuesta.cliente_apellido);
                    $('#clienteNombreFicha').val(respuesta.cliente_nombre);
                    $('#clienteTelCelFicha').val(respuesta.cliente_telefono+' - '+respuesta.cliente_celular);
                    $('#clienteEmailFicha').val(respuesta.cliente_email);
                    $('#tipoReparacionFicha').val(respuesta.tipo_ingreso);
                    $('#atencionFicha').val(respuesta.tipo_atencion);
                    respuesta.reclama_garantia  == 'S'  ? $('#garantiaFicha').val('Si') : $('#garantiaFicha').val('No');
                    respuesta.flete             == 'S'  ? $('#fleteFicha').val('Si')    : $('#fleteFicha').val('No');
                    respuesta.lugar_reparacion  == 'T'  ? $('#reparadoEnTaller').prop('checked', true) : $('#reparadoEnTaller').prop('checked', false);
                    respuesta.lugar_reparacion  == 'D'  ? $('#reparadoEnDomicilio').prop('checked', true) : $('#reparadoEnDomicilio').prop('checked', false);
                    $('#remitoClienteFicha').val(respuesta.remito_cliente);
                    $('#marcaProductoFicha').val(respuesta.producto_marca);
                    $('#familiaProductoFicha').val(respuesta.producto_familia);
                    $('#codigoProductoFicha').val(respuesta.producto_codigo);
                    $('#descripcionProductoFicha').val(respuesta.producto_descripcion);
                    //$('#productoFicha').val(respuesta.producto_codigo+' - '+respuesta.producto_descripcion);
                    $('#serieProductoFicha').val(respuesta.nro_serie);
                    $('#problemaProductoFicha').val(respuesta.problema);
                    $('#observacionesProductoFicha').val(respuesta.observaciones);
                    $('#estadoFicha').val(respuesta.estado_id);
                    $('#estanteFicha').val(respuesta.estante_id);
                    $('#detalleEmbalajeFicha').val(respuesta.reparacion_detalle);
                    $('#diagnosticadorFicha').val(respuesta.diagnosticador_id);
                    $('#reparadorFicha').val(respuesta.reparador_id);
                    $('#embaladorFicha').val(respuesta.embalador_id);
                    $('#usuarioCierreFicha').val(respuesta.finalizador_id);
                    $('#remitoResolucionFicha').val(respuesta.remito_despacho);
                    $('#tipoFichaPresupuesto').val(respuesta.tipo_ingreso);
                    $('#atencionFichaPresupuesto').val(respuesta.tipo_atencion);
                    $('#cargoFichaPresupuesto').val(respuesta.forma_retiro_id);
                    $('#cargoFichaResolucion').val(respuesta.forma_retiro_id);
                    $('#numeroFichaPresupuesto').val(respuesta.numero_presupuesto);
                    $('#observacionesFichaPresupuesto').val(respuesta.observaciones);
                    $('#presupuestadorFicha').val(respuesta.presupuestador_id);
                    $('#numeroPresupuestoFicha').val(respuesta.numero_presupuesto);
                    $('#cajonPresupuestoFicha').val(respuesta.cajon);
                    $('#costoFichaResolucion').val(respuesta.costo);
                    $('#costoFicha').val(respuesta.costo);
                    $('#formaResolucionFicha').val(respuesta.forma_retiro_id);
                    $('#detalleDiagnosticoFicha').val(respuesta.diagnostico_detalle);
                    $('#numeroRemitoCambioSucursalFicha').val(respuesta.remito_sucursal);
                    $('#ordenAnulada').empty();
                    if(respuesta.anulado == 'S'){
                        let anulacion   = document.querySelector('#ordenAnulada')
                        let template    = ''
                        template += `<div class="alert alert-danger text-center"><b>Orden anulada por ${respuesta.usuarioAnulacion} el ${respuesta.fechaAnulacionFinal} | Motivo: ${respuesta.descMotivoAnulacion}</b></div>`
                        anulacion.innerHTML = template
                    }

                    let divAdjunto = document.querySelector('#divAdjunto')

                    if(respuesta.adjuntos != ''){
                        verImagenes(respuesta.adjuntos, divAdjunto, false)
                    } else {
                        divAdjunto.innerHTML = ''
                    }
                }
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga los valores de la solapa 2 del detalle de la ficha (Ventana desplegable lateral)
 * @param {string} nroReparacion
 * @param {string} lugarRecepcion
 */
function datosFichaSolapa2(nroReparacion, lugarRecepcion){
    //TRAE LOS VALORES PARA COMPLETAR LA FICHA
    return new Promise(function(resolve, reject) {
        if(lugarRecepcion == '2'){
            $('#nav-ficha').load('mod_repa/fichas/fichaService.php')          
        } else {
            $('#nav-ficha').load('mod_repa/fichas/fichaTaller.php')
        }

        setTimeout(() => {
            resolve(true)
        }, 500);

        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/querys/diagnostico_search.php?id='+nroReparacion)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                
                resolve(respuesta)
                if(respuesta != null){

                    if(lugarRecepcion == '2'){
                        respuesta.monofasica == 'S' ? $('#monofasica').prop('checked',true) : $('#monofasica').prop('checked',false);
                        respuesta.trifasica == 'S' ? $('#trifasica').prop('checked',true) : $('#trifasica').prop('checked',false);
                        respuesta.tension == 'S' ? $('#tension').prop('checked',true) : $('#tension').prop('checked',false);
                        respuesta.presion_caneria == 'S' ? $('#presion_caneria').prop('checked',true) : $('#presion_caneria').prop('checked',false);
                        respuesta.volumen_tanque_hidro == 'S' ? $('#volumen_tanque_hidro').prop('checked',true) : $('#volumen_tanque_hidro').prop('checked',false);
                        respuesta.estado_instalacion == 'S' ? $('#estado_instalacion').prop('checked',true) : $('#estado_instalacion').prop('checked',false);
                        respuesta.ruido_excesivo == 'S' ? $('#ruido_excesivo').prop('checked',true) : $('#ruido_excesivo').prop('checked',false);
                        respuesta.presion_exceso == 'S' ? $('#presion_exceso').prop('checked',true) : $('#presion_exceso').prop('checked',false);
                        respuesta.presion_baja == 'S' ? $('#presion_baja').prop('checked',true) : $('#presion_baja').prop('checked',false);
                        respuesta.caudal_bajo == 'S' ? $('#caudal_bajo').prop('checked',true) : $('#caudal_bajo').prop('checked',false);
                        respuesta.caudal_alto == 'S' ? $('#caudal_alto').prop('checked',true) : $('#caudal_alto').prop('checked',false);
                        respuesta.no_aspira == 'S' ? $('#no_aspira').prop('checked',true) : $('#no_aspira').prop('checked',false);
                        respuesta.valvula_retencion == 'S' ? $('#valvula_retencion').prop('checked',true) : $('#valvula_retencion').prop('checked',false);
                        respuesta.medida_tanque == 'S' ? $('#medida_tanque').prop('checked',true) : $('#medida_tanque').prop('checked',false);
                        respuesta.tanque_elevado == 'S' ? $('#tanque_elevado').prop('checked',true) : $('#tanque_elevado').prop('checked',false);
                        respuesta.tanque_cisterna == 'S' ? $('#tanque_cisterna').prop('checked',true) : $('#tanque_cisterna').prop('checked',false);
                        respuesta.funciona_intermitente == 'S' ? $('#funciona_intermitente').prop('checked',true) : $('#funciona_intermitente').prop('checked',false);
                        respuesta.no_arranca == 'S' ? $('#no_arranca').prop('checked',true) : $('#no_arranca').prop('checked',false);
                        respuesta.exceso_consumo == 'S' ? $('#exceso_consumo').prop('checked',true) : $('#exceso_consumo').prop('checked',false);
                        respuesta.motor_inundado == 'S' ? $('#motor_inundado').prop('checked',true) : $('#motor_inundado').prop('checked',false);
                        respuesta.press == 'S' ? $('#press').prop('checked',true) : $('#press').prop('checked',false);
                        respuesta.flow == 'S' ? $('#flow').prop('checked',true) : $('#flow').prop('checked',false);
                        respuesta.presostato == 'S' ? $('#presostato').prop('checked',true) : $('#presostato').prop('checked',false);
                        respuesta.capacitor == 'S' ? $('#capacitor').prop('checked',true) : $('#capacitor').prop('checked',false);
                        respuesta.roce_impulsor == 'S' ? $('#roce_impulsor').prop('checked',true) : $('#roce_impulsor').prop('checked',false);
                        respuesta.induccion_motor == 'S' ? $('#induccion_motor').prop('checked',true) : $('#induccion_motor').prop('checked',false);
                        respuesta.no_varia_velocidad == 'S' ? $('#no_varia_velocidad').prop('checked',true) : $('#no_varia_velocidad').prop('checked',false);
                        respuesta.boluta_pinchada == 'S' ? $('#boluta_pinchada').prop('checked',true) : $('#boluta_pinchada').prop('checked',false);
                        respuesta.sarro_en_bomba == 'S' ? $('#sarro_en_bomba').prop('checked',true) : $('#sarro_en_bomba').prop('checked',false);
                        respuesta.perdidas == 'S' ? $('#perdidas').prop('checked',true) : $('#perdidas').prop('checked',false);
                        respuesta.diametro_caneria_entrada == 'S' ? $('#diametro_caneria_entrada').prop('checked',true) : $('#diametro_caneria_entrada').prop('checked',false);
                        respuesta.diametro_caneria_salida == 'S' ? $('#diametro_caneria_salida').prop('checked',true) : $('#diametro_caneria_salida').prop('checked',false);
                        $('#observaciones').val(respuesta.observaciones);

                    } else {
                        respuesta.bobinado == 'S' ? $('#bobinado').prop('checked',true) : $('#bobinado').prop('checked',false);
                        respuesta.buje_d == 'S' ? $('#buje_d').prop('checked',true) : $('#buje_d').prop('checked',false);
                        respuesta.buje_t == 'S' ? $('#buje_t').prop('checked',true) : $('#buje_t').prop('checked',false);
                        respuesta.impulsor == 'S' ? $('#impulsor').prop('checked',true) : $('#impulsor').prop('checked',false);
                        respuesta.rotor_eje == 'S' ? $('#rotor_eje').prop('checked',true) : $('#rotor_eje').prop('checked',false);
                        respuesta.juego_juntas == 'S' ? $('#juego_juntas').prop('checked',true) : $('#juego_juntas').prop('checked',false);
                        respuesta.cable_ficha == 'S' ? $('#cable_ficha').prop('checked',true) : $('#cable_ficha').prop('checked',false);
                        respuesta.vaso_expansion == 'S' ? $('#vaso_expansion').prop('checked',true) : $('#vaso_expansion').prop('checked',false);
                        respuesta.pegado == 'S' ? $('#pegado').prop('checked',true) : $('#pegado').prop('checked',false);
                        respuesta.flexibles == 'S' ? $('#flexibles').prop('checked',true) : $('#flexibles').prop('checked',false);
                        respuesta.microswitch == 'S' ? $('#microswitch').prop('checked',true) : $('#microswitch').prop('checked',false);
                        respuesta.tapa_sup == 'S' ? $('#tapa_superior').prop('checked',true) : $('#tapa_superior').prop('checked',false);
                        respuesta.tapa_inf == 'S' ? $('#tapa_inferior').prop('checked',true) : $('#tapa_inferior').prop('checked',false);
                        respuesta.sensor_sup_inf == 'S' ? $('#sensor_sup_inf').prop('checked',true) : $('#sensor_sup_inf').prop('checked',false);
                        respuesta.aprobo_estanqueidad == 'S' ? $('#aprobo_estanqueidad').prop('checked',true) : $('#aprobo_estanqueidad').prop('checked',false);
                        respuesta.pintura == 'S' ? $('#pintura').prop('checked',true) : $('#pintura').prop('checked',false);
                        respuesta.cuerpo_motor == 'S' ? $('#cuerpo_motor').prop('checked',true) : $('#cuerpo_motor').prop('checked',false);
                        respuesta.tubo_separador == 'S' ? $('#tubo_separador').prop('checked',true) : $('#tubo_separador').prop('checked',false);
                        respuesta.disco_empuje == 'S' ? $('#disco_empuje').prop('checked',true) : $('#disco_empuje').prop('checked',false);
                        respuesta.tornillos == 'S' ? $('#tornillos').prop('checked',true) : $('#tornillos').prop('checked',false);
                        respuesta.cuerpo_impulsor == 'S' ? $('#cuerpo_impulsor').prop('checked',true) : $('#cuerpo_impulsor').prop('checked',false);
                        respuesta.capacitor == 'S' ? $('#capacitor').prop('checked',true) : $('#capacitor').prop('checked',false);
                        $('#observaciones').val(respuesta.observaciones);
                    }
                }else {
/*                         let p = document.createElement('p')
                    p.innerText = "El equipo aún no cuenta con un diagnóstico realizado"
                    $('#contenidoFichaTecnica').show();
                    $('#contenidoFichaTecnica').html(p); */
                }                  
            }
        })

    })

}

/**
 * Pone los inputs, textarea, select en Solo lectura o los habilita según parámetro.
 * @param {string} formulario
 * @param {boolean} soloLectura
 */
 function formEstadoInputs(formulario, soloLectura){
    return new Promise(function(resolve, reject) {
        let formSolapa2 = document.querySelector(formulario)
        let inputs      = formSolapa2.querySelectorAll('input,textarea,select')

        inputs.forEach(element => {
            element.type == "radio" || element.type == "checkbox" || element.type == "select-one" ? element.disabled = soloLectura : element.readOnly = soloLectura;
           
        });

        resolve(true)
    })
}

/**
 * Verifica si el nro de serie ingresado se encuentra en garantía
 * @param {string} codigo
 * @param {string} nroSerie
 */
function enGarantiaEnDiv(codigo, nroSerie, div){
    $('#productoEnGarantiaFicha').empty()
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/busquedas/equipoEnGarantia_search.php?codigo='+codigo+'&nroSerie='+nroSerie)
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            switch (respuesta) {
                case 1:
                    $(div).html('<div class="alert alert-danger text-center"><b>Producto dentro del período de garantía de fabricación.</b></div>')
                    break;
                case 2:
                    $(div).html('<div class="alert alert-warning text-center"><b>Producto dentro del período de garantía de reparación.</b></div>')
                    break;
                default:
                    break;
            }
        }
    })
}

/**
 * Carga el select de Modelos Ficha. el segundo parámetro(S = carga desplegable sin la opción "SIN DEFINIR")
 * @param {string} select
 * @param {string} sinDefinir
 */
function cargaModeloFicha(select, sinDefinir = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', "mod_sirep/admin/tablas/productos/modeloFicha_list.php?sinDefinir=S")
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= ${element.MODELO_ID}>${element.NOMBRE}</option>`
                });
                select.innerHTML    = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Modelos Ficha. el segundo parámetro(S = carga desplegable sin la opción "SIN DEFINIR")
 * @param {string} select
 * @param {string} sinDefinir
 */
 function cargaModeloFicha2(select, sinDefinir = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', "mod_sirep/busquedas/modeloFicha_list.php?sinDefinir="+sinDefinir)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= ${element.MODELO_ID}>${element.NOMBRE}</option>`
                });
                select.innerHTML    = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de zonas de despacho. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
function cargaZonasDespacho(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/zonasDespacho/zonasDespacho_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.zona_id}">${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de impresoras. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaImpresorasSirep(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/impresoras_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.impresora_id}">${element.nombreImpresora}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de impresoras. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} campo
 * @param {string} activo
 */
function cargaFormasDeRetiro(campo, activo = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/formasRetiro/formasRetiro_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>S/D</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.forma_retiro_id}">${element.descripcion}</option>`
                })
                campo.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de motivos de anulación. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaMotivosAnulacion(select, activo = 'N'){
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_repa/tablas/motivosAnulacion/motivosAnulacion_list.php?activo='+activo)
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            let template = '<option value= "">Seleccionar</option>'
            respuesta.forEach(element => {
                template += `<option value= "${element.motivo_anulacion_id}">${element.descripcion}</option>`
            })
            select.innerHTML = template
        }
    })
}

/**
 * Carga el select de formas de resolución. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaFormasDeResolucion(select, activo = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/formasRetiro/formasRetiro_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.formasderetiro_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Muestra si el cargo ingresado es valorizado S o N
 * @param {string} id
 * @returns string
 */
function cargoFormaValorizado(id){
    return new Promise(function(resolve, reject) {
        if(id != '0'){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/admin/tablas/formasRetiro/formasRetiro_single.php?id='+id)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    resolve(respuesta[0].valorizadoFormasRetiro)
                } else {
                    reject()
                }
            })
        } else {
            resolve('N')
        }
    })
}

/**
 * Carga el select de formas de resolución Cuando el equipo es plan Canje. Admite 1 parámetro, select para el id del campo
 * @param {string} select
 */
 function cargaFormasDeResolucionPlanCanje(select){

    let template = `<option value= "7">Canje por Producto</option>
                    <option value= "4">Sin Reparar</option>
                `
    select.innerHTML = template
}

/**
 * Carga el select de formas de resolución Cuando es Cambio de equipo. Admite 1 parámetro, select para el id del campo
 * @param {string} select
 */
 function cargaFormasDeResolucionCambioEquipo(select){

    let template = `<option value= "10">Cambio de equipo</option>
                    <option value= "4">Sin Reparar</option>
                `
    select.innerHTML = template
}

/**
 * Carga el select de motivos de cargo asignado. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaMotivosCargoAsignado(select, activo = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/motivosCargoAsignado/motivosCargoAsignado_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">S/D</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.motivo_id}">${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de lugares de recepción. Como parámetro se indica el id del select a utilizar
 * @param {string} campoLugar
 */
function receptionPlaces(campoLugar){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/lugaresRecepcion/lugaresRecepcion_list.php?activo=s')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.LugarRecep_id}">${element.Descripcion}</option>`
                });
                campoLugar.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de estados en solapa1 de Embalaje. Como parámetro se indica el id del select a utilizar, no trae inactivos y <> '3' y <> '4'
 * @param {string} estado
 */
function estadosDeReparacionEmbalaje(estado){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/estadosDeReparacion_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.estadoreparacion_id}">${element.descripcion}</option>`
                });
                estado.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de estados en solapa1 de Embalaje. Como parámetro se indica el id del select a utilizar
 * @param {string} estado
 */
function estadosDeReparacion(estado){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/estadosReparacion/estadosReparacion_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.estado_id}">${element.descripcion}</option>`
                });
                estado.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de reparadores. Como parámetro se indica el id del select a utilizar
 * @param {string} campoReparadores
 */
 function listarReparadoresActivos(campoReparadores, activo = 's'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/reparadores/reparadores_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value="0" selected>Sin Definir</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.CODIGO}">${element.APELLIDO+','+element.NOMBRE}</option>`
                });
                campoReparadores.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de reparadores. Como parámetro se indica el id del select a utilizar
 * @param {string} campoReparadores
 */
 function listarReparadores(campoReparadores, activo = 's'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/reparadores/reparadores_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value="0" selected>Sin Definir</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.CODIGO}">${element.APELLIDO+','+element.NOMBRE}</option>`
                });
                campoReparadores.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de emisores. Como parámetro se indica el id del select a utilizar
 * @param {string} campoEmisores
 */
function listarEmisores(campoEmisores){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/emisores/emisores_list.php?activo=s')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value="0" selected>Sin Definir</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.emisor_id}">${element.combo}</option>`
                });
                campoEmisores.innerHTML = template
            } else {
                reject()
            }
        })
    })
}


/**
 * Busca el perfil de SIREP del usuario que está logueado.
 */
function perfilUsuario(){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/perfil_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Listado de perfiles activos. Ultiliza 1 parametro, del id del desplegable en donde se deben insertar los valores
 * @param {string} select
 */
 function listarPerfiles(select){
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/admin/configuracion/perfiles/perfiles_list_activos.php')
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            let template = ''
            template +=`<option value="">Seleccionar</option>`
            respuesta.forEach(element => {
                template +=`<option value="${element.perfil_id}">${element.descripcion}</option>`
            })
            select.innerHTML = template
        }
    })
}

/**
 * Carga la descripcion del producto dependiendo del codigo ingresado. Admite dos parametros para
 * indicar los id de campos codigo y descripción. Formato ej. '#codigo'
 * @param {string} codigoDelProducto
 * @param {string} descripcionDelProducto
 */
function codigoProducto(codigoDelProducto, descripcionDelProducto){
    let codigoProducto = document.querySelector(codigoDelProducto)
    let descripcionProducto = document.querySelector(descripcionDelProducto)
    codigoProducto.addEventListener('keyup', () => {
        if(codigoProducto.value.length == 9){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/busquedas/descripcionBomba_search.php?codigo='+codigoProducto.value)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    if(respuesta[0] != null){
                        descripcionProducto.value = respuesta[0].descripcion
                    } else {
                        descripcionProducto.value = ''
                        codigoProducto.value = ''
                        alert('Código inexistente o inválido :(')
                    }
                }
            })
        } else {
            descripcionProducto.value = ''
        }
    })
}

/*
* CANJE
* Carga la descripcion del producto dependiendo del codigo ingresado. Admite dos parametros para
* indicar los id de campos codigo y descripción. Formato ej. '#codigo'
* @param {string} codigoDelProducto
* @param {string} descripcionDelProducto
*/
function codigoProductoCanje(codigoDelProducto, descripcionDelProducto){
   let codigoProducto = document.querySelector(codigoDelProducto)
   let descripcionProducto = document.querySelector(descripcionDelProducto)
   codigoProducto.addEventListener('keyup', () => {
       if(codigoProducto.value.length == 9){
           let xhr = new XMLHttpRequest
           xhr.open('GET', 'mod_sirep/busquedas/descripcionAdonix_search.php?canje=S&codigo='+codigoProducto.value)
           xhr.send()
           xhr.addEventListener('load', () => {
               if(xhr.status == 200){
                   let respuesta = JSON.parse(xhr.response)
                   if(respuesta[0] != null){
                       descripcionProducto.value = respuesta[0].descrip_adonix
                   } else {
                       descripcionProducto.value = ''
                       codigoProducto.value = ''
                       alert('Código inexistente o inválido :(')
                   }
               }
           })
       } else {
           descripcionProducto.value = ''
       }
   })
}


/**
 * Si el usuario pierde la sesión, aparece ventana flotante con redireccionado al login.php
 */
 function sesionExpiradaMensajeFlotante(){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.warning("Volver a loguearse", "Sesión expirada")
    setTimeout(function(){
        window.location="login.php"
    }, 2000);
}

/**
 * Abre el modal de selecion de equipo
 * @param {string} idModal
 * @param {string} idBodyModal
 * @param {string} idTituloModal
 */
function modalBuscarBomba(idModal, idBodyModal, idTituloModal){
    btnBuscarBomba.addEventListener('click', e => {
        e.preventDefault()
        $(idModal).show()
        $(idBodyModal).empty()
        $(idTituloModal).text('Equipos')
        let template = ''
        template = `
            <div class="row">
                <form id="formModalEquipos">
                    <div class="form-group col-sm-6 text-center">
                        <label for="tiposProductoModal">Tipo Producto</label>
                        <select id="tiposProductoModal" class="form-control"></select>
                    </div>
                    <div class="form-group col-sm-6 text-center">
                        <label for="buscadorModal">Buscador por descripción</label>
                        <input id="buscadorModal" type="text" class="form-control">
                    </div>
                    <div class="form-group col-sm-12 text-center">
                        <button id="btnBuscarEquipo" type="button" class="btn btn-primary">Buscar
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <th>Código</th>
                                <th>Descripción</th>
                            </thead>
                            <tbody id="modalBusquedaTabla"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        $(idBodyModal).html(template)

        let formModalEquipos = document.querySelector('#formModalEquipos')
        formModalEquipos.addEventListener('submit', e => {
            e.preventDefault()
        })

        let buscadorModal = document.querySelector('#buscadorModal')
        let btnBuscarEquipo = document.querySelector('#btnBuscarEquipo')
        let modalBusquedaTabla = document.querySelector('#modalBusquedaTabla')
        let tiposProductoModal = document.querySelector('#tiposProductoModal')

        buscadorModal.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                btnBuscarEquipo.click()
            }
        })

        let xhr2 = new XMLHttpRequest
        xhr2.open('GET', 'mod_sirep/admin/tablas/tiposProducto/tiposProducto_list.php')
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta2 = JSON.parse(xhr2.response)
                let template2 = ''
                template2 +=`<option value="">Seleccionar</option>`
                respuesta2.forEach(element2 => {
                    template2 +=`<option value="${element2.tipo_id}">${element2.descripcion}</option>`
                });
                tiposProductoModal.innerHTML = template2
            }
        })

        btnBuscarEquipo.addEventListener('click', e => {
            e.preventDefault()
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/busquedas/equipos_search.php?tipo='+tiposProductoModal.value+'&buscador='+buscadorModal.value)
            xhr.send()
            xhr.addEventListener('load', ()=> {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    let template = ''
                    respuesta.forEach(element => {
                        template += `
                            <tr>
                                <td><a class="equipo-item" href="${element.codigo}">${element.codigo}</td>
                                <td>${element.descripcion}</td>
                            </tr>
                        `
                    })
                    modalBusquedaTabla.innerHTML = template

                    //Tomo el link de la tabla con el ID del registro
                    $(document).on('click', '.equipo-item', (e) => {
                        e.preventDefault()
                        let cod= e.target.innerText
                        let xhr = new XMLHttpRequest
                        xhr.open('GET', 'mod_sirep/busquedas/descripcionBomba_search.php?codigo='+cod)
                        xhr.send()
                        xhr.addEventListener('load', () => {
                            if(xhr.status == 200){
                                let respuesta = JSON.parse(xhr.response)
                                if(respuesta[0] != null){
                                    codigo.value = respuesta[0].codigo
                                    descripcion.value = respuesta[0].descripcion
                                    $(idModal).hide()

                                } else {
                                    codigo.value = ''
                                    descripcion.value = ''
                                    $(idModal).hide()
                                }
                            }
                        })
                    })
                }
            })
        })
    })
}

/**
 * Abre el modal de selecion de equipo
 * @param {string} idModal
 * @param {string} idBodyModal
 * @param {string} idTituloModal
 */
 function modalBuscarBomba2(idModal, idBodyModal, idTituloModal, codigo, descripcion){

    let code = document.querySelector(codigo)
    let desc = document.querySelector(descripcion)

    btnBuscarBomba.addEventListener('click', e => {
        e.preventDefault()
        $(idModal).show()
        $(idBodyModal).empty()
        $(idTituloModal).text('Equipos')
        let template = ''
        template = `
            <div class="row">
                <form id="formModalEquipos">
                    <div class="form-group col-sm-6 text-center">
                        <label for="tiposProductoModal">Tipo Producto</label>
                        <select id="tiposProductoModal" class="form-control"></select>
                    </div>
                    <div class="form-group col-sm-6 text-center">
                        <label for="buscadorModal">Buscador por descripción</label>
                        <input id="buscadorModal" type="text" class="form-control">
                    </div>
                    <div class="form-group col-sm-12 text-center">
                        <button id="btnBuscarEquipo" type="button" class="btn btn-primary">Buscar
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <th>Código</th>
                                <th>Descripción</th>
                            </thead>
                            <tbody id="modalBusquedaTabla"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        $(idBodyModal).html(template)

        let formModalEquipos = document.querySelector('#formModalEquipos')
        formModalEquipos.addEventListener('submit', e => {
            e.preventDefault()
        })

        let buscadorModal = document.querySelector('#buscadorModal')
        let btnBuscarEquipo = document.querySelector('#btnBuscarEquipo')
        let modalBusquedaTabla = document.querySelector('#modalBusquedaTabla')
        let tiposProductoModal = document.querySelector('#tiposProductoModal')

        buscadorModal.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                btnBuscarEquipo.click()
            }
        })

        let xhr2 = new XMLHttpRequest
        xhr2.open('GET', 'mod_sirep/admin/tablas/tiposProducto/tiposProducto_list.php')
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta2 = JSON.parse(xhr2.response)
                let template2 = ''
                template2 +=`<option value="">Seleccionar</option>`
                respuesta2.forEach(element2 => {
                    template2 +=`<option value="${element2.tipo_id}">${element2.descripcion}</option>`
                });
                tiposProductoModal.innerHTML = template2
            }
        })

        btnBuscarEquipo.addEventListener('click', e => {
            e.preventDefault()
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/busquedas/equipos_search.php?tipo='+tiposProductoModal.value+'&buscador='+buscadorModal.value)
            xhr.send()
            xhr.addEventListener('load', ()=> {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    let template = ''
                    respuesta.forEach(element => {
                        template += `
                            <tr>
                                <td><a class="equipo-item" href="${element.codigo}">${element.codigo}</td>
                                <td>${element.descripcion}</td>
                            </tr>
                        `
                    })
                    modalBusquedaTabla.innerHTML = template

                    //Tomo el link de la tabla con el ID del registro
                    $(document).on('click', '.equipo-item', (e) => {
                        e.preventDefault()
                        let cod= e.target.innerText
                        let xhr = new XMLHttpRequest
                        xhr.open('GET', 'mod_sirep/busquedas/descripcionBomba_search.php?codigo='+cod)
                        xhr.send()
                        xhr.addEventListener('load', () => {
                            if(xhr.status == 200){
                                let respuesta = JSON.parse(xhr.response)
                                if(respuesta[0] != null){
                                    code.value = respuesta[0].codigo
                                    desc.value = respuesta[0].descripcion
                                    $(idModal).hide()

                                } else {
                                    cod.value = ''
                                    desc.value = ''
                                    $(idModal).hide()
                                }
                            }
                        })
                    })
                }
            })
        })
    })
}

/**
 * Abre el modal de selecion de equipo
 * @param {string} idModal
 * @param {string} idBodyModal
 * @param {string} idTituloModal
 * @param {string} codCanje
 * @param {string} descCanje
 */
 function modalBuscarBombaCanje(idModal, idBodyModal, idTituloModal, botonAccion, codCanje, descCanje){
    botonAccion.addEventListener('click', e => {
        e.preventDefault()
        $(idModal).show()
        $(idBodyModal).empty()
        $(idTituloModal).text('Equipos')
        let template = ''
        template = `
            <div class="row">
                <form id="formModalEquiposCanje">
                    <div class="row g-3">
                        <div class="form-group col-sm-4">
                            <label for="marcaProductoModalCanje">Marca</label>
                            <select id="marcaProductoModalCanje" class="form-control"></select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="familiaProductoModalCanje">Familia</label>
                            <select id="familiaProductoModalCanje" class="form-control"></select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="buscadorModalCanje">Buscador</label>
                            <input id="buscadorModalCanje" type="text" class="form-control">
                        </div>
                        <div class="form-group col-sm-12 text-center">
                            <button id="btnBuscarEquipoCanje" type="button" class="btn btn-primary">Buscar
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <th>Id</th>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Marca</th>
                                <th>Familia</th>
                            </thead>
                            <tbody id="modalBusquedaTabla"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        $(idBodyModal).html(template)

        let formModalEquipos = document.querySelector('#formModalEquiposCanje')
        formModalEquipos.addEventListener('submit', e => {
            e.preventDefault()
        })

        let modalBusquedaTabla          = document.querySelector('#modalBusquedaTabla')
        let marcaProductoModalCanje     = document.querySelector('#marcaProductoModalCanje')
        let familiaProductoModalCanje   = document.querySelector('#familiaProductoModalCanje')
        let buscadorModalCanje          = document.querySelector('#buscadorModalCanje')
        let btnBuscarEquipoCanje        = document.querySelector('#btnBuscarEquipoCanje')

        cargaFamilias(familiaProductoModalCanje)
        cargaMarcas(marcaProductoModalCanje)

        buscadorModalCanje.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                btnBuscarEquipoCanje.click()
            }
        })

        btnBuscarEquipoCanje.addEventListener('click', e => {
            e.preventDefault()
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/productos/productosCanje_list.php?familia='+familiaProductoModalCanje.value+'&marca='+marcaProductoModalCanje.value+'&buscador='+buscadorModalCanje.value)
            xhr.send()
            xhr.addEventListener('load', ()=> {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    let template = ''
                    respuesta.forEach(element => {
                        template += `
                            <tr>
                                <td style="width: 10%;"><a class="equipoCanje-item" href="${element.producto_id}">${element.producto_id}</td>
                                <td style="width: 40%;">${element.codigo}</td>
                                <td style="width: 40%;">${element.descripcion}</td>
                                <td style="width: 10%;">${element.marca}</td>
                                <td style="width: 40%;">${element.familia}</td>
                            </tr>
                        `
                    })
                    modalBusquedaTabla.innerHTML = template

                    $(document).on('click', '.equipoCanje-item', (e) => {
                        e.preventDefault()
                        let tr              = e.target.parentNode.parentNode
                        let codProdCanje    = document.querySelector('#'+codCanje)
                        let descProdCanje   = document.querySelector('#'+descCanje)
                    
                        codProdCanje.value  = tr.querySelector("td:nth-of-type(2)").innerText
                        descProdCanje.value = tr.querySelector("td:nth-of-type(3)").innerText
                        $(idModal).hide()
                    })
                }
            })
        })
    })
}

/**
 * Calcula la fecha de retiro según código de producto seleccionado y lugar de recepción.
 * @param {string} idLugarRecep
 * @param {string} codigoProducto
 * @param {string} tipoReparacion
 * @param {string} atencionReparacion
 */
function calculaFechaRetiro(idLugarRecep, codigoProducto, tipoReparacion, atencionReparacion){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/fechaDeRetiro_search.php?lugar='+idLugarRecep+'&codigo='+codigoProducto+'&tipo='+tipoReparacion+'&atencion='+atencionReparacion)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Calcula la fecha de retiro según código de producto seleccionado y lugar de recepción en presupuesto.
 * @param {string} idLugarRecep
 * @param {string} codigoProducto
 * @param {string} tipoReparacion
 * @param {string} atencionReparacion
 */
 function calculaFechaPresupuesto(idLugarRecep, codigoProducto, tipoReparacion, atencionReparacion){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/fechaDePresupuesto_search.php?lugar='+idLugarRecep+'&codigo='+codigoProducto+'&tipo='+tipoReparacion+'&atencion='+atencionReparacion)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de formas de resolución. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaFormasDeResolucionOSCA(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/formasRetiro/formasRetiroOSCA_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.formasderetiro_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Marcas
 * @param {string} select
 * @param {string} activo
 */
 function cargaMarcas(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/marcas/marcas_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.marca_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de sucursales. 
 * @param {string} select
 * @param {bool} seleccionar
 */
 function cargaSucursales(select, seleccionar = 'S'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/sucursales/sucursales_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)

                let template = ''
                if(seleccionar == 'S'){
                    template += '<option value= "0" selected>Seleccionar</option>'
                }
                respuesta.forEach(element => {
                    template += `<option value= "${element.sucursal_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de lugaresRecepcion. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaLugaresRecepcion(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.lugar_recepcion_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de perfiles. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaPerfiles(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/perfiles/perfiles_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.perfil_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de lugar Recepcion. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaLugarRecepcion(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.lugar_recepcion_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Diagnosticadores
 * @param {string} select
 * @param {string} activo
 */
 function cargaDiagnosticadores(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosDiagnosticadores_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">S/D</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido+', '+element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Reparadores
 * @param {string} select
 */
 function cargaReparadores(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosReparadores_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">S/D</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido+', '+element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Reparadores activos para el desplegable de diagnostico
 * @param {string} select
 * @param {string} activo
 */
 function cargaReparadoresActivos(select, activo = 's'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosReparadores_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido+', '+element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Embaladores
 * @param {string} select
 * @param {string} activo
 */
 function cargaEmbaladores(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosEmbaladores_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">S/D</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido+', '+element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Familias
 * @param {string} select
 * @param {string} activo
 */
 function cargaFamilias(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/familias/familias_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.familia_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Tecnicos
 * @param {string} select
 * @param {string} activo
 */
 function cargaTecnicos(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosTecnicos_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido}, ${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Tecnicos
 * @param {string} select
 * @param {string} activo
 */
 function cargaTecnicosFicha(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosTecnicos_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">S/A</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido}, ${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Emisores
 * @param {string} select
 * @param {string} activo
 */
 function cargaEmisores(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosEmisores_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">S/D</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido}, ${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Limita cantidad de caractéres de un campo.
 * @param {string} campo
 * @param {number} cant
 */
function limitaCaracteres(campo, cant){
    campo.addEventListener('input',function(){
        if(this.value.length > cant) {
            this.value = this.value.slice(0,cant);
        }
    })
}

/**
 * Convertir a mayúsculas.
 * @param {string} campo
 */
 function todoEnMayusculas(campo){
    campo.addEventListener('input',function(){
        this.value = this.value.toUpperCase();
    })
}

/**
 * Convertir a minúsculas.
 * @param {string} campo
 */
 function todoEnMinusculas(campo){
    campo.addEventListener('input',function(){
        this.value = this.value.toLowerCase();
    })
}

/**
 * Permitir solo números.
 * @param {string} campo
 */
 function soloNumeros(campo){
    campo.addEventListener('keypress', (e) => {
        //let key = window.event ? e.which : e.keyCode;
        let key = e.keyCode;
        if (key < 48 || key > 57) {
          e.preventDefault();
        }
    })
}

/**
 * Permitir solo moneda (Valor decimal con 2 digitos despues de la coma).
 * @param {string} campo
 */
 function soloMoneda(campo){
    campo.addEventListener('keypress', (e) => {

        let key = e.keyCode;
        if (key < 48 || key > 57) {
            if(key != 46){
                e.preventDefault();
            }
        }
    })
}

/**
 * Sweet Alert - Transacción Exitosa
 */
 function msgTransaccionExitosa(){
    swal({
        title   : "Perfecto!!!",
        text    : `El registro fue grabado con éxito!`,
        type    : "success",
    });
}

/**
 * Sweet Alert - Registro duplicado
 */
function msgRegistroDuplicado(){
    swal({
        title   : "Atención:( !",
        text    : "Registro duplicado.",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Aviso de solicitud
 */
 function msgAvisoOc(){
    swal({
        title   : "Atención:( !",
        text    : `Cliente solicita OC`,
        type    : "warning",
    });
}

/**
 * Sweet Alert - Cliente duplicado
 */
 function msgClienteDuplicado(){
    swal({
        title   : "Atención:( !",
        text    : "Ya existe el código de cliente ingresado.",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Hubo errores en la grabación
 */
function msgAlgoNoFueBien(){
    swal({
        title   : "Hubo errores durante la grabación:( !",
        text    : "Por favor, contáctese con el Dpto. de Sistemas.",
        type    : "error",
    });
}

/**
 * Sweet Alert - Hubo errores en la grabación
 */
 function msgAlgoNoFueBienRecep(error){
    swal({
        title   : "Hubo errores durante la grabación:( !",
        text    : "Por favor, contáctese con el Dpto. de Sistemas." + error,
        type    : "error",
    });
}

/**
 * Sweet Alert - Hubo errores en la grabación
 */
 function msgAlgoNoFueBienReload(msg){
    swal({
        title   : "Hubo errores durante la grabación:( !",
        text    : msg,
        type    : "error",
    });
}

/**
 * Sweet Alert - Usuario no habilitado
 */
function msgUsuarioNoHabilitado(){
    swal({
        title   : "Permisos insuficientes :( !",
        text    : "Tu usuario no tiene permisos para asignar cargo a una orden.",
        type    : "error",
    });
}

/**
 * Sweet Alert - Usuario no es reparador
 */
function msgUsuarioNoEsReparador(){
    swal({
        title   : "Permisos insuficientes :( !",
        text    : "Tu usuario no es un reparador habilitado.",
        type    : "error",
    });
}

/**
 * Sweet Alert - Mensaje Registro Cancelado
 */
function msgCancelado(){
    swal({
        title   : "Cancelado",
        text    : "El registro no fue modificado :)",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Mensaje Registro Eliminado
 */
function msgEliminado(){
    swal({
        title   : "Eliminado!",
        text    : "El registro fue eliminado.",
        type    : "success",
    });
}

/**
 * Sweet Alert - Mensaje Perfil no habilitado
 */
 function msgErrorPerfil(){
    swal({
        title   : "Atención!",
        text    : "Tu usuario no tiene permisos para realizar esta acción.",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Mensaje error de fecha
 */
function msgErrorFecha(){
    swal({
        title   : "Atención!",
        text    : "La fecha no puede ser menor a la actual.",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Mensaje en uso
 */
 function msgEnUso(){
    swal({
        title   : "Atención!",
        text    : "No se puede eliminar el registro ya que se encuentra en uso.",
        type    : "warning",
    });
}

/**
 * Busca el valor de rep_param según el id dado
 * @param {string} id
 */
function paramValue (id){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/paramValue_search.php?id='+id)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Verifico si es un reparador válido
 */
 function soyReparador(){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/soyReparador_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Verifico la planta del usuario logueado
 */
function plantaUsuario(){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/usuarioPlanta_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Completa el desplegable de estantes con los estantes activos
 * @param {string} campo
 */
function estanteList(campo) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/estantes/estantes_list.php?activo='+'S')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value="">Seleccionar</option>'
                respuesta.forEach(element => {
                    template +=`<option value='${element.estante_id}'>${element.descripcion}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de técnicos
 * @param {string} campo
 */
function tecnicosList(campo) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/tecnicos_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = `<option value='0' selected>N/A</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.id_tecnico}'>${element.nombre}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de fletes
 * @param {string} campo
 */
function fletes(campo){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_compras/busquedas/fletes_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                //console.log(respuesta.data)
                let template = `<option value='0' selected>Seleccionar</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.flete_id}'>${element.descripcion}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de fletes
 * @param {string} campo
 */
function listaProvincias(campo, activo = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/provincias/provincias_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                //console.log(respuesta.data)
                let template = `<option value='' selected>Seleccionar</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.provincia_id}'>${element.descripcion}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de localidades
 * @param {string} campo
 * @param {string} activo
 */
function listaLocalidades(campo, idProvincia, activo = 'N') {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/localidades/localidades_list.php?activo='+activo+'&provincia='+idProvincia)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = ''
                template +=`<option value='' selected >Seleccionar</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.localidad_id}'>${element.descripcion}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de grupos de equipos
 * @param {string} campo
 */
 function gruposList(campo){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/grupos/grupos_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                //console.log(respuesta.data)
                let template = `<option value selected>Seleccionar</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.GRUPO_ID}'>${element.DESCRIPCION}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Trae el despiece según el id del producto
 * @param {string} productoId
 */
function despiece(productoId){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/productos/productos_single.php?id='+productoId)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            }
        })
    })
}

/**
 * Trae el despiece según el id del producto
 * @param {string} productoId
 */
function despieceDiagnostico(orden, producto){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/querys/despieceDiagnostico_single.php?orden='+orden+'&producto='+producto)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            }
        })
    })
}

/**
 * Funcionalidad link órdenes para right-sidebar
 */
function linkOrdenFicha(){
    let sideBar             = document.querySelector('#right-sidebar')
    let cerrarSideBar       = document.querySelector('#cerrarSideBar')
    let btnSalirFicha       = document.querySelector('#cancelarFicha')
    let btnDatosClientes    = document.querySelector('#btnDatosClientes')
    let btnHistInterplanta  = document.querySelector('#btnHistorialInterplanta')
    let btnHistCargo        = document.querySelector('#btnHistorialCargo')
    let btnCloseModal       = document.querySelector('#btnCloseModal')
    let btnCerrarModal      = document.querySelector('#btnCerrarModal')
    let formSolapa1         = document.querySelector('#formRetiroFicha')
    let inputsSolapa1       = formSolapa1.querySelectorAll('input, select, textarea')
    let tecnico             = document.querySelector('#tecnico')

    $(document).on('click', '.list-item', (e) => {
        e.preventDefault()
        let num     = e.target.innerText

        tecnicosList(tecnico).then(() =>{
            datosFichaSolapa1(num)
        })

        cargaPlantillaFicha(num, true).then(() =>{
            btnHistInterplanta.value = num
            btnHistCargo.value = num
            datosFichaSolapa2(num)
        })
        sideBar.classList.add("sidebar-open")
        $('#sideBarContainer').scrollTop(0)
        $('#tab-1').addClass("active");
        $('#tab-2').removeClass("active");
        $('#solapa1').addClass("active");
        $('#solapa2').removeClass("active");
    })

    cerrarSideBar.addEventListener('click', e => {
        e.preventDefault()
        sideBar.classList.remove("sidebar-open")
    })

    btnSalirFicha.addEventListener('click', e =>{
        e.preventDefault()
        cleanInputs(inputsSolapa1)
        sideBar.classList.remove("sidebar-open")
    })

    btnDatosClientes.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRetiro').empty()
        $('#titulo').text('Datos cliente')
        $('#bodyRetiro').load('mod_sirep/admin/tablas/clientes/clientes_abm.php', () => {
            let formClienteModal = document.querySelector('#formClientes')
            let inputsCliente = formClienteModal.querySelectorAll('input, select, textarea')
            let selectZonas = document.querySelector('#clienteZonasDespacho')
            //console.log(inputsCliente)
            let id = e.target.value
            let url = 'mod_sirep/admin/tablas/clientes/clientes_single.php'
            cargaZonasDespacho(selectZonas).then(() => {
                showData(id, url, inputsCliente)
            })
            $('#modal_retiro').show()
            $('#botonesAbmClientes').hide()
            inputsCliente.forEach(element => {
                if(element.type == "radio" || element.type == "checkbox"){
                    element.disabled = true
                } else {
                    element.readOnly = true
                }
            })
            selectZonas.disabled = true
        })
    })

    btnHistInterplanta.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRetiro').empty()
        $('#titulo').text('')
        $('#bodyRetiro').load('mod_sirep/admin/buscar/generica/histInterplanta.php', () => {
            let id = e.target.value
            let url = 'mod_sirep/admin/buscar/generica/histInterplanta_search.php?id='+id
            let xhr = new XMLHttpRequest
            xhr.open('GET', url)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    //console.log(respuesta)
                    let template = ''
                    if(respuesta == ''){
                        template += `<tr>
                                        <td colspan="5" class="text-center">No hay registros.</td>
                                    </tr>`
                    } else {
                        respuesta.forEach(element => {
                            template += `<tr>
                                            <td>${element.fecha}</td>
                                            <td>${element.Planta}</td>
                                            <td>${element.prefijo}</td>
                                            <td>${element.numero}</td>
                                            <td>${element.usuario}</td>
                                        </tr>`
                        });
                    }

                    $('#tbodyhistInterplanta').html(template)
                }
            })
        $('#modal_retiro').show()
        })
    })

    btnHistCargo.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRetiro').empty()
        $('#titulo').text('')
        $('#bodyRetiro').load('mod_sirep/admin/buscar/generica/histCargo.php', () => {
            let id = e.target.value
            let url = 'mod_sirep/admin/buscar/generica/histCargo_search.php?id='+id
            let xhr = new XMLHttpRequest
            xhr.open('GET', url)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    //console.log(respuesta)
                    let template = ''
                    if(respuesta == ''){
                        template += `<tr>
                                        <td colspan="4" class="text-center">No hay registros.</td>
                                     </tr>`
                    } else {
                        respuesta.forEach(element => {
                            template += `<tr>
                                            <td>${element.fecha}</td>
                                            <td>${element.descripcion}</td>
                                            <td>${element.costo}</td>
                                            <td>${element.reparacion_detalle}</td>
                                        </tr>`
                        });
                    }

                    $('#tbodyhistCargo').html(template)
                }
            })
        $('#modal_retiro').show()
        })
    })

    btnCerrarModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_retiro').hide()
    })

    btnCloseModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_retiro').hide()
    })

}

/**
 * Funcionalidad btn historial service en ficha retiro para los informes
 */
 function btnHistorialService(){
    let btnCerrarModalServ  = document.querySelector('#btnCerrarModalServce')
    let btnCloseModalServ   = document.querySelector('#btnCloseModalService')
    let btnHistorialService = document.querySelector('#btnHistorialService')
    let selectHistService   = document.querySelector('#selectClienteHistService')
    let tbody_histService   = document.querySelector('#tbody_histService')
    let cantClientesModal   = document.querySelector('#cantidadClientesModal')
    let perfil              = ''

    perfilUsuario().then((respuesta) => {
        perfil = respuesta[0].perfil_id
        if(perfil == '1' || perfil == '2' || perfil == '8' || perfil == '9' || perfil == '13' || perfil == '15') {
            $('#btnHistorialService').show()
        } else {
            $('#btnHistorialService').hide()
        }
    })

    btnCerrarModalServ.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_service').hide()
    })

    btnCloseModalServ.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_service').hide()
    })

    btnHistorialService.addEventListener('click', e => {

        e.preventDefault()
        tbody_histService.innerHTML = ''
        selectHistService.innerHTML = ''

        let serie   = e.target.value
        let codigo  = document.querySelector('#productoCodigo')

        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/historialService_search.php?serie='+serie+'&codigo='+codigo.value)
        xhr.send()
        xhr.addEventListener('load', () => {

            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)

                switch (respuesta.estado) {
                    case 'Serie ok':
                        $('#modal_service').show()
                        let template = '<option value="">Seleccionar</option>'
                        respuesta.resultado.forEach(element => {
                            template +=`<option value="${element[0].id_cliente}">${element[0].cliente}</option>`
                        });
                        selectHistService.innerHTML = template

                        selectHistService.addEventListener('change', () => {
                            let templateTable = ''
                            if(selectHistService.value != ''){
                                respuesta.resultado.forEach(element => {
                                    if(element[0].id_cliente == selectHistService.value){
                                        element.forEach(subElement => {
                                            templateTable += `
                                            <tr>
                                                <td>${subElement.pedido}</td>
                                                <td>${subElement.fecha_service}</td>
                                                <td>${subElement.cliente}</td>
                                                <td>${subElement.tecnico}</td>
                                                <td>${subElement.codigo}</td>
                                                <td>${subElement.descripcion}</td>
                                                <td>${subElement.serie}</td>
                                                <td>${subElement.desccargo}</td>
                                                <td>${subElement.producto_observaciones}</td>
                                                <td>${subElement.texto_problemas}</td>
                                                <td>${subElement.texto_soluciones}</td>
                                                <td>${subElement.texto_recomendaciones}</td>
                                            </tr>
                                        `
                                        });
                                    }
                                });
                            } else {
                                templateTable = ''
                            }
                            tbody_histService.innerHTML = templateTable
                        })

                        cantClientesModal.innerHTML = `Cantidad de clientes encontrados: <b>${respuesta.contadorClientes}</b>, click en desplegable para seleccionar`

                        break;
                    case 'Error serie':
                        swal('Atención', 'No hay registros para el número de serie seleccionado', 'warning')
                    default:
                        break;
                }
            }
        })
    })

}

/**
 * Retorna el valor de la cookie según nombre indicado en el parámetro.
 */

function leerCookie(nombre) {
    let micookie = ''
    let lista = document.cookie.split(";");

    for (i in lista) {
        let busca = lista[i].search(nombre);

        if (busca > -1) {
            micookie = lista[i]
        }
    }
    let igual = micookie.indexOf("=");
    let valor = micookie.substring(igual+1);

    return valor;
}

