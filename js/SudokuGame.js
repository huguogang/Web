/** sudoku game
 *    - 4 data enter mode? known, sure, not sure, elimination
 *    - enter 'known' numbers
 *    - enter 'sure' numbers
 *    - enter 'not sure' numbers
 *    - clear: not sure, sure, or known numbers
 *    - clear a single cell
 *    - help to record elimination of each cell
 *    - save game using local storage
 *    - check result when user finished last cell
 *    - mobile friendly: touch only game controls
 *    - desktop friendly: keyboard only game controls
 *    - solver: provide one hint on demand
 *    - puzzle generator
 *    - responsive: smaller screen, landscape/portrait
 */
function sudoku(init) {
	var board = [];
	
	/*
	 * Sudoku solver @param board A 2-dimension array of size 9X9, 0 means
	 * unknown @returns A 2-dimension array of size 9X9 with solution
	 */
	var solve = function() {
		// expand each cell to
		// - val
		// - row
		// - col
		// - candidates (9 elements array)
		// - type: given, sure, not sure
		return [ [ 0 ] ];
	};

	/*
	 * check if board is solved
	 */
	var isSolved = function() {
		var i;
		var nineNumbers;
		for (i = 0; i < 9; i++) {
			nineNumbers = getRow(i);
			console.log(nineNumbers);
			if (!check9Numbers(nineNumbers)) {
				return false;
			}
			nineNumbers = getCol(i);
			console.log(nineNumbers);
			if (!check9Numbers(nineNumbers)) {
				return false;
			}
			nineNumbers = getBlock(i);
			console.log(nineNumbers);
			if (!check9Numbers(nineNumbers)) {
				return false;
			}
		}
		return true;
	};

	var getRow = function getRow(row) {
		return board[row];
	};

	var getCol = function getCol(col) {
		var ret = [];
		var row;
		for (row = 0; row < 9; row++) {
			ret.push(board[row][col]);
		}
		return ret;
	};

	/*
	 * get rectangle block @param block Block number, 0 - 8 starting from left
	 * top going right then down.
	 */
	var getBlock = function getBlock(block) {
		var blockRow = Math.floor(block / 3);
		var blockCol = block % 3;
		var rowBase = blockRow * 3;
		var colBase = blockCol * 3;
		var row, col;
		var ret = [];
		for (row = rowBase; row < rowBase + 3; row++) {
			for (col = colBase; col < colBase + 3; col++) {
				ret.push(board[row][col]);
			}
		}
		return ret;
	};

	/*
	 * check 9 numbers
	 */
	var check9Numbers = function check9Numbers(numbers) {
		var lookup = [];
		var i, val;
		for (i = 0; i < 9; i++) {
			val = numbers[i].value;
			if (val >= 1 && val <= 9) {
				if (!lookup[val]) {
					lookup[val] = 1;
				} else {
					return false; // duplicated number
				}
			} else {
				return false; // illegal value or unfinished
			}
		}
		return true;
	};

	var setBoard = function(s) {
		var zero = '0'.charCodeAt(0);
		var str = s.replace(/[^0-9]/g, '');
		var i;
		var row = [];
		board.length = 0; //clear board
		for (i = 0; i < str.length; i++) {
			if (i % 9 === 0) {
				row = [];
				board.push(row);
			}
			row.push({value: str.charCodeAt(i) - zero});
		}
	};
	
	if(init) {
		setBoard(init);
		console.log(board);
	}
	// public interface
	return {
		isSolved: isSolved,
		setBoard: setBoard
	};
};