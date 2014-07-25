$(document).ready(function() {	
	var ctx = $('#canvas1').get(0).getContext('2d');
	
	//model/data of the game
	var gameData;
	//global options of the game
	var options = {
		eggColor : 'black',
		snakeColor : 'green',
		backgroundColor: 'white',
		stageWidth : 790,
		stageHeight : 590,
		pixelSize: 10,
		pixelWidth: 80,
		pixelHeight: 60
	};

	//configuration of the current level
	var levelData;
	
	var startAnimLoop = function() {
		var lastFrame = 0;
		function loop(now) {
			requestAnimationFrame(loop);
			var delta = now - lastFrame;
			//if it is too slow, we will skip the frame
			if(delta < 500) {
				onAnimationFrame(delta);
			}
			lastFrame = now;
		}
		loop(lastFrame);
	};
	
	//the handler of each loop
	var onAnimationFrame = function(delta) {
		updateGameData(delta);
		render();
	};
	
	var newGame = function() {
		gameData = {
			snake: [{x: 400, y: 300}],
			eggs: [{x: 350, y: 200}],
			//enum: new, dead, live, pause
			state: 'new',
			accumulatedMove: 0,
			//do not mvoe at begining of game
			direction: {x: 0, y: 0},
			//the tails that should be removed on every move
			removeSnakeTail: [],
			//direction of last move
			previousDirection: {x:0, y:0}
		};
		
		levelData = {
		    //moves per second
			snakeSpeed: 4
		};
		clearCanvas();
	};
	
	var clearCanvas = function() {
		ctx.fillStyle = options.backgroundColor || 'white';
		ctx.fillRect(0, 0, 800, 600);
	};
	
	var togglePause = function() {
		if(gameData.state === 'live') {
			gameData.state = 'pause';
		}
		else if(gameData.state === 'pause') {
			gameData.state = 'live';
		}
	};

	var updateGameData = function(delta) {
		var i;
		var gotEgg;
		var oldHead, 
			newHead = {};
		var direction = gameData.direction;
		if(gameData.state === 'dead') {
			return; //game over
		}
		if(gameData.state === 'pause') {
			return;
		}
		
		if(direction.x === 0 && direction.y === 0) {
			//no move
			return;
		}
		
		//cannot change directly backwards
		var currentDirection = gameData.direction;
		var previousDirection = gameData.previousDirection;
		if(previousDirection.x * currentDirection.x < 0 || previousDirection.y * currentDirection.y < 0) {
			gameData.direction = gameData.previousDirection;
		}
		gameData.accumulatedMove += (delta / 1000) * levelData.snakeSpeed;
		if(gameData.accumulatedMove >= 1) {
			gameData.state = 'live';
			gameData.removeSnakeTail = [];
			for(i = 0; i < gameData.accumulatedMove; i++) {
				gameData.accumulatedMove--;
				oldHead = _.last(gameData.snake);
				newHead.x = oldHead.x + gameData.direction.x * options.pixelSize;
				newHead.y = oldHead.y + gameData.direction.y * options.pixelSize;
				//got egg?
				gotEgg = _.some(gameData.eggs, function(egg){
					return egg.x === newHead.x && egg.y === newHead.y;
				});
				if(gotEgg) {
					//snake: gets longer, go faster
					gameData.snake.push(newHead);
					levelData.snakeSpeed += .5;
					
					//eggs: remove egg, place another egg
					gameData.eggs = _.filter(gameData.eggs, function(egg){
						return !(egg.x === newHead.x && egg.y === newHead.y);
					});
					gameData.eggs.push(getRandomPosition());
					console.log(gameData.eggs);
				}
				else if(isDead(newHead)) {
					gameData.state = 'dead';
				}
				else {
					gameData.snake.push(newHead);
					gameData.removeSnakeTail.push(gameData.snake.shift());
				}
			}
			//only update when the snake actually moved
			gameData.previousDirection = gameData.direction;
		}
	};
	
	//utility function, return a random integer between lower bound (inclusive) and upper bound (inclusive)
	var randomRange = function(lower, upper) {
		return Math.floor(Math.random() * (upper - lower + 1) + lower);
	};
	
	var getRandomPosition = function() {
		return {
			x: randomRange(0, options.pixelWidth - 1) * options.pixelSize, 
			y: randomRange(0, options.pixelHeight - 1) * options.pixelSize};
	};
	
	//check new head position, process egg, wall, self
	//
	//@return false if game over
	var isDead = function(head) {
		//out of bound
		if(head.x < 0 || head.x > options.stageWidth || head.y < 0 || head.y > options.stageHeight) {
			return true;
		}
		//TODO: bite itself
		
		return false;
	};
	
	var render = function() {
		var snakeColor = options.snakeColor || 'green';
		var eggColor = options.eggColor || 'black';
		var backgroundColor = options.backGroundColor || 'white';
		var rectSize = options.pixelSize - 1;
		//rendering order is important
		ctx.fillStyle = backgroundColor;
		_.each(gameData.removeSnakeTail, function(ele, idx, list) {
			ctx.fillRect(ele.x, ele.y, rectSize, rectSize);
		});

		ctx.fillStyle = eggColor;
		_.each(gameData.eggs, function(ele, idx, list) {
			ctx.fillRect(ele.x, ele.y, rectSize, rectSize);
		});

		ctx.fillStyle = snakeColor;
		_.each(gameData.snake, function(ele, idx, list) {
			ctx.fillRect(ele.x, ele.y, rectSize, rectSize);
		});
	};
	
	//User Input Mapping
	var moveFunction = function(x, y) {return function() {gameData.direction = {x: x, y: y};}};

	$(document).bind('keydown', '', moveFunction(-1, 0));
	$(document).bind('keydown', 'd l right', moveFunction(1, 0));
	$(document).bind('keydown', 'w i up', moveFunction(0, -1));
	$(document).bind('keydown', 's k down', moveFunction(0, 1));
	$(document).bind('keydown', 'n', newGame);
	$(document).bind('keydown', 'space', togglePause);
	newGame();
	startAnimLoop();
});

//TODO: add walls (for certain levels)
//
//TODO: add touch control: swipe

//TODO: add GUI binding to game state: pause, resume, new game
//TODO: add game stats: score, speed