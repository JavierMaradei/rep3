(function iniciaDiagnostico() {
    let btnBuscarPrefiltro      = document.querySelector('#btnBuscarPrefiltro')
    let btnCancelarPrefiltro    = document.querySelector('#btnCancelarPrefiltro')
    let formPrefiltro           = document.querySelector('#formPrefiltro')

    btnBuscarPrefiltro.addEventListener('click', e => {
        e.preventDefault()
        console.log('btn buscar presionado')
    })
})()