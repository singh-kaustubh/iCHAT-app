const socket = io("http://localhost:8000");
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".chatarea");
const myname = prompt("Enter your myname to join!");
// {
//     if (myname == null) {
//         while (myname == null) {
//             myname = prompt("Enter your myname to join!");
//         }
//     }
// }
var receive_audio = new Audio('CSS/notif.wav');
var send_audio = new Audio('CSS/send.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        receive_audio.play();
    }
    else if (position == 'right') {
        send_audio.play();
    }
}
socket.emit('new-user-joined', myname);
socket.on('user-joined', myname => {
    append(`${myname} joined the chat!`, 'center');
});
socket.on('receive', (data) => {
    append(`${data.myname} : ${data.message} `, 'left');
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});
socket.on('left', (myname) => {
    append(`${myname} left the chat!`, 'center');
})