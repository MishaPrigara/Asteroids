function Ship() {
	this.pos = createVector(width/2, height/2);
	this.vel = createVector(1, 0);
	this.r = 15; // radius
	this.heading = 0; // How the ship shoul rotate
	this.rotation = 0; // adds an angle to heading
	this.isBoosting = false;
	this.removed = false;

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
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI / 2);
		fill(0);
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r - 5);
		pop();
	}

	this.setRotation = function(angle){
		this.rotation = angle;
	}

	this.hits = function(asteroid) {
		if(this.removed)return false;
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if(d < this.r + asteroid.r){
			return true;
		}
		return false;
	}

	this.turn = function() {
		this.heading += this.rotation;
	}

	this.remove = function() {
		this.removed = true;
	}
}
