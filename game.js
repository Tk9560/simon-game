//alert("Hello");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click( function() {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
	//console.log($(this).attr("id"));
	//console.log(userClickedPattern);
	//console.log(userChosenColour);
    });


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        
        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(120).fadeOut(120).fadeIn(120);
    playSound(randomChosenColor);
    //console.log(level);
    //console.log(randomChosenColor);
    //console.log(gamePattern);   
}

// reset value to start over..
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// add pressed class when user clicks on the button..
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    window.setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

// play the selected sound by taking the name of the audio as input..
function playSound(name) {
	var audioElement = new Audio("sounds/"+name+".mp3");
	audioElement.play(); 
}

