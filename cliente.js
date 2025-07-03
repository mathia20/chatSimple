const Cliente = new WebSocket('ws://' + location.host);

Cliente.onmessage = (event) => {
    const seccion_chat = document.getElementById('mensajes');
    const divTag = document.createElement('div');
    divTag.textContent = `mensaje: ${event.data}`;
    seccion_chat.appendChild(divTag);
};

document.addEventListener('click',function(event){
    if(event.target && event.target.id === 'enviar'){
        event.preventDefault();
        let mensaje = document.getElementById('msn').value;
        Cliente.send(mensaje);
    }
});

