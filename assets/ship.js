function Ship() {
	this.pos = createVector(width/2, height/2);
	this.vel = createVector(1, 0);
	this.dots = [];
	this.r = 15; // radius
	this.heading = 0; // How the ship shoul rotate
	this.rotation = 0; // adds an angle to heading
	this.isBoosting = false;
	this.removed = false;
	this.EPS = 1e-5;


	this.setDots = function() {
		if(!this.dots.length) {
			var x = -this.r * cos(this.heading + PI / 2.0) - this.r * sin(this.heading + PI / 2.0);
			var y = -this.r * sin(this.heading + PI / 2.0) + this.r * cos(this.heading + PI / 2.0);
			this.dots.push(createVector(x  + this.pos.x, y + this.pos.y));

			x = this.r * cos(this.heading + PI / 2.0) - this.r * sin(this.heading + PI / 2.0);
			y = this.r * sin(this.heading + PI / 2.0) + this.r * cos(this.heading + PI / 2.0);
			this.dots.push(createVector( x + this.pos.x, y + this.pos.y));

			x = -(-this.r - 5) * sin(this.heading + PI / 2.0);
			y = (-this.r - 5) * cos(this.heading + PI / 2.0);
			this.dots.push(createVector(x  + this.pos.x, y + this.pos.y));
		}
	}

	this.setDots();

	this.edges = function() {
		if(this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if(this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		}

		if(this.pos.y > height + this.r) {
			this.pos.y = - this.r;
		} else if(this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}

	this.boosting = function(b) {
		this.isBoosting = b;
	}

	this.update = function() { // Updates the velocity and boosting
		if(this.removed)return;

		if(this.isBoosting) {
			this.boost();
		}
		this.pos.add(this.vel);
		this.vel.mult(0.99);
	}

	this.boost = function() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.2);
		this.vel.add(force);
	}

	this.render = function() {
		if(this.removed) return;
		push();
		this.dots = [];
		this.setDots();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI / 2);
		fill(0);
		stroke(255);
		if(this.isBoosting) {
			triangle(-this.r / 3.0 - 7, this.r + 5, this.r / 3.0 - 7, this.r + 5, -7, -this.r + 50);
			triangle(-this.r / 3.0 + 7, this.r + 5, this.r / 3.0 + 7, this.r + 5, 7, -this.r + 50);
		}
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r - 5);
		pop();
	}

	this.setRotation = function(angle){
		this.rotation = angle;
	}

	this.hits = function(asteroid) {
		if(this.removed)return false;

		var asteroidCenter = asteroid.pos;
		var asteroidDots = asteroid.dots;

		asteroidDots.push(asteroidDots[0]);
	
		var shipCenter = this.pos;
		var shipDots = this.dots;
		shipDots.push(shipDots[0]);



		for(var i = 0; i < shipDots.length-1; ++i) {
			for(var j = 0; j < asteroidDots.length-1; ++j) {
				if(this.dotInTriangle(shipDots[i], asteroidCenter, asteroidDots[j], asteroidDots[j + 1])) {
					return true;
				}
				if(this.dotInTriangle(asteroidDots[j], shipCenter, shipDots[i], shipDots[i + 1])) {
					return true;
				}
			}
		}


		return false;
	}

	this.dotInTriangle = function(d, a, b, c) {
		if(Math.abs(this.area(a, b, c) - this.area(d, a, b) - this.area(d, a, c) - this.area(d, b, c)) < this.EPS) {
			return true;
		}
		return false;
	}

	this.area = function(a, b, c) {
		return Math.abs((b.x - a.x)*(c.y - a.y) - (c.x - a.x)*(b.y - a.y)) / 2.0;
	}

	this.turn = function() {
		this.heading += this.rotation;
	}

	this.remove = function() {
		this.removed = true;
	}
}
