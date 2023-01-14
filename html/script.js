const socket = io();

const name = prompt('Tell me your name:')

const chatForm = document.querySelector('#chat-form');
const chatMes = document.querySelector('#chat-mes');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = chatMes.value.trim();

    if (message != '') {
        socket.emit('on-chat', {
            name, message
        });
        
        chatMes.value = '';
    }
})

const messages = document.querySelector('#messages-content')
socket.on('user-chat', (data) => {
    console.log(data)
    const chatItem = document.createElement('li');
    
    chatItem.textContent = `${data.name}: ${data.message}`;
    messages.appendChild(chatItem);
})

let lastPrice = 0;
const priceSpan = document.querySelector('#price');
socket.on('new-price', (data) => {

    if (data.price > lastPrice) {
        priceSpan.className = 'up';
    } else {
        priceSpan.className = 'down';
    }
    lastPrice = data.price;
    priceSpan.textContent = `${data.price}`;
})