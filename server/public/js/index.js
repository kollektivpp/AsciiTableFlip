var GameEngine = GameEngine || {
    initialize: function() {
        var self = this;
        self.MAX_ELEMENTS = 100;
        self.gameGrid = self.createGrid();
        self.gameBoard = $('#gameBoard');
        self.gameTickCounter = 0;
        self.score = 0;
        self.gamerPosition = 0;
        self.positionDivs = document.querySelectorAll('#playerStage div');
        self.tickSpeed = 500;

        self.movePlayerToPosition(1);
        $('#gameBoard').html(self.createGameBoard(self.gameGrid));
    },
    startGameLoop: function() {
        var self = GameEngine;
        self.gameLoop = setInterval(function() {
          if (self.gameTickCounter >= self.MAX_ELEMENTS) {
            clearInterval(self.gameLoop);
            return;
          }
        //   console.log(self.gameGrid[self.gameTickCounter]);
          if (self.gameGrid[self.gameTickCounter] == self.gamerPosition) {
            self.score++;
            console.log("Boooom");
          }

          self.gameBoard.animate({
              top: "+=41"
          }, self.tickSpeed);

          self.gameTickCounter++;
        }, self.tickSpeed);
    },
    movePlayerToPosition: function(position) {
        GameEngine.gamerPosition = position;
        $('#playerStage div').text('');
        GameEngine.positionDivs[position - 1].innerText = 'hier';
    },
    createGrid: function() {
        var grid = [];
        for (var index = 0; index < this.MAX_ELEMENTS; index++) {
            grid[index] = Math.floor((Math.random() * 5) + 0);
        }
        console.log(grid);
        return grid;
    },
    createGameBoard: function(gameBoardGrid) {
        var grid = '';
        for (var index = 0; index <= gameBoardGrid.length; index++) {
            grid += this.createRow(index, gameBoardGrid[index]);
        }
        return grid;
    },
    createRow: function(position, tablePosition) {
        var row = '<div class="row">';
        for (var index = 0; index <= 3; index++) {
            row += this.createColumn(index == tablePosition);
        }
        return row + '</div>';
    },
    createColumn: function(hasTable) {
        return '<div class="column">' + (hasTable ? 'X' : '') + '</div>'
    }
};

window.addEventListener('load', function() {
    var socket = io();
    socket.emit('connect server');

    GameEngine.initialize();
    socket.on('client interaction', GameEngine.movePlayerToPosition);
});
