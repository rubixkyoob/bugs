
var Summary = function() {
	
	this.totals = {
		hunger: 0,
		health: 0,
		collisions: 0,
		moves: 0,
		move_left: 0,
		move_right: 0,
		move_up: 0,
		move_down: 0
	};
	this.avgHunger = 0;
	this.avgHealth = 0;
	this.avgCollisions = 0;
	this.avgMoves = 0;
	this.avgRightMoves = 0;
	this.avgLeftMoves = 0;
	this.avgUpMoves = 0;
	this.avgDownMoves = 0;
	
	this.states = [];
	
	
	this.addState = function(state) {
		this.states.push(state);
	};
	
	this.calculateAverages = function() {
		this.totals.hunger = 0;
		this.totals.health = 0;
		this.totals.collisions = 0;
		this.totals.moves = 0;
		this.totals.move_left = 0;
		this.totals.move_right = 0;
		this.totals.move_up = 0;
		this.totals.move_down = 0;
		
		for(var s = 0; s < this.states.length; s++) {
			var currState = this.states[s];
			this.totals.hunger += currState.dHunger;
			this.totals.health += currState.dHealth;
			this.totals.collisions += currState.collisions.length;
			if(currState.dx != 0 || currState.dy != 0) {
				this.totals.moves += 1;
			}
			this.totals.move_right += (currState.dx > 0) ? 1 : 0;
			this.totals.move_left += (currState.dx < 0) ? 1 : 0;
			this.totals.move_up += (currState.dy < 0) ? 1 : 0;
			this.totals.move_down += (currState.dy > 0) ? 1 : 0;
		}
		
		this.avgHunger = this.totals.hunger / this.states.length;
		this.avgHealth = this.totals.health / this.states.length;
		this.avgCollisions = this.totals.collisions / this.states.length;
		this.avgMoves = this.totals.moves / this.states.length;
		this.avgRightMoves = this.totals.move_right / this.states.length;
		this.avgLeftMoves = this.totals.move_left / this.states.length;
		this.avgUpMoves = this.totals.move_up / this.states.length;
		this.avgDownMoves = this.totals.move_down / this.states.length;
	};

}