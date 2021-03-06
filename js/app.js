/*User Story: I am presented with a random series of button presses.
User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
User Story: I can see how many steps are in the current series of button presses.
User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.*/
$(document).ready(function() {

  "use strict";
  
  var game = {
    //variables
    score: $("#score"),
    strict: false,
    powerOn: false,
    gameMoves: [],
    gameSequence: [],
    screenStart: "--",
    level: 1,
    moveCount: 0,
    sounds: {
      /*sound1: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      sound2: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      sound3: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      sound4: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
      winSound: new Audio("https://raw.githubusercontent.com/Missarachnid/fcc-simon/gh-pages/audio/you_win.mp3"),
      loseSound: new Audio("https://raw.githubusercontent.com/Missarachnid/fcc-simon/gh-pages/audio/game_over.mp3"),
      wrongMove: new Audio("https://raw.githubusercontent.com/Missarachnid/fcc-simon/gh-pages/audio/error.wav")*/
      sound1: $("#sound1")[0],
      sound2: $("#sound2")[0],
      sound3: $("#sound3")[0],
      sound4: $("#sound4")[0],
      winSound: $("#winSound")[0],
      loseSound: $("#loseSound")[0],
      wrongMove: $("#wrongMove")[0]
    },
    func: {
      arrayCreate: function() {
        var count = 20;
        while (count > 0) {
          var num = Math.floor((Math.random() * 4) + 1);
          game.gameMoves.push(num);
          count--;
        }
      },
      yellow: function() {
        if(game.powerOn === true){
          game.sounds.sound1.play();
          $("#yellow").animate({
            opacity: "0.1"
          }, 100).animate({
            opacity: "1"
          }, 1000);
        }else{
          return false;
        }
      },
      green: function() {
        if(game.powerOn === true){
          game.sounds.sound2.play();
          $("#green").animate({
            opacity: "0.1"
          }, 100).animate({
            opacity: "1"
          }, 1000);
        }else{
          return false;
        }
      },
      red: function() {
        if(game.powerOn === true){
          game.sounds.sound3.play();
          $("#red").animate({
            opacity: "0.1"
          }, 100).animate({
            opacity: "1"
          }, 1000);
        }else{
         return false;
        }
      },
      blue: function() {
        if(game.powerOn === true){
          game.sounds.sound4.play();
          $("#blue").animate({
            opacity: "0.1"
          }, 100).animate({
            opacity: "1"
          }, 1000);
        }else{
          return false;
        }
      },
      gameOver: function() {
        game.sounds.loseSound.play();
        game.score.html(game.screenStart);
        setTimeout(function(){
          game.func.reset();
          game.score.html(game.level);
          game.func.animator();
        }, 4000);
      },
      winGame: function() {
        game.sounds.winSound.play();
        game.score.html(game.screenStart);
         setTimeout(function(){
          game.func.reset();
          game.score.html(game.level);
          game.func.animator();
        }, 4000);
      },
      reset: function() {
        game.level = 1;
        game.score.html(game.screenStart);
        game.gameMoves = [];
        game.gameSequence = [];
        game.playerTurn = false;
        game.func.disableColors();
        game.func.arrayCreate();
      },
      checkMatch: function(item) {
        if (parseInt(item) === parseInt(game.gameSequence[game.moveCount])) {
          game.moveCount++;
          if (game.level === game.gameMoves.length && game.moveCount === game.gameMoves.length) {
            game.func.winGame();
          } else if (game.moveCount === game.gameSequence.length && game.level < game.gameMoves.length) {
            game.func.nextTurn();
          }
       } else if (parseInt(item) !== parseInt(game.gameSequence[game.moveCount])) {
          
          if (game.strict === true) {
            game.func.gameOver();
          } else {
            game.sounds.wrongMove.play();
           game.func.wrongTurn();
          }
        }
      },
      nextTurn: function() {
        game.level++;
        game.moveCount = 0;
        game.score.html(game.level);
        game.func.disableColors();
        setTimeout(game.func.animator, 1500);
      },
      wrongTurn: function() {
        game.moveCount = 0;
        game.func.disableColors();
        setTimeout(game.func.animator, 1500);
      },
      myDelay: function(n) {
        var temp = game.gameSequence[n];
        var speed;
          if(game.powerOn !== false){
          if (game.level < 5) {
            speed = 1300;
          } else if (game.level >= 5 && game.level < 9) {
            speed = 1100;
          } else if (game.level >= 9 && game.level < 13) {
            speed = 900;
          } else {
            speed = 750;
          }

            switch (temp) {
              case 1:
                window.setTimeout(game.func.yellow, speed * n);
                break;
              case 2:
                window.setTimeout(game.func.green, speed * n);
                break;
              case 3:
                window.setTimeout(game.func.red, speed * n);
                break;
              case 4:
                window.setTimeout(game.func.blue, speed * n);
                break;
            }
          
        }else{
          return false;
        }
      },
      animator: function() {
        setTimeout(function() {
          game.gameSequence = game.gameMoves.slice(0, game.level);
            for (var i = 0; i <= game.gameSequence.length - 1; i++) {
              if(game.powerOn === true){
                game.func.myDelay(i);
              }else{
                return false;
              }
              if (i === game.gameSequence.length - 1) {
                game.playerTurn = true;
                game.func.enableColors();
              }else{
                game.func.disableColors();
              }
          }
        }, 1500);
      },
      disableToggle: function() {
        if ($(".choice").prop("disabled")) {
          $(".choice").prop("disabled", false);
        } else {
          $(".choice").prop("disabled", true);
        }
      },
      disableColors: function() {
        $("#green, #yellow, #red, #blue").prop("disabled", true);
      },
      enableColors: function() {
        $("#green, #yellow, #red, #blue").prop("disabled", false);
      }
    },
    buttons: {
      yellowClick: $("#yellow").click(function() {
        game.func.yellow();
        game.func.checkMatch(1);
      }),
      greenClick: $("#green").click(function() {
        game.func.green();
        game.func.checkMatch(2);
      }),
      redClick: $("#red").click(function() {
        game.func.red();
        game.func.checkMatch(3);
      }),
      blueClick: $("#blue").click(function() {
        game.func.blue();
        game.func.checkMatch(4);
      }),
      startClick: $("#start").click(function() {
        game.func.reset();
        game.score.html(game.level);
        game.func.animator();
      }),
      strictClick: $("#strict").click(function() {
        if (game.strict === false) {
          game.strict = true;
          $(".light").css("background-color", "yellow");
        } else {
          game.strict = false;
          $(".light").css("background-color", "black");
        }
      }),
      onOffClick: $("#onOff").click(function() {
        if (game.powerOn === false) {
          game.score.html(game.screenStart);
          game.func.disableToggle();
          game.powerOn = true;

        } else {
          game.powerOn = false;
          game.func.disableToggle();
          game.func.disableColors();
          $(".light").css("background-color", "black");
          game.func.reset();
          game.score.empty();
        }
      })
    }
  };
});
