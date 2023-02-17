import express from 'express'
import { __dirname, __filename } from "./path.js"
import productRouter from "./routes/products.routes.js"
import multer from 'multer'
import  { engine } from 'express-handlebars'
import * as path from 'path'
import { Server } from "socket.io" 
import routerSocker from "./routes/socket.routers"

// const upload = multer({ dest:'src/public/img'}) . // ---> forma basica de cargar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },

    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage: storage})

const app = express() //app es igual a la ejecucion de express
const PORT = 4000

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Middlewares
app.use(express.urlencoded({extended:true})) // Permite realizar consultas en la url (req.query)
app.use(express.json()); // Permite trabajar con json
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')) // __dirname + './views'


//ServerIO
const io = new Server(server)

// io.on("connection", (socket) => {  // io.on es cuando se establece la conexion
//     console.log("Cliente conectado")
 
//     socket.on("mensaje", info => { // Cuando recibo informacion de mi cliente
//         console.log(info)
//     }) 

//     socket.emit("mensaje-general", "hola, desde mensaje general")
//     socket.broadcats.emit("mensaje-socket-propio", "hola, desde mensaje socket-propio") // Envio un mensaje a todos los clientes conectados a otros sockets menos al que esta conectado a este socket actualmente
// })

const mensajes = []

io.on("connection", (socket) => {
    console.log("Cliente conectado")
    socket.on("mensaje", info => {
        console.log(info)
        mensajes.push(info)
        io.emit("mensajes", mensajes)
    })
})

// Routes

// app.get('/info', (req, res) => {
//     return 'Its working'
// })

// app.post('/more-info', (req, res) => {
//     return 'Its more info'
// })

// app.use('./static', express.static(__dirname + '/public')) // Defino mis archivos estaticos

app.use('/', express.static(__dirname + '/public')) 
app.use('/api/products', productRouter)
app.use("/", routerSocket)
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})



//HBS
// app.get('/', (req, res) => {
//    const user = {
//     nombre: "Pablo",
//     email: "p@p.com",
//     rol: "Tutor"
//    } 

//    const cursos = [
//      {numero: 123, dia:"LyM", horario: "noche"},
//      {numero: 456, dia:"LyM", horario: "manana"},
//      {numero: 789, dia:"LyM", horario: "noche"},
//    ]

//    res.render("home", {
//      titulo: "Ecommerce-backend",
//      mensaje: "Pepe",
//      user,
//      isTutor: user.rol === "tutor",
//      cursos 
//    })
// })












