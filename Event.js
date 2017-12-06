

var Event = function() {
	this.time = new Date();
	this.name = [];
	
	this.addEvent = function(name, value) {
		this.events[name] = value;
	};
	
	
};