var ship;
var asteroids = [];
var lasers = [];
var score;
var background_song;
var gameover_song;
var shot_sound;
var boosting_sound;

function preload() {
	background_song = document.getElementById("background-music");
	gameover_song = document.getElementById("gameover-music");
	shot_sound = document.getElementById("shot-music");
	boosting_sound = document.getElementById("boosting-sound");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background_song.play();
	ship = new Ship();
	score = new Score();
	frameRate(144);
	for(var i = 0; i < 10; ++i) {
		asteroids.push(new Asteroid());
		if(ship.hits(asteroids[i])) {
			local.reload();
		}
	}
}

function isPlaying(audio) {
	return !audio.paused;
}

function draw() {
	background(0);

	if(!isPlaying(background_song) && !ship.removed) {
		background_song.currentTime = 0;
		background_song.play();
	}

	if(!isPlaying(boosting_sound) && ship.isBoosting) {
			boosting_sound.currentTime = 0;
			boosting_sound.play();
	}

	if(isPlaying(boosting_sound) && !ship.isBoosting) {
		boosting_sound.pause();
	}

	for(var i = asteroids.length; i <= 10 + floor(score.score / 500); ++i) {
		var newAsteroid = new Asteroid();
		if(ship.hits(newAsteroid))continue;
		asteroids.push(newAsteroid);
	}

	for(var i = 0; i < asteroids.length; ++i) {
		if(ship.hits(asteroids[i])){
			background_song.pause();
			gameover_song.play();
			ship.remove();
			document.getElementById("gameover").innerHTML = "GAME OVER";
			document.getElementById("restart").innerHTML = "Press 'SPACE' to restart";
		}
		asteroids[i].render();
		asteroids[i].update();
		asteroids[i].edges();
	}

	for(var i = lasers.length - 1; i >= 0; --i) {
		lasers[i].render();
		lasers[i].update();
		if(lasers[i].offscreen()){
			lasers.splice(i, 1);
			continue;
		}
		for(var j = asteroids.length - 1; j >= 0; --j) {
			if(lasers[i].hits(asteroids[j])) {

				score.addScore(asteroids[j].r);

				var newAsteroids = asteroids[j].breakup();
				asteroids = asteroids.concat(newAsteroids);
				asteroids.splice(j, 1);
				lasers.splice(i, 1);
				break;
			}
		}
	}

	ship.render();
	ship.turn();
	ship.update();
	ship.edges();

}

function keyReleased() {
	if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW)ship.setRotation(0);
	if(keyCode == UP_ARROW)ship.boosting(false);
}

function keyPressed() {
	if(key == ' ') {
		if(ship.removed){
			location.reload();
		} else {
			shot_sound.currentTime = 0;
			shot_sound.play();
			lasers.push(new Laser(ship.pos, ship.heading));
		}
	}

	if(keyCode == RIGHT_ARROW) {
		ship.setRotation(0.05);
	}

	if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.05);
	}

	if (keyCode == UP_ARROW) {
		ship.boosting(true);
	}
}
