var GameEngine = GameEngine || {
    movePlayerToPosition: function(position) {
        document.body.innerHTML = position;
    }
};

window.addEventListener('load', function() {
    var socket = io();
    socket.emit('connect server');

    socket.on('client interaction', GameEngine.movePlayerToPosition);
});
