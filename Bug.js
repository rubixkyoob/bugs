/// Bug Class
function Bug(x, y, strength) {
	//properties
	this.x = x;
	this.y = y;
	this.health = 100;
	this.hunger = 100;
	this.hungerReplenish = 4;
	this.hungerDecRate = 0.5;
	this.hungerMoveDecRate = 0.5;
	this.state = bugState.ALIVE;
	this.strength = strength || 100;
	this.collisions = [];
	this.states = [new State(this, false)];
	
	this.color = {r: 0, g: 255, b: 0};
	this.getColor = function() {
		var dr = Math.min(255, Math.max(0,Math.round(this.color.r)));
		var dg = Math.min(255, Math.max(0,Math.round(this.color.g)));
		var db = Math.min(255, Math.max(0,Math.round(this.color.b)));
		return "rgb(" + dr + "," + dg + "," + db + ")";
	};
	
	//methods
	this.update = function() {
	
		switch(this.state) {
			case bugState.ALIVE:
			
				//make a decision
				var choice = bugRandomChoices[Math.floor(Math.random() * bugRandomChoices.length)];
				
				switch(choice) {
					case bugAction.WAIT:
					
						break;
					case bugAction.MOVE:
						this.move();
						break;
				}
				
				// update hunger
				if(this.collisions.length > 0) {
					for(var i = 0; i < this.collisions.length; i++) {
						if(this.collisions[i].state != bugState.DEAD) {
							this.hunger += this.hungerReplenish;
						}
					}
				}
				else {
					this.hunger -= this.hungerDecRate;
				}
				
				if(this.hunger < 0) {
					this.hunger = 0;
				}
				
				if(this.hunger == 0 && this.health > 0) {
					this.health -= 1;
				}
				
				if(this.health <= 0) {
					this.health = 0;
					this.state = bugState.DEAD;
				}
				
				this.color = {r: (5.1 * (100 - this.health)), g: (5.1 * (this.health)), b: 0};
				this.addNewState();
				break;
				
			case bugState.DEAD:
				this.color = {r:0,g:0,b:0};
				break;
		}
		
		
	};
	
	this.updateCollisions = function() {
		this.collisions = [];	//reset collisions
		for(var j = 0; j < bugs.length; j++) {
			if(this !== bugs[j] && distance(this.x, this.y, bugs[j].x, bugs[j].y) <= 1) {
				this.collisions.push(new Collision(bugs[j]));
			}
		}
	}
	
	//ACTIONS
	this.move = function() {
		if(this.state == bugState.DEAD) {
			return null;
		}
		
		var dir = Math.floor(Math.random() * 4);
		switch(dir) {
			case 0: 
				if(isEmptyCell(this.x + 1, this.y)) {
					this.x += 1;
				}
				break;
			case 1: 
				if(isEmptyCell(this.x, this.y + 1)) {
					this.y += 1;
				}
				break;
			case 2: 
				if(isEmptyCell(this.x - 1, this.y)) {
					this.x -= 1;
				}
				break;
			case 3: 
				if(isEmptyCell(this.x, this.y - 1)) {
					this.y -= 1;
				}
				break;
		}
		this.hunger -= this.hungerMoveDecRate;
	};
	
	//STATES
	this.addNewState = function() {
		var newState = new State(this);
		newState.calculateValue(this.states[this.states.length - 1]);
		this.states.push(newState);
	};
}