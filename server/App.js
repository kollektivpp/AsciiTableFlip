'use strict';

var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = process.env.npm_config_port || 8080,
    connected_clients = [],
    master_socket = null;

app.use(express.static(__dirname + '/public'));

app.get('/client', function(req, res) {
    res.sendFile('index.html', {root: 'client/views'});
});

io.on('connection', function(socket){
    socket.on('disconnect', function() {
        if (socket.id === master_socket) {
            io.emit('master disconnect');
            master_socket = null;
            connected_clients = [];
        } else {
            connected_clients.pop(socket.id);
        }
    });

    socket.on('connect server', function(msg){
        master_socket = socket.id;
    });

    socket.on('connect client', function(msg){
        if (connected_clients.length > 3) {
            return console.log('Can not deal with more than 4 clients');
        }
        connected_clients.push(socket.id);
        io.to(socket.id).emit('client index', connected_clients.length);
    });

    socket.on('client tap', function(msg) {
        io.to(master_socket).emit('client interaction', connected_clients.indexOf(socket.id) + 1);
    })
});

server.listen(port, function() {
    console.log('listening on *:' + port);
});
