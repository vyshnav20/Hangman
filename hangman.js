//Define Elements in Categories by Dificulty/Length (Not Including Spaces, Vowels, or Repeated Letters)
var mal_actors = ["Thilakan","Mohanlal","Mammootty","Sreenivasan","Jagathi Sreekumar","Nedumudi Venu","Dileep","Prem Nazir","Manoj K Jayan","Innocent","Fahadh Fassil","Jaysurya","Mukesh","Jayaram","Prithviraj","Suresh Gopi","Siddique","Murali Gopi","Dulquer Salmaan","Nivin Pauly","Suraj Venjaramoodu","Biju Menon","Salim Kumar","Kunchacko Boban","Jayan","Indrajith","Salim Kumar","Vinayakan","Mniyanpilla Raju","Asif Ali","Aju Vargheese","Roshan Mathew","Anthony Varghese Pepe","Tovino Thomas","Soubin Shahir"];
var mal_movies = ["Sandesham","Kireedam","Manichitrathazhu","Nadodikattu","Home","Kumbalangi Nights","Devasuram","Chithram","Spadikam","Kilukkam","Godfather","Drishyam","Thaniyavarthanam","Yoddha","Premam","Banglore Days","Maheshinte Prathikaaram","Thanmathra","Bharatham","Namukku Parakkan Munthiri Thoppukal","Ustad Hotel","The Great Indian Kitchen","Pranchiyettan and the Saint","Take Off","Thondi Muthalum Driksakshiyum","Sudani From Nigeria","Oru CBI Diary Kurippu","Pattanapravesam","Classmates","Lucifer","Pulimurugan","Malik","Uyare","Joseph","Kammatti Paadam"];
var ind_cricket = ["Sachin Tendulkar","Rahul Dravid","Sourav Ganguly","Kapil Dev","Mahendra Singh Dhoni","Virat Kohli","Anil Kumble","Harbhajan Singh","Gautham Gambhir","Zaheer Khan","Virendra Sehwag","Yuvraj Singh","Rohit Sharma","Shikhar Dhawan","Ravichandran Ashwin","Jasprit Bumrah","Ajinkya Rahane","Suresh Raina","Ravindra Jadeja","Hardik Pandya","Irfan Pathan","Cheteshwar Pujara","Bhuvneshwar Kumar","Mohammed Shami","Ishant Sharma","Ashish Nehra","K L Rahul","Suryakumar Yadav","Ambati Rayudu","Kuldeep Yadav","Dinesh Karthik","Yuzvendra Chahal","Wriddhiman Saha","Partiv Patel","S Sreesanth"];
var holly = ["The Shawshank Redemption","The Godfather","The Dark Knight","Interstellar","Modern Times","The Lion King","Casablanca","Once upon a time in the  West","The Great Dictator","Avengers Infinity War","Captain America the Winter Soldier","Avengers Endgame","Gaurdian of the Galaxy","Avatar","Inception","Shang Chi And The Lengeds Of the Ten Rings","Joker","A Space Odyssey","Titanic","Mission Impossible","Spider Man Homecoming","Sherlock Holmes","Star Wars","Skyfall","Alvin and the Chimpmunks","Casino Royale","Sword of The Stranger","Pirates of the Caribbean","The Curious Case of Benjamin Button","Shutter Island","Pulp Fiction","Black Hawk Down","American Psycho","Children of Men"];

//Concatenate Arrays into Categorys Array
var categories = [mal_actors, mal_movies,ind_cricket, holly];

//Declare the rest of the variables
var char;
var charIndex;
var canvas;
var context;
var hangOrder;
var show;
var triesLeft;
var word;
var random;
var id;
var category;
var newWord;
var gameEnded;


//Define functions to "filter" through the word
function regexEscape(char) {
	return char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').toLowerCase();
}

function replace(c, a) {
	var regex = new RegExp("[^ " + a + "]", 'ig');
	return c.replace(regex, "_");
}

$(".category").click(function() {
	//Reset variables
	show = "";
	triesLeft = 5;
	gameEnded = false;

	//Reset Keyboard
	$("#keyboard").html('<div><span id="a" class="vowel">a</span><span id="b">b</span><span id="c">c</span><span id="d">d</span><span id="e" class="vowel">e</span><span id="f">f</span><span id="g">g</span><span id="h">h</span><span id="i" class="vowel">i</span><span id="j">j</span><span id="k">k</span><span id="l">l</span><span id="m">m</span></div><div><span id="n">n</span><span id="o" class="vowel">o</span><span id="p">p</span><span id="q">q</span><span id="r">r</span><span id="s">s</span><span id="t">t</span><span id="u" class="vowel">u</span><span id="v">v</span><span id="w">w</span><span id="x">x</span><span id="y">y</span><span id="z">z</span></div>');

	//Get random category
	id = $(this).attr("id");
	random = Math.floor(Math.random() *35);
	var song = new Audio();
	song.src = 'strt.mp3';
	song.play();
	word = categories[id][random];
	category = $(this).html();

	//Get HTML ready for user to start playing
	$("#infoSign").fadeIn();
	$("#initialInfo").fadeOut('fast');
	$("#game").fadeIn();
	$("#triesLeft").html("Tries Left: " + (triesLeft));
	$("title").html(category + " - Hangman");
	$("#category").html("<strong>Category:</strong> " + category);
	$("#word").html(replace(word, show));
	makeHangman(0);

	//Remove description box
	$(".static").removeClass("static");
	$("body").off('keypress').on('keypress', function(event) {
		if (!gameEnded) {
			var keyCode = (event.which) ? event.which : event.keyCode;
			if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32) 
			{
				playsound();
				//$("#status").html('<div class="alert alert-warning"><strong>Warning: </strong>There aren\'t any numbers, puncuation characters, or special characters in the word, only letters.</div>');
			} else {
				var song = new Audio();
		song.src = 'key.wav';
		song.play();
				playHangman(regexEscape(String.fromCharCode(event.which)));
			}
		}

	});

	$("#keyboard span").click(function() {
		if (!gameEnded) {
			playHangman($(this).html());
		}
	});
});

function playHangman(char) {
	$("#status").html("");
	$("#" + char).css("background-color", "#23527c").css("color", "#EEE");
	newWord = replace(word, show + char);

	if (newWord === word) {

		$("#status").html('<div class="alert alert-success"><strong>You Won!</strong><span class="pull-right">Select a category to play again.</span></div>');
		var song = new Audio();
				song.src = 'win.wav';
				song.play();

		var song = new Audio();
		song.src = 'continue.mp3';
		song.play();
		$("#keyboard span").css("background-color", "green");
		gameEnded = true;
	} else if (newWord == $("#word").html()) {
		if (show.indexOf(char) > -1) {
			if (char === "a" || char === "e" || char === "i" || char === "o" || char === "u") {
				var song = new Audio();
				song.src = 'already.mp3';
				song.play();
				$("#status").html('<div class="alert alert-warning center"><strong>Warning: </strong>You have already guessed that letter.</span>');
				
			} else {
				var song = new Audio();
				song.src = 'already.mp3';
				song.play();
                $("#status").html('<div class="alert alert-warning center"><strong>Warning: </strong>You have already guessed that letter.</span>');
			}
		} else {
			--triesLeft;
			if(triesLeft===1){
				var song = new Audio();
				song.src = 'try.mp3';
				song.play();
			}
			makeHangman(triesLeft);
			
				
			if (triesLeft === 0) {
				var song = new Audio();
						song.src = 'gameover.wav';
						song.play();
				
				var song = new Audio();
				song.src = 'continue1.mp3';
				song.play();
				$("#status").html('<div class="alert alert-danger"><strong>Game Over!</strong><span class="pull-right">Select a category to play again.</span></div>');
                
				$("#triesLeft").html("");
				newWord = newWord.split('');
				for (var i = 0; i <= newWord.length - 1; ++i) {
					if (newWord[i] === "_") {
						newWord[i] = '<span class="red">' + word[i] + '</span>';
					}
				}
				gameEnded = true;
				makeHangman(5);
				$("#keyboard span").css("background-color", "red");
			} else {
				$("#status").html('<div class="alert alert-danger center"><strong>Try Again</strong></div>');
				makeHangman(Math.abs(5 - triesLeft));
			}
		}
	} else {
		$("#status").html('<div class="alert alert-success center"><strong>Nice!</strong></div>');
	}
	show = show + char;
	$("#word").html(newWord);
	$("#triesLeft").html("Tries Left: " + triesLeft);
}

//Define Functions to create hangman
function drawBottomGallow() {
	context.beginPath();
	context.moveTo(250, 300);
	context.lineTo(0, 300);
	context.lineTo(70, 300);
	context.stroke();
};

function drawTopGallow() {
	context.beginPath();
	context.lineTo(70, 300);
	context.lineTo(70, 10);
	context.lineTo(200, 10);
	context.lineTo(200, 50);
	context.stroke();
};

function drawHead() {
	context.beginPath();
	context.arc(200, 80, 30, 0, Math.PI * 2, true);
	context.closePath();
	context.lineWidth = 4;
	context.stroke();
};

function drawBody() {
	context.beginPath();
	context.moveTo(200, 110);
	context.lineTo(200, 225);
	context.stroke();
};

function drawHands() {
	context.beginPath();
	context.moveTo(200, 125);
	context.lineTo(150, 175);
	context.stroke();

	context.beginPath();
	context.moveTo(200, 125);
	context.lineTo(250, 175);
	context.stroke();
};

function drawFeet() {
	context.beginPath();
	context.moveTo(200, 225);
	context.lineTo(150, 275);
	context.stroke();

	context.beginPath();
	context.moveTo(200, 225);
	context.lineTo(250, 275);
	context.stroke();
};

function makeHangman(a) {
	hangOrder = [drawBottomGallow, drawTopGallow, drawHead, drawBody, drawHands, drawFeet];
	canvas = $('#hangman')[0];
	context = canvas.getContext("2d");
	canvas.width = canvas.width;
	context.strokeStyle = '#000000';
	context.lineWidth = 8;

	for (var i = 0; i <= a; ++i) {
		hangOrder[i]();
	}
};