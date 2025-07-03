const Cliente = new WebSocket('ws://' + location.host);

Cliente.onmessage = (event) => {
// Obtiene la sección del chat donde se mostrarán los mensajes.
    const seccion_chat = document.getElementById('mensajes');

// Crea un nuevo elemento <div> para mostrar el mensaje recibido.    
    const divTag = document.createElement('div');
    divTag.textContent = `mensaje: ${event.data}`;
    
// Agrega el nuevo mensaje al final de la sección del chat.
    seccion_chat.appendChild(divTag);
};

document.addEventListener('click',function(event){
    if(event.target && event.target.id === 'enviar'){
        event.preventDefault();
        
        let mensaje = document.getElementById('msn').value;
        Cliente.send(mensaje);
    }
});

