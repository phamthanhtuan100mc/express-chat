const socket = io();

let username, message, people;

people = 0;
username = prompt('What is your name:')

const chatForm = document.querySelector('#chat-form');
const chatMes = document.querySelector('#chat-mes');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = chatMes.value.trim();

    if (message != '') {

        if (username == null || username == "") {
            username = prompt('Input your name:')
        }
        if (username == null || username == '') {
            alert("You have to input your name to start chatting");
        } else {
            socket.emit('on-chat', {
                username, message
            });
            chatMes.value = '';
        }
    }
})

const people_count = document.querySelector('#people-count');
socket.on('member-add', (data) => {
    people_count.textContent = data.people_count;
})

const messages = document.querySelector('#messages-content')
socket.on('user-chat', (data) => {
    console.log(data)
    const chatItem = document.createElement('li');
    
    chatItem.textContent = `${data.username}: ${data.message}`;
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