'use strict';

var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = process.env.npm_config_port || 8080;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/client', function(req, res) {
    res.sendFile(__dirname + './../client/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

server.listen(port, function() {
    console.log('listening on *:' + port);
});