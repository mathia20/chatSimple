const express = require('express');
const http = require('http');
const path = require('path');
const webSocket = require('ws');

const app = express();
const server = http.createServer( app );

app.use(express.static(path.join( __dirname, 'public')));

const ws = new webSocket.Server({ server });

ws.on('connection', (socket,request)=>{
    

    console.log (`Cliente ${ request.socket.remoteAddress }`);
    console.log (`Cliente conectado:${ws.clients.size}`);

    socket.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        broadcast(ws, message.toString());

    });

    
    socket.on('close', () => {
        console.log(`Cliente ${request.socket.remoteAddress}desconectado.`);
        console.log(`Clientes conectados: ${ws.clients.size}`);
    });
});

function broadcast(ws,data){
    ws.clients.forEach(client => {
        if (client.readyState === webSocket.OPEN) {
            client.send(data);
        }
    });
}

server.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
