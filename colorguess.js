/* app needs to be refactored as well as the structure pattern needs improving */

var colors = []; /* calls the function that generates random colors and stores it the colors variable */
var squares = document.querySelectorAll(".square");
var pickedColor; /* stores the chosen color in a variable */
var colorDisplay = document.querySelector("#colorDisplay"); /* allows us to edit the content of the RGB span */
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode"); /* variable that controls the functionality of easy and hard mode buttons */
var numSquares = 6;/* keeps track of game mode setting (easy or hard) does this by acting as a variable that each mode button assigns a number of squares to */

init();

/* functionality behind mode buttons is established upon the page loading */
function init(){
	for (var i = 0; i < modeButtons.length; i++){ 
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
		/* figures out how many squares to show */
			this.textContent === "EASY" ? numSquares = 3: numSquares = 6; /* ternerary operator replaces else if statement */
		/* pick new colors */
		/* pick a new pickecColor */
		/* update page to reflect changes */
			reset()
		});
	}
	
		for(var i = 0; i < squares.length; i++){ /* loops through the colors array, allowing events to be applied to all squares at once */
			/* adds click event to individual squares */
			squares[i].addEventListener("click" , function(){
			/* collect color of clicked square */
			var clickedColor = this.style.backgroundColor;
			/*compare clicked color to pickedColor */
			if(clickedColor === pickedColor){ /* sets events to occur if user is correct */
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"; /* changes button text upon a win */
				changeColors(clickedColor); /* stores the clicked winning color value */
				h1.style.backgroundColor = clickedColor; /* changes the h1 background to the winning color */
			} else { /* sets events to occur if user is wrong */
				this.style.backgroundColor = "rgb(0, 0, 0)";
				messageDisplay.textContent = "Try again";
			}
		});
	}

	reset();
}
/* stores all the logic behind generating new colors depending on the mode selected */
function reset(){
	colors = generateRandomColors(numSquares);
	/* pick a new random color from array */
	pickedColor = pickColor();
	/* change colorDisplay to match the picked color */
	colorDisplay.textContent = pickedColor;
	/* change the color of the squares */
	for(var i = 0; i < squares.length; i++){
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "rgb(145, 58, 55)"; /* resets colored stripe back to black upon the game being reset */
	resetButton.textContent = "New colors"; /* changes play again back to new colors */
	messageDisplay.textContent = ""; /* hides the display upon a new game being started */
}

/* functionality of reset button */
resetButton.addEventListener("click" , function(){  /* logic for button that will reset the game */
	reset();
});

colorDisplay.textContent = pickedColor; /* sets the content of the displayed RGB value to that of a chosen color */

function changeColors(color){ /* separate function that changes all colors to match the winning color */
	/* loop through all squares to change their color to match winning color */
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	/* picks random number */
	var random = Math.floor(Math.random() * colors.length); /* selects a random number specified in the colors array */
	return colors[random]; /* allows us to use the returned value */
}

function generateRandomColors(num){ /* generates the array to be used by the colors variable */
	/* create an array */
	var arr = []
	/* add num random colors to array */
	for (var i = 0; i < num; i++) {
	/* get random color from randomColor function and push it into the array variable */
		arr.push(randomColor())
	}
	/* return the generated array */ 
	return arr;
}

function randomColor(){ /* function to be called by generateRandomColors to create the colors used*/
	/* pick a red from 0 - 255 */
	var r = Math.floor(Math.random() * 256);
	/* pick a green from 0 - 255 */
	var g = Math.floor(Math.random() * 256);
	/* pick a blue from 0 - 255 */
	var b = Math.floor(Math.random() * 256);
	/* generate a color and store it for later use */
	return "rgb(" + r + ", " + g + ", " + b + ")";
}