function Asteroid(pos, r) {
	this.dots = [];
	this.max_r = 0;
	if(r) {
		this.r = r * 0.5;
	} else {
		this.r = random(15, 50);
	}

	this.vel = p5.Vector.random2D();
	if(pos){
		this.pos = pos.copy();
	} else {
		this.pos = createVector(this.r + random(width - this.r * 2), this.r + random(height - this.r * 2));
	}
	this.total = floor(random(5, 10));
	this.offset = []
	this.heading = 0;

	for(var i = 0; i < this.total; ++i){
		this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
		this.max_r = Math.max(this.max_r, this.offset[i] + this.r);
	}

	this.setDots = function() {
		for(var i = 0; i < this.total; ++i) {
			var angle = map(i, 0, this.total, 0, TWO_PI);
			var r = this.r + this.offset[i]
			var x = r * cos(angle);
			var y = r * sin(angle);

			this.dots.push(createVector(x * cos(this.heading) - y * sin(this.heading) + this.pos.x,
			 														x * sin(this.heading) + y * cos(this.heading) + this.pos.y));
		}
	}

	this.setDots();

	this.update = function() {
		this.pos.add(this.vel);
		this.heading += 0.01;
	}

	this.render = function() {
		push();
		this.dots = [];
		this.setDots();
		translate(this.pos.x, this.pos.y);
		noFill();
		stroke(255);

		rotate(this.heading);
		
		beginShape();
		for(var i = 0; i < this.total; ++i) {
			var angle = map(i, 0, this.total, 0, TWO_PI);
			var r = this.r + this.offset[i]
			var x = r * cos(angle);
			var y = r * sin(angle);

			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
	}

	this.breakup = function() {
		var newA = [];
		if(this.r < 20) {
			return newA;
		}
		newA[0] = new Asteroid(this.pos, this.r);
		newA[1] = new Asteroid(this.pos, this.r);
		return newA;
	}

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



}
