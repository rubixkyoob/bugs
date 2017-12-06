var healthWeight = 0.2;
var hungerWeight = 0.05;

var State = function(bug) {
	
	this.time = new Date();
	
	this.x = bug.x;
	this.y = bug.y;
	this.hunger = bug.hunger;
	this.health = bug.health;
	this.collisions = bug.collisions;
	this.isDead = (bug.state == bugState.DEAD);
	this.value = 0;
	
	this.dHunger = 0;
	this.dHealth = 0;
	
	this.calculateValue = function(prevState) {
		if(!this.isDead) {
			this.dHunger = this.hunger - prevState.hunger;
			this.dHealth = this.health - prevState.health;
			
			this.value = this.dHunger * hungerWeight + this.dHealth * healthWeight;
		}
		else {
			this.value = -1;
		}
		
	}
};