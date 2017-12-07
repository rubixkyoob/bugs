
var Summary = function() {
	
	//totals
	this.vals = {
		hunger: 0,
		health: 0,
		collisions: 0
	};
	this.actions = {
		moves: 0,
		waits: 0,
		move_left: 0,
		move_right: 0,
		move_up: 0,
		move_down: 0
	};
	
	//averages
	this.avgHunger = 0;
	this.avgHealth = 0;
	this.avgCollisions = 0;
	
	this.avgMoves = 0;
	this.avgWaits = 0;
	this.avgRightMoves = 0;
	this.avgLeftMoves = 0;
	this.avgUpMoves = 0;
	this.avgDownMoves = 0;
	
	this.calculateAverages = function(states) {
		this.vals.hunger = 0;
		this.vals.health = 0;
		this.vals.collisions = 0;
		
		this.actions.moves = 0;
		this.actions.move_left = 0;
		this.actions.move_right = 0;
		this.actions.move_up = 0;
		this.actions.move_down = 0;
		
		for(var s = 0; s < states.length; s++) {
			var currState = states[s];
			this.vals.hunger += currState.dHunger;
			this.vals.health += currState.dHealth;
			this.vals.collisions += currState.collisions.length;
			
			if(currState.dx != 0 || currState.dy != 0) {
				this.actions.moves += 1;
			}
			else {
				this.actions.waits += 1;
			}
			this.actions.move_right += (currState.dx > 0) ? 1 : 0;
			this.actions.move_left += (currState.dx < 0) ? 1 : 0;
			this.actions.move_up += (currState.dy < 0) ? 1 : 0;
			this.actions.move_down += (currState.dy > 0) ? 1 : 0;
		}
		
		this.avgHunger = this.vals.hunger / states.length;
		this.avgHealth = this.vals.health / states.length;
		this.avgCollisions = this.vals.collisions / states.length;
		
		this.avgMoves = this.actions.moves / states.length;
		this.avgWaits = this.actions.waits / states.length;
		this.avgRightMoves = this.actions.move_right / states.length;
		this.avgLeftMoves = this.actions.move_left / states.length;
		this.avgUpMoves = this.actions.move_up / states.length;
		this.avgDownMoves = this.actions.move_down / states.length;
	};

}