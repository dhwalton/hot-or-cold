// global variables / constants
var targetMax = 100;
var target;

// generates a random number from 1 to a max
function randomInt(max) {
	 return Math.floor((Math.random() * max) + 1); ;
}

// new game initialization
function newGame() {
	// get new target number
	target = randomInt(targetMax);

	// reset the fields
	$('span#count').text("0");
	$('input#guessButton').val("Guess");
	$('input#userGuess').val("");
	$('h2#feedback').text("Make your Guess!");
	$('ul#guessList').children().remove();

	console.log("Game started with target: " + target);
}

// test a user's guess against the target and return a response
function testNumber(userInput) {
	var difference = Math.abs(target - userInput);
	console.log("User Input: " + userInput + "; target:" + target + "; difference: " + difference);
	switch(true) {
		case (difference == 0):
			return "YOU ARE THE WINNER!!!";
			break;
		case (difference < 2):
			return "You're on fire!"
			break;
		case (difference < 5):
			return "You're burning up!";
			break;
		case (difference < 10):
			return "It's like a sauna in here.";
			break;
		case (difference < 15):
			return "Kinda warm...";
			break;
		case (difference < 20):
			return "Kinda cool...";
			break;
		case (difference < 30):
			return "Chilly!";
			break;
		case (difference < 40):
			return "Frosty!";
			break;
		case (difference < 50):
			return "ICE, ICE, BABY";
			break;
		default:
			return "That guess gave me hypothermia.";
			break;
	}
}

$(document).ready(function(){
	console.log("Document Loaded");

	// initialize new game on load
	newGame();

	// click the "+new game" link for a new game
	$("a.new").click(function(){
		newGame();
	});

	// "Guess" button click event
	$("input#guessButton").click(function(e){
		// prevent page from reloading
		e.preventDefault();

		if ($('input#guessButton').val() == "Guess") {
			// take user input
			var guess = parseInt($('input#userGuess').val());

			if (guess >= 1 && guess <= targetMax) {
				// increment the counter
				$('span#count').text(parseInt($('span#count').text())+1);
				// display feedback
				$('h2#feedback').text(testNumber(guess));	
				// record guess
				$('ul#guessList').append("<li>"+guess+"</li>");
				// clear user input
				$('input#userGuess').val("");
			} else {
				alert("Enter a number between 1 and 100!")
			}

			// Change button text if the game was won
			if (guess == target) {
				$('input#guessButton').val("New Game");
			}

		} else if ($('input#guessButton').val() == "New Game") {
			// game has been won, the button will start a new game
			newGame();
		}
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});
