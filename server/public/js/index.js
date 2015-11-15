var socket = io();
socket.emit('connect server');

socket.on('client interaction', function(msg){
    console.log(msg);
});
