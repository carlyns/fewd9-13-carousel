// define function to get the images to change to next on click
function imageToVoteOn () {
$('#image-to-vote-on').attr('src','images/' + allImages[currentPosition]); // for some reason, I can't replace allImages[currentPosition] with currentImage variable of the same thing
	console.log(allImages[currentPosition]);
}

// store images in an array
var allImages = ['image_1.jpg', 'image_2.jpg', 'image_3.jpg', 'image_4.jpg', 'image_5.jpg', 'image_6.jpg']


// assigning zero to the position
var currentPosition = 0 // essentially creating a variable to store the array POSITION. 
// var currentImage = allImages[currentPosition];  WHY DOESN'T THIS WORK?


// DISABLE PREV BUTTON FOR FIRST IMAGE
if (currentPosition == 0) {
	$("#prev").attr("disabled", "disabled");
}


function proceedToNextImage() {

	// if it's the first image, add attribute disabled="disabled" to button
	if (currentPosition == 5) {
		$("#next").attr("disabled", "disabled");
		imageToVoteOn(); // run which image to show
		currentPosition = 6;

		// CALCULATE AVERAGE HERE!
		calcAvg();

		// print the average message
		printMsg();


	}
	else {
		currentPosition += 1; 
		$("#prev").removeAttr("disabled");
		$("#next").removeAttr("disabled");
		imageToVoteOn(); // run which image to show
	}
} // so it can be called either on a click or on a storeScore dropdown.  

// ON CLICK FUNCTION for NEXT
$('#next').click(function(){
	proceedToNextImage();
	clearValue();


});


// DEFINE A VARIABLE TO HOLD THE SCORES AS AN ARRAY
// start off with a value of 0 for each score in the array
	var score1 = 0; 
	var score2 = 0; 
	var score3 = 0; 
	var score4 = 0; 
	var score5 = 0; 
	var score6 = 0;
	var allScores = [ score1, score2, score3, score5, score5, score6 ]; 



var score = 0; // set to zero at first

function grabScore () {
	imageScore = $('#your-vote').val();
	score = parseInt(imageScore);
}


// ON CHANGE OF THE DROPDOWN MENU  STORE THE SCORE that's been selected. 
$("#your-vote").change(function(){
	// when current position is 6, and there is a dropdown action, it should not proceed to next image.
	if (currentPosition == 6) { 
		currentPosition == 7; // trying to get last score to store
		grabScore();
		storeScore();
		calcAvg();

		// print the average message
		printMsg();
	}
	else {
		grabScore();
		proceedToNextImage();
		storeScore();
		console.log("pulled and converted, score is: " + score);
		clearValue();
	}

});
// when current position is 6, and there is a dropdown action, it should still show the last image / not proceed to next image.

function storeScore() {
		allScores.forEach(function(e,i){ // put this in the storeScore function, so that everytime the dropdown is used, the following runs: 
			
			// record the current score in the currentPosition in the array allScores
			allScores[currentPosition-1] = score;
		});
		console.log("score for currentPosition: " + currentPosition + ", should be the same: " + score);
}

function clearValue () {
	$('#your-vote').val(""); 
	imageScore = 0;
}

function calcAvg() { // SUM IS NOT CAPTURING THE LAST STORED VALUE IN THIS ARRAY.  whyyyyyyy :(
	// it's also printing before my other console.log messages.  hmmm.

	sum = allScores[0] + allScores[1] + allScores[2] + allScores[3] + allScores[4] + allScores[5]; // cant use score1 + score 2 etc bc those were never stored
	average = sum / allScores.length;
	console.log("Total SUM was: " + sum);
	console.log("Total AVERAGE was: " + average);
}
var average = 0; // make global
var sum = 0; // make global


function printMsg() {
	$('#score').html('You have reached the end. Average score was: ' + average);
}



// ON CLICK FUNCTION for PREVIOUS
$('#prev').click(function(){

	// if it's the first image, add attribute disabled="disabled" to button
	if (currentPosition == 1) {
		$("#prev").attr("disabled", "disabled");
		currentPosition -= 1; 
		imageToVoteOn(); // run which image to show
	}
	else if (currentPosition == 6) { // clear the message
		currentPosition -= 1; 
		imageToVoteOn(); // run which image to show
		$('#score').html('');
	}
	else {
		currentPosition -= 1; 
		$("#prev").removeAttr("disabled");
		$("#next").removeAttr("disabled");
		imageToVoteOn(); // run which image to show
	
	}
});
