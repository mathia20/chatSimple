const express = require('express');
const http = require('http');
const path = require('path');
const webSocket = require('ws');

const app = express();
const server = http.createServer( app );
const ws = new webSocket.Server({ server });

app.use(express.static(path.join( __dirname, 'public')));

ws.on('connection', (socket,request)=>{
    
    //cuando se conecta un cliente    
    console.log (`Cliente ${ request.socket.remoteAddress }`);
    console.log (`Cliente conectado:${ws.clients.size}`);

    //cuando uncliente envia un mensaje
    socket.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        broadcast(ws, message.toString());
//        broadcast (ws , ws.clients.size);
    });

    //cuando un cliente se desconecta
    socket.on('close', () => {
        console.log(`Cliente ${request.socket.remoteAddress}desconectado.`);
        console.log(`Clientes conectados: ${ws.clients.size}`);
    });
});

// broadcast es un nombre al asar puedes poner cualquier nombre
//va a preguntar si el cliente esta conectado y si es asi le envia el mensaje
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

//socket reprecenta al cliente
//request es la info de del cliente ej:ip, puerto, etc. 
