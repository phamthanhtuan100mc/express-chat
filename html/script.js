const socket = io();

let username;
let people = 0;
let editFlag = 0;

username = prompt('What is your name:');

socket.on('member-add', (data) => {
    people = data.people_count;
    console.log(people)
    $('#people-count').html(people);
    
    setNameIfEmpty();
    
    $('#user-name').val(username);
})

$('#edit-name').on('click', () => {

    if ($('#edit-name').text() == 'Edit') {
        $('#user-name').prop('disabled', false);
        $('#edit-name').html('Set');
        $('#user-name').focus();
        editFlag = 1;

        $('#section-name').append('<button id="cancel-edit">Cancel</button>');

        $('#cancel-edit').on('click', () => {
            $('#user-name').prop('disabled', true);
            $('#user-name').val(username);
            $('#cancel-edit').remove();
            $('#edit-name').html('Edit');
        })
        
    } else {
        editComlete();
    }
})

$('#user-name').keypress(function(event) {
    if (event.keyCode == 13 && editFlag == 1) {
        editComlete();
    }
});

$('#chat-form').on('submit', (e) => {
    e.preventDefault();

    const message = $('#chat-mes').val().trim();

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
            $('#chat-mes').val('');
        }
    }
})

socket.on('user-chat', (data) => {
    console.log(data)
    const chatItem = document.createElement('li');
    chatItem.className = 'no-bullet';
    
    if (data.username == username) {
        chatItem.style.textAlign = 'right';
        chatItem.style.color = 'deeppink';
        chatItem.style.marginRight = '4em';
        chatItem.textContent = `${data.message}`;
    } else {
        chatItem.textContent = `${data.username}: ${data.message}`;
    }

    $('#messages-content').append(chatItem);
})

function setNameIfEmpty () {
    if (username === null || username === '') {
        username = 'Default ' + people;
    }

    console.log('set username: ' + username)
}

function editComlete() {
    $('#user-name').prop('disabled', true);
    username = $('#user-name').val();
    $('#cancel-edit').remove();
    $('#edit-name').html('Edit');
    editFlag = 0;
}