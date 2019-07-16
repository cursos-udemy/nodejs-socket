const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

io.on('connection', (client) => {

    client.emit('established-connection', {
        user: 'Administrador',
        connection: 'ok',
        timestamp: new Date().getTime(),
        message: 'Aplicacion lista para usar!!'
    });

    client.on('disconnect', () => {
        console.log('El usuario se desconecto');
    });

    client.on('login', (data, callback) => {
        if (data.username) {
            console.log(`El usuario ${data.username} ingreso a al aplicacion`);
            callback(`Bienvenido ${data.username}`);
        } else {
            callback(`Por favor ingrese sus credenciales`);
        }
    });
});

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});
