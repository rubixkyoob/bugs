
/// MAIN 

var bugs = [];
var collisions = [];
var gridW=0, gridH=0;
var interval;
var lastFrameTime = 0;
var deltaTime = 0;
var fps = 10;

var ticks = 0;

function main(timestamp) {
	deltaTime = timestamp - lastFrameTime;
	ticks += deltaTime;
	//process states
	if(ticks > 10000) {
		for(var b = 0; b < bugs.length; b++) {
			bugs[b].processStates();
		}
		ticks = 0;
	}
	
	// update
	updateBugs();
	updateBugCollisions();
	
	// render
	renderInfoTable();
	renderBugTable();
	
	// repeat
	lastFrameTime = timestamp;
	setTimeout(function () {requestAnimationFrame(main)}, 1000 / fps);
}

function createBugTable() {
	var table = $("#bugTable");
	table.html("");
	var w = $("#widthInput").val();
	var h = $("#heightInput").val();
	
	//create table
	for(var i = 0; i < h; i++) {
	
		var $tr = $("<tr>", {id: "tr_" + i});
		for(var j = 0; j < w; j++) {
			var $td = $("<td>", {id: "td_" + j + "_" + i, "class":"cell", "data-bug":-1});
			$tr.append($td);
		}
		table.append($tr);
	}
	
	gridW = w;
	gridH = h;
}

function generateBugs() {
	var numOfBugs = $("#bugNumInput").val();
	bugs = [];
	for(var b = 0; b < numOfBugs; b++) {
		var repeat = true;
		do {
			var newX = Math.floor(Math.random() * gridW);
			var newY = Math.floor(Math.random() * gridH);
			
			if(isEmptyCell(newX, newY)) {
				bugs.push(new Bug(newX, newY));
				repeat = false;
			}
		} while(repeat);
		
	}
	
	//TESTING
	for(var i = 0; i < bugs.length - 1; i++) {
		bugs[i].state = bugState.DEAD;
	}
	bugs[bugs.length-1].selected = true;
}

function updateBugs() {

	for(var b = 0; b < bugs.length; b++) {
		var bug = bugs[b];
		bug.update();
	}
}

function updateBugCollisions() {
	for(var i = 0; i < bugs.length; i++) {
		var bug = bugs[i];
		bug.updateCollisions();
	}
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function isEmptyCell(x, y) {

	//check boundaries
	if(x < 0 || x > gridW - 1 || y < 0 || y > gridH - 1) {
		return false;
	}
	
	//check bugs
	for(var i = 0; i < bugs.length; i++) {
		if(bugs[i].x === x && bugs[i].y === y) {
			return false;
		}
	}

	return true;
}

function renderBugTable() {
	
	$(".cell").css({
		"background-color": "#808080", 
		"border": "1px solid rgba(0,0,0,0)"
	}).data("bug", -1);
	
	for(var b = 0; b < bugs.length; b++) {
		var bug = bugs[b];
		var td = $("#td_" + bug.x + "_" + bug.y);
		td.data("bug", b);
		td.css({"background-color": bug.getColor()});
		if(bug.selected) {
			td.css({
				"border": "1px solid blue"
			});
		}
	}
}

function renderInfoTable() {
	for(var i = 0; i < bugs.length; i++) {
		if(bugs[i].selected) {
			$("#xRef").text(bugs[i].x);
			$("#yRef").text(bugs[i].y);
			$("#hungerRef").text(bugs[i].hunger);
			$("#healthRef").text(bugs[i].health);
			$("#collisionsRef").text(bugs[i].collisions.length);
			return;
		}
	}
	$("#xRef").text("");
	$("#yRef").text("");
	$("#hungerRef").text("");
	$("#healthRef").text("");
	$("#collisionsRef").text("");
}