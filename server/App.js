'use strict';

var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.get('/', function(req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

server.listen(8080, function() {
    console.log('listening on *:8080');
});
