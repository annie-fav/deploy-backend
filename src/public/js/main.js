const socket = io()

const botonChat =  document.getElementById("botonChat")
const parrafosMensajes = document.getElementById("parrafosMensajes")
const val = document.getElementById("chatBox").value
let user

Swal.fire({
    title: "identificacion de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && "Ingrese un valor valido"
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

botonChat.addEventListener("click", () => {
    if(val.value.trim().length > 0) {
        socket.emit("mensaje", {usuario: user, mensaje: val.value})
        val.value = "" // Limpiar el input
    }
})

socket.on("mensaje", arrayMensajes => {
    parrafosMensajes.innerHTML = "" // Limpio lo que serian los parrafos
    arrayMensajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>${mensaje.usuario} dice: ${mensaje.mensaje}</p>` 
    })
})



// const socket = io()
// const form = document.getElementeById(idForm)
// form.addEventListener('submit', (e) => {
//      e.preventDefault()
//      //Consulto datos de formulario
//      socket.emit("productoNuevo", [{}])
//      //servidor
// })

// socket.emit("mensaje", "Hola, este es mi primera info al servidor") // Enviar informacion a mi servidor

// socket.on("Mensaje-general", info => {
//     console.log(info)
// })

// socket.on("mensaje-socket-propio", info => {
//     console.log(info)
// })