var healthWeight = 0.2;
var hungerWeight = 0.05;

var State = function(bug, isDead) {
	
	this.time = new Date();
	
	this.x = bug.x;
	this.y = bug.y;
	this.hunger = bug.hunger;
	this.dHunger = 0;
	this.health = bug.health;
	this.dHealth = 0;
	this.collisions = bug.collisions;
	
	this.isDead = isDead;
	
	this.value = 0;
	
	this.calculateValue = function(prevState) {
		if(!isDead) {
			this.dHunger = this.hunger - prevState.hunger;
			this.dHealth = this.health - prevState.health;
			
			this.value = this.dHunger * hungerWeight + this.dHealth * healthWeight;
		}
		else {
			this.value = -1;
		}
		
	}
};