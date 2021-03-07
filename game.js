
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

// when key is pressed call nextSequence to start the game
// and display the game level
$(document).keydown(function(){
  $("h1").text("Level " + level);
  nextSequence();
  started = true;
});

// Get the clicked button
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  // push the clicked button text to the userClickedPattern array
  userClickedPattern.push(userChosenColour);

  // play the clicked button audio
  playSound(userChosenColour);

  // animate the clicked buton audio
  animatePress(userChosenColour);

  // call checkAnswer
checkAnswer(userClickedPattern.length-1);

});

// check answer
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
      $(document.body).addClass("game-over");
      setTimeout(function(){
      $(document.body).removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      startOver();
    }
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("level " + level)

  // get a random color from the buttonColours array
  // and push it to the gamePattern Array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate the chosen color and play sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // increase level

}

// get the color audio from the sound files
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animate the clicked button audio funnction
function animatePress(currentColor) {

  //add pressed class to the button that gets clicked.
  $("#" + currentColor).addClass("pressed");

  //3. remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver(){
  level = 0;
  gamePatter = [];
  started = false;
}
