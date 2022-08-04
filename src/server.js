const express = require('express')
const { Server: IOServer } = require('socket.io')
const path = require('path');
const app = express()
const serverExpress = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(serverExpress)
const route = require('./routes/index');

//creo instancias de contenedores y busco las configuraciones de las BD
const Contenedor = require('./contenedor/contenedor');
const {configSqlite }= require('./connections/config');
const {configMariaDB } = require('./connections/config');

const mensajeContenedor = new Contenedor(configSqlite, 'Mensaje');
const productoContenedor = new Contenedor(configMariaDB, 'Producto');

app.use(express.static(path.join(__dirname, './public')))

app.use('/', route);

io.on('connection', async socket => {
    console.log(`Se conecto un usuario ${socket.id}`)
    let messagesData = await mensajeContenedor.getAll();
    let products = await productoContenedor.getAll();

    io.emit('server:message', messagesData)

    io.emit('server:products', products)

    socket.on('client:message', async messageInfo => {

       await mensajeContenedor.saveObject(messageInfo); 
       messagesData = await mensajeContenedor.getAll();
        io.emit('server:message', messagesData)
    })

    socket.on('client:product',async productForm => {
        await productoContenedor.saveObject(productForm);
        products = await productoContenedor.getAll();
        io.emit('server:products', products)
    })
})
