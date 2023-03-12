const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
const title = $("#level-title");
let started = false;
let level = 0;
let playNewSound;

$(document).ready().keydown(function(){
    if(!started){
        title.text("Level " + level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function(e){

    const userChosenColour = e.target.id;

    userClickedPattern.push(userChosenColour);

    $("#"+ userChosenColour).fadeOut(100).fadeIn(100);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);

    console.log(userClickedPattern);
});

function playSound(name){
    playNewSound = new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    title.text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    playNewSound = new Audio("sounds/" + randomChosenColour + ".mp3").play();
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
                setTimeout(function(){
                    nextSequence();
            },1000);
        }
    }
    else{
        title.text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");    
        },200);
        new Audio("sounds/wrong.mp3").play();
        startOver();
        
    }
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}

