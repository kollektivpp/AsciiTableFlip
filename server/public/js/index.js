var GameEngine = GameEngine || {
    initialize: function() {
        var self = this;
        self.MAX_ELEMENTS = 100;
        self.gameGrid = self.createGrid();
        self.gameTickCounter = 0;
        self.score = 0;
        self.gamerPosition = 1;

        self.intro();
    },
    startGame: function() {
        var self = this;
        $('#gameBoard').show();
        $('#gameBoard').html(self.createGameBoard(self.gameGrid));

        self.gameLoop = setInterval(function() {
          if (self.gameTickCounter >= self.MAX_ELEMENTS) {
            clearInterval(self.gameLoop);
            return;
          }
          if (self.gameGrid[self.gameTickCounter] == self.gamerPosition) {
            self.score++;
            self.setScore(self.score);
          }
          self.gameTickCounter++;
        }, 500);
    },
    setScore: function(value) {
            $('#scoreValue').html(value);
    },
    movePlayerToPosition: function(position) {
        document.body.innerHTML = position;
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
    },
    displayDance: function(elem) {
        $(elem).show();
        var danceCounter = 0;
        this.danceInterval = setInterval(function() {
            var anim = [
                '╰(&#8226;.&#8226;╭）',
                '╰( &#8226;.&#8226; ）╯',
                '(╮&#8226;.&#8226;）╯',
                '~(‾▿‾~)',
                '(~‾▿‾)~',
                '~(‾▿‾~)',
                '╰(‾◇‾)╮',
                '╭(‾◇‾)╮',
                '╭(‾◇‾)╯',
                '╰( &#8226;.&#8226; ）╯'
            ];
            $(elem).html(anim[danceCounter]);
            danceCounter++;
            if (danceCounter > 9) {
                danceCounter = 0;
            }
        }, 300);
    },
    displayDino: function() {

    },
    displayRage: function(elem) {
        var rageCounter = 0;
        this.rageInterval = setInterval(function() {
            var anim = [
                '╰(ಠ益ಠ）╯',
                '╮(ಠ益ಠ）╮'
            ];
            $(elem).html(anim[rageCounter]);
            rageCounter++;
            if (rageCounter > 1) {
                rageCounter = 0;
            }
        }, 200);
    },
    intro: function() {
        var done = false;
        var counter = 0;
        var self = this;

        self.introInterval = setInterval(function() {
            if (done) {
                clearInterval(self.introInterval);
                return;
            }
            switch(counter) {
                case 0:
                    $('#onceATime').hide();
                    self.displayDance($('#dance'));
                    break;
                case 1:
                    $('#dance').hide();
                    clearInterval(self.danceInterval);
                    $('#asciiErrorWrapper').show();
                    break;
                case 2:
                    $('#asciiErrorWrapper').hide();
                    self.displayRage($('#rage'));
                    $('#rage').show();
                    break;
                case 3:
                    $('#rage').hide();
                    clearInterval(self.rageInterval);
                    self.startGame();
                    done = true;
                    break;
            }

            counter++;
        }, 5000);
    }
};

window.addEventListener('load', function() {
    var socket = io();
    socket.emit('connect server');

    socket.on('client interaction', GameEngine.movePlayerToPosition);
    GameEngine.initialize();
});
