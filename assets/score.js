function Score() {
		this.score = 0;

		this.addScore = function(size) {
			this.score += round(100 - size);
			document.getElementById("scoreline").innerHTML = "SCORE: " + this.score;
		}
}
