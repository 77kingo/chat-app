const socket = io();

const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');

function sendMessage() {
    const msg = messageInput.value;
    if (msg) {
        socket.emit('chat message', msg);
        messageInput.value = '';
    }
}

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

