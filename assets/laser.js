function Laser(spos, angle) {
	this.vel = p5.Vector.fromAngle(angle);
	this.pos = createVector(spos.x, spos.y);
	this.vel.mult(10);
	this.EPS = 1e-5;
	this.update = function() {
		this.pos.add(this.vel);
	}

	this.render = function() {
			push();
			stroke(255);
			strokeWeight(4);
			point(this.pos.x, this.pos.y);
			pop();
	}

	this.hits = function(asteroid) {

		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if(d < asteroid.max_r) {
			var asteroidCenter = asteroid.pos;
			var asteroidDots = asteroid.dots;

			asteroidDots.push(asteroidDots[0]);
			
			for(var i = 0; i < asteroidDots.length - 1; ++i) {
				if(this.dotInTriangle(this.pos, asteroidCenter, asteroidDots[i], asteroidDots[i + 1])) {
					return true;
				}
			}
			return false;
		}
		return false;
	}

	this.offscreen = function() {
		if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height){
			return true;
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
}
