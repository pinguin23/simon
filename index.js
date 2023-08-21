
var arrGame = [];
var arrPlayer = [];
var level = 1;

$("body").click(function() {
	if(arrGame.length === 0){
		level = 1;
		initGame();
	}
})

$("div div").click(function (e) { 
	arrPlayer.push($(this).attr("class"));
	win(this);
	music($(this).attr("class"));
	if(check(arrGame)){
		if(arrGame.length === arrPlayer.length){
			setTimeout(function () {  
				nextRound();
			}, 200)
		}
	} else{
		lose();
	}
});

function 	game() {  
		let random = Math.floor(Math.random() * 4) + 1;
		$(".cube" + random).animate({opacity:0.5}).animate({opacity:1});
		arrGame.push("cube" + random);
		music("cube" + random);
}

function initGame() {
	arrGame = [];
	arrPlayer = [];
	game();
	lvlUp();
}

function lvlUp(){
	$("h1").text("Level " + level++);
}

function win(arrPlayer){
	$(arrPlayer).addClass("bc-color");
	setTimeout(function() { 
		$(arrPlayer).removeClass("bc-color");
		}, 100);
}

function lose(){
	$("body").addClass("red");
	setTimeout(function() { 
		$("body").removeClass("red");
	}, 100);
	$("h1").text("Game Over, Press Any Key to Restart");
	arrGame = [];
	var sound = new Audio("sounds/wrong.mp3");
	sound.play();
}

function check(arrGame) {
	for(let index = 0; index < arrPlayer.length; index++){
		if(arrGame[index] === arrPlayer[index]){
			continue;
		} else{
			lose();
				return 0;
			}
	}
	return 1;
}

function nextRound(){
	game();
	lvlUp();
	end();
	arrPlayer = [];
}

function music(cube){
	cube = cube.split(' ').at(0);
	switch (cube) {
		case "cube1":
				var sound = new Audio("sounds/green.mp3");
				sound.play();
			break;
		case "cube2":
				var sound = new Audio("sounds/red.mp3");
				sound.play();
			break;
	
		case "cube3":
			var sound = new Audio("sounds/yellow.mp3");
			sound.play();
			break;
	
		case "cube4":
			var sound = new Audio("sounds/blue.mp3");
			sound.play();
			break;
	
		default:
			break;
	}
}

function end(){
	if (level > 10) {
		$("h1").text("Congratulations! You won!");
		arrGame = [];
	}
}