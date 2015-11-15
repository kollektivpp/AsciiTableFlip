var GameEngine = GameEngine || {
    initialize: function() {
        var self = this;
        self.MAX_ELEMENTS = 30;
        self.gameGrid = self.createGrid();
        self.gameBoard = $('#gameBoard');
        self.gameTickCounter = 0;
        self.score = 0;
        self.gamerPosition = 0;
        self.positionDivs = document.querySelectorAll('#playerStage div');
        self.tickSpeed = 800;

		self.movePlayerToPosition(1);
        self.intro();

        self.backgroundMusic = null;

        self.audioContext = (function() {
            if (window.hasOwnProperty( 'webkitAudioContext' )) {
                return new webkitAudioContext();
            }
            else if (window.hasOwnProperty( 'AudioContext' )) {
                return new AudioContext();
            }
            else {
                console.log("This browser doesn't support the Web Audio API. Please use the current version of Chrome!");
            }
        })();

        self.loadAudio();
    },
    loadAudio: function() {
        var self = this;
        var request = new XMLHttpRequest();
          request.open('GET', '/sounds/background.mp3', true);
          request.responseType = 'arraybuffer';

          // Decode asynchronously
          request.onload = function() {
            self.audioContext.decodeAudioData(request.response, function(buffer) {
              self.backgroundMusic = buffer;
            });
          }
          request.send();
    },
    playBackgroundMusic: function() {
        var self = this;
        if (self.backgroundMusic !== null) {
            var source = self.audioContext.createBufferSource();
            source.loop = true;
            source.buffer = self.backgroundMusic;
            source.connect(self.audioContext.destination);
            source.start(0);
        }
    },
    startGame: function() {
        var self = this;
        $('#gameBoard').show();
        $('#playerStage').attr('style', 'display: -webkit-flex; display: flex');
        $('#gameBoard').html(self.createGameBoard(self.gameGrid));
        self.playBackgroundMusic();
    },
    startGameLoop: function() {
        var self = GameEngine;
        self.gameLoop = setInterval(function() {
          if (self.gameTickCounter >= self.MAX_ELEMENTS) {
            self.outro();
          }
          if (self.gameGrid[self.gameTickCounter] == self.gamerPosition) {
            self.score++;
            self.flipEm(GameEngine.positionDivs[position - 1]);
            self.setScore(self.score);
          }

          self.gameBoard.animate({
              top: "+=41"
          }, self.tickSpeed);

          self.gameTickCounter++;
        }, self.tickSpeed);
    },
    setScore: function(value) {
            $('#scoreValue').html(value);
    },
    movePlayerToPosition: function(position) {
        GameEngine.gamerPosition = position -1;
        $('#playerStage div').html('');
        GameEngine.basicMood(GameEngine.positionDivs[position - 1]);
    },
    createGrid: function() {
        var grid = [];
        for (var index = 0; index < this.MAX_ELEMENTS; index++) {
            if (index % 5 === 0) {
                grid[index] = 4;
            } else {
                grid[index] = Math.floor((Math.random() * 5) + 0);
            }
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
        return '<div class="column">' + (hasTable ? '┬─┬' : '') + '</div>'
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
                '╭(ಠ益ಠ）╮'
            ];
            $(elem).html(anim[rageCounter]);
            rageCounter++;
            if (rageCounter > 1) {
                rageCounter = 0;
            }
        }, 200);
    },
    flipEm: function(elem) {
        var flipEmCounter = 0;
        var self = this;
        clearInterval(self.basicMoodInterval);
        this.flipEmInterval = setInterval(function() {
            var anim = [
                '(╮°_°）╮  ┬─┬',
                '(╯°□°）╯︵ ┴─┴'
            ];
            $(elem).html(anim[flipEmCounter]);
            flipEmCounter++;
            if (rageCounter > 1) {
                clearInterval(self.flipEmInterval);
                self.basicMood(elem);
            }
        }, 200);
    },
    basicMood: function(elem) {
        var basicMoodCounter = 0;
        var self = this;
        this.basicMoodInterval = setInterval(function() {
            var anim = [
                '(╮°×°）╮',
                '(╮°o°）╮'
            ];
            $(elem).html(anim[basicMoodCounter]);
            basicMoodCounter++;
            if (basicMoodCounter > 1) {
                basicMoodCounter = 0;
            }
        }, 200);
    },
    outro: function() {
        var self = this;
        $('#gameBoard').hide();
        clearInterval(self.gameLoop);
        $('#outro').show();
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

    GameEngine.initialize();
    socket.on('client interaction', GameEngine.movePlayerToPosition);
});
