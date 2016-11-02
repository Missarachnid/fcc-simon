/*User Story: I am presented with a random series of button presses.
User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
User Story: I can see how many steps are in the current series of button presses.
User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.
User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.*/
$(document).ready(function() {

  var game = {
    //variables
    score: $("#score"),
    strict: false,
    playerTurn: false,
    powerOn: false,
    gameStart: false,
    gameMoves: [],
    gameSequence: [],
    screenStart: "--",
    level: 1,
    moveCount: 0,

    sounds: {
      sound1: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      sound2: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      sound3: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      sound4: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
      winSound: new Audio("https://crossorigin.me/http://www.mmkepler.com/other/321918__bboyjoe-15__you-win.mp3"),
      loseSound: new Audio("https://crossorigin.me/http://www.mmkepler.com/other/234257__makkuzu__gameover.mp3"),
      wrongMove: new Audio("https://crossorigin.me/http://www.mmkepler.com/other/171494__fins__error.wav")
    },

    func: {
      arrayCreate: function() {
        var count = 20;
        while (count > 0) {
          var num = Math.floor((Math.random() * 4) + 1);
          game.gameMoves.push(num);
          count--;
        }
        console.log(game.gameMoves);
      },
      yellow: function() {
        game.sounds.sound1.play();
        $("#yellow").animate({
          opacity: "0.1"
        }, 100).animate({
          opacity: "1"
        }, 1000);
      },
      green: function() {
        game.sounds.sound2.play();
        $("#green").animate({
          opacity: "0.1"
        }, 100).animate({
          opacity: "1"
        }, 1000);
      },
      red: function() {
        game.sounds.sound3.play();
        $("#red").animate({
          opacity: "0.1"
        }, 100).animate({
          opacity: "1"
        }, 1000);
      },
      blue: function() {
        game.sounds.sound4.play();
        $("#blue").animate({
          opacity: "0.1"
        }, 100).animate({
          opacity: "1"
        }, 1000);
      },
      gameOver: function() {
        game.sounds.loseSound.play();
        game.score.html(game.screenStart);
        setTimeout(game.func.reset, 3000)();
      },
      winGame: function() {
        game.sounds.winSound.play();
        game.score.html(game.screenStart);
        setTimeout(game.func.reset, 3000)();
      },
      reset: function() {
        game.level = 1;
        game.score.html(game.screenStart);
        game.gameMoves = [];
        game.gameSequence = [];
        game.playerTurn = false;
        game.func.arrayCreate();
      },
      checkMatch: function(item) {
        //console.log(item + " item");
        //console.log(game.gameSequence[game.moveCount] + " gameSequence at move count");
        console.log(game.moveCount + " move count at input");
        if (parseInt(item) === parseInt(game.gameSequence[game.moveCount])) {
          game.moveCount++;
          console.log(game.moveCount + " Move count at output");
          console.log("is equal");
          if (game.level === game.gameMoves.length && game.moveCount === game.gameMoves.length) {
            game.func.winGame();
          } else if (game.moveCount === game.gameSequence.length && game.level < game.gameMoves.length) {
            game.playerTurn = false;
            game.func.nextTurn();
            game.moveCount = 0;
          }
        } else if (parseInt(item) !== parseInt(game.gameSequence[game.moveCount])) {
          console.log("is not equal");
          if (game.strict === true) {
            game.func.gameOver();
          } else {
            game.sounds.wrongMove.play();
            game.playerTurn = false;
            game.func.animator();
          }
        }
      },
      nextTurn: function() {
        game.level++;
        game.score.html(game.level);
        game.func.animator();
      },
      animator: function() {
        setTimeout(function() {
          game.playerTurn = false;
          game.gameSequence = game.gameMoves.slice(0, game.level);
          console.log(game.gameSequence);
          for (var i = 0; i <= game.gameSequence.length - 1; i++) {
            if (game.powerOn === false) {
              return false;
            }
            (function myDelay(n) {
              var temp = game.gameSequence[n];
              var speed;
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
              
            if(n === game.gameSequence.length - 1){
              game.playerTurn = true;
            }
            })(i);

            
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
      squareToggle: function(){
        if($(".square").prop("disabled")){
          $(".square").prop("disabled", false);
        }else {
          $(".square").prop("disabled", true);
        }
      }
    },
    buttons: {
      yellowClick: $("#yellow").click(function() {
        //if(game.playerTurn === true){
        //game.func.yellow();
        //game.func.checkMatch(1);
        //} else {
        //return false;
        //}

        game.func.yellow();
        game.func.checkMatch(1);
      }),
      greenClick: $("#green").click(function() {

        //if(game.playerTurn === true){
        //game.func.green();
        //game.func.checkMatch(2);
        //} else {
        // return false;
        //}

        game.func.green();
        game.func.checkMatch(2);

      }),
      redClick: $("#red").click(function() {

        //if(game.playerTurn === true){
        // game.func.red();
        //game.func.checkMatch(3);
        //} else {
        //return false;
        //}

        game.func.red();
        game.func.checkMatch(3);
      }),
      blueClick: $("#blue").click(function() {

        //if(game.playerTurn === true){
        //game.func.blue();
        //game.func.checkMatch(4);
        //} else {
        //return false;
        //}

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
          $(".light").css("background-color", "black");
          game.func.reset();
          game.score.empty();
        }
      })
    }
  };

  if(game.playerTurn){
    $(".square").attr("disabled", false);
  } else if(game.playerTurn === false) {
    $(".square").attr("disabled", true);
  }

});

//make disable line up with animation time
//Is it possible to put an if/else in at the end of the for to set playerTurn to true?
//add timeout for player turn