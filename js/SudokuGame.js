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
/*
 * get a sudoku solver object.
 * @param init  Initial board setup
 */
function sudoku(init) {
    //structure of each cell
    //  - value: 0 for unknow cell, 1 - 9 for known cells
    //  - row: row index in board
    //  - col: col index in board
    //  - units: array of indice of units this cell belongs to (row, col, block)
    //  - candidates: array of all candidates for unknown cells,
    //  - type: 0-given, -1-unknown, 1-sure, 2-unsure
    //  - candidateLookup: array of length 9, value 0 means eliminated

    //2-D array view into the board, 9 X 9
    var board = [];
    //1-D array view into the board (left to right, top to bottom), total 81
    var cells = [];
    //Unit view (rows, columns, blocks) of the board, total 27
    // 0 - 8: rows from top to bottom
    // 9 - 17: columns from left to right
    // 18 - 26: blocks, left top going right then down
    var units = [];

    //used by solver
    var allKnownCells = [];

    var currentSolverState = 1; //1: sure, 2: not sure, in back tracking mode
    /*
     * set board
     * @param s  String representation of the board
     */
    var setBoard = function(s) {
        var zero = '0'.charCodeAt(0);
        var str = s.replace(/[^0-9]/g, '');
        var row = [];
        var i, cell, value;
        var rowN = -1, colN = 0;
        //reset
        board.length = 0;
        cells.length = 0;
        units.length = 0;
        allKnownCells.length = 0;

        for ( i = 0; i < str.length; i++) {
            if (i % 9 === 0) {
                //create a new row
                row = [];
                board.push(row);
                rowN++;
                colN = 0;
            }
            value = str.charCodeAt(i) - zero;
            cell = {
                value : value,
                row : rowN, //row index in 2-D array
                col : colN, //col index in 2-D array
                key : '' + rowN + colN,
                units : [
                //row unit
                rowN,
                //col unit
                9 + colN,
                //block unit
                Math.floor(rowN / 3) * 3 + Math.floor(colN / 3) + 18]
            };
            if (value > 0) {
                cell.type = 0;
                //given
                allKnownCells.push(cell);
            } else {
                cell.type = -1;
                //unknown
            }
            row.push(cell);
            cells.push(cell);
            colN++;
        }
        //scan for units
        for ( i = 0; i < 9; i++) {
            units[i] = getRow(i);
            units[i + 9] = getCol(i);
            units[i + 18] = getBlock(i);
        }
    };

    var solve = function() {
        currentSolverState = 1;
        return _solve();  
    };
    /*
     * Sudoku solver @param board A 2-dimension array of size 9X9, 0 means
     * unknown @returns A 2-dimension array of size 9X9 with solution
     *
     * @return true if solved, false if unsolvable
     */
    var _solve = function() {
        var counter = 0;
        var changedCells, //cells that have new elimination during a loop
            solvedCells, //cells that have been newly solved
            ret,
            cell,
            tmpCell,
            i;
        prepareForSolve();
        solvedCells = allKnownCells;
        changedCells = [];
        while (allKnownCells.length < 9 * 9) {
            //-- apply elimination strategies
            changedCells = [];
            ret = eliminateByCandidateUnit();
            changedCells = changedCells.concat(ret);
            
            ret = eliminateByPTQ();
            changedCells = changedCells.concat(ret);

            //-- apply solve strategies if anything changes
            solvedCells = [];
            ret = solveBySingleCandidate(cells);
            solvedCells = solvedCells.concat(ret);

            ret = solveBySinglePosition(units);
            solvedCells = solvedCells.concat(ret);

            //-- backtracking if not solved
            //      and no more new information is generated during this loop
            if (changedCells.length === 0 && solvedCells.length === 0) {
                currentSolverState = 2; //back tracking, not sure
                cell = _.find(cells, function(cell) {
                   return (cell.value === 0); 
                });
                if(cell.candidates.length === 0) {
                    return false; //in a conflict state, must be in backtrack mode already
                }
                for(i = 0; i < cell.candidates.length; i++) {
                    solveACell(cell, cell.candidates[i], 2);
                    ret = _solve();
                    if(ret) {
                        //guessed right
                        return true;
                    }
                    else {
                        //clean up the mass and prepare for the next guess
                        while((tmpCell = _.last(allKnownCells)).key !== cell.key) {
                            tmpCell.value = 0;
                            allKnownCells.pop();
                        }
                        prepareForSolve();
                    }
                }
            }
            
            counter++;
            if (counter > 10000) {
                //avoid dead loop
                console.log('over 10000 iterations');
                break;
            }
        }
        //a sanity check
        return isSolved();
    };
    /*
     * prepare data for solving, needed at beginning of search
     * or during backtracking
     */
    var prepareForSolve = function() {
        _.each(cells, function(cell) {
            if (cell.value === 0) {
                //reset candidates of all unknown cells
                cell.candidateLookup = [1, 1, 1, 1, 1, 1, 1, 1, 1];
                cell.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
        });
        eliminateByKnownCells(allKnownCells);
    };

    /*
     * elmination strategy:
     *     eliminate candidates from peers of given known cells
     * it is done immediately after each solved cell, otherwise, some
     * strategies may be confused by erroneous candidate list
     * @return Array of changed cells
     */
    var eliminateByKnownCells = function(knownCells) {
        var changedCells = [];
        _.each(knownCells, function(knownCell) {
            //exclude value from its unit
            _.each(knownCell.units, function(unitIndex) {
                var unit = units[unitIndex];
                _.each(unit, function(cell) {
                    if (cell.value === 0 && cell.candidateLookup[knownCell.value - 1] > 0) {
                        cell.candidateLookup[knownCell.value - 1] = 0;
                        changedCells.push(cell);
                    }
                });
            });
        });
        _.each(changedCells, function(cell) {
            cell.candidates = getCandidates(cell.candidateLookup);
        });
        return uniqueCells(changedCells);
    };

    /*
     * elmination strategy:
     *  Scan one unit, if all candidates of a number are all in another unit,
     *  then we can eliminate this number from other cells in that other unit
     *
     * A good test pattern for this strategy
     *
     123 000 456
     000 000 000
     000 000 000
     000 000 000
     000 000 000
     000 000 000
     000 000 000
     000 000 000
     000 000 000
     */
    var eliminateByCandidateUnit = function() {
        var changedCells = [];
        var unitIdx, unit, candidateLookup;
        //lookup of each number's candidates
        for ( unitIdx = 0; unitIdx < units.length; unitIdx++) {
            unit = units[unitIdx];
            candidateLookup = {};
            _.each(unit, function(cell) {
                if (cell.value === 0) {
                    _.each(cell.candidates, function(candidate) {
                        if (!candidateLookup[candidate]) {
                            candidateLookup[candidate] = [];
                        }
                        candidateLookup[candidate].push(cell);
                    });
                }
            });
            _.each(candidateLookup, function(cells, candidate) {
                var unitLookup = {};
                //check if all cells share another unit index
                _.each(cells, function(cell) {
                    _.each(cell.units, function(unit) {
                        if (!unitLookup[unit]) {
                            unitLookup[unit] = 0;
                        }
                        unitLookup[unit] += 1;
                    });
                });
                _.each(unitLookup, function(count, unit) {
                    if (count === cells.length && unit !== unitIdx) {
                        _.each(units[unit], function(cell) {
                            if (cell.value === 0 && //it is unknown
                            cell.candidateLookup[candidate - 1] > 0 && //does have this number as candidate
                            !_.some(cells, function(oldCell) {
                                return oldCell.key === cell.key;
                            })) {
                                cell.candidateLookup[candidate - 1] = 0;
                                cell.candidates = getCandidates(cell.candidateLookup);
                                changedCells.push(cell);
                            }
                        });
                    }
                });
            });
        }
        return uniqueCells(changedCells);
    };

    /*
     * elimination strategy:
     *  eliminate using pairs, triples, or quads
     * A test pattern
123 000 456
000 000 000
000 000 000 
000 700 000
000 000 000
000 000 000
000 000 000
000 000 000
000 007 000
     */
    var eliminateByPTQ = function() {
        var changedCells = [];
        _.each(units, function(unit) {
            var group = _.groupBy(unit, function(cell) {
                if(cell.value > 0) {
                    return ''; //solve cells, grouped under empty string
                }
                return cell.candidates.join('');
            });
            _.each(group, function(cells, key) {
                if (cells.length === key.length) {
                    //2 cells with exact 2 candidates
                    //3 cells with exact 3 candidates, ...
                    //the other cells in the unit should not have these candidates
                    _.each(unit, function(cell) {
                        var cellChanged = false;
                        if (cell.value > 0 || _.some(cells, function(oldCell) {
                            return cell.key === oldCell.key;
                        })) {
                            return;
                            //self or know cell, skip
                        }
                        _.each(cells[0].candidates, function(candidate) {
                            if (cell.candidateLookup[candidate - 1] > 0) {
                                cell.candidateLookup[candidate - 1] = 0;
                                cellChanged = true;
                            }
                        });
                        if (cellChanged) {
                            cell.candidates = getCandidates(cell.candidateLookup);
                            changedCells.push(cell);
                        }
                    });
                }
            });
        });
        return changedCells;
    };

    var getCandidates = function(candidateLookup) {
        var c = [];
        //candidates array
        _.each(candidateLookup, function(ele, eleIndex, arr) {
            if (ele > 0) {
                c.push(eleIndex + 1);
            }
        });
        return c;
    };
    /*
     * solve strategy:
     *   scan given cells, apply single candidate rule.
     *     If a cell only has one candidate value, the cell has
     *     to be that value.
     * A good test pattern
     083 921 657
     967 345 821
     251 876 493
     548 132 976
     729 564 138
     136 798 245
     372 689 514
     814 253 769
     695 417 382
     * @return Array of sovled cells.
     */
    var solveBySingleCandidate = function(cells) {
        var solvedCells = [];
        _.each(cells, function(cell) {
            if (cell.value > 0) {
                return;
                //it's known cell
            }
            if (cell.candidates.length === 1) {
                solveACell(cell, cell.candidates[0]);
                solvedCells.push(cell);
            }
        });
        return solvedCells;
    };

    /*
     * solve strategy:
     *  scan the given units, apply single position rule.
     *   If a units only have one position that is candidate of a number, that
     *   cell has to have the value.
     *
     * @return Array of newly solved cells.
     */
    var solveBySinglePosition = function(units) {
        var solvedCells = [];
        _.each(units, function(unit) {
            var cellLookup = {};
            _.each(unit, function(cell) {
                if (cell.value === 0) {
                    _.each(cell.candidates, function(candidate) {
                        if (!cellLookup[candidate]) {
                            cellLookup[candidate] = [];
                        }
                        cellLookup[candidate].push(cell);
                    });
                }
            });
            _.each(cellLookup, function(cells, candidate) {
                if (cells.length === 1) {
                    solveACell(cells[0], candidate);
                    solvedCells.push(cells[0]);
                }
            });
        });
        return solvedCells;
    };

    var solveACell = function(cell, value) {
        cell.type = currentSolverState;
        cell.value = 1 * value; //sometimes we get a string
        allKnownCells.push(cell);
        eliminateByKnownCells([cell]);
    };

    /*
     * remove duplicates, return set of unique cells
     */
    var uniqueCells = function(cells) {
        var lookup = {};
        var ret = _.filter(cells, function(cell) {
            var key = cell.key;
            if (lookup[key]) {
                return false;
            } else {
                lookup[key] = 1;
                return true;
            }
        });
        return ret;
    };

    /*
     * check if board is solved
     */
    var isSolved = function() {
        var i;
        var nineNumbers;
        for ( i = 0; i < 27; i++) {
            if (!check9Numbers(units[i])) {
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
        for ( row = 0; row < 9; row++) {
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
        for ( row = rowBase; row < rowBase + 3; row++) {
            for ( col = colBase; col < colBase + 3; col++) {
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
        for ( i = 0; i < 9; i++) {
            val = numbers[i].value;
            if (val >= 1 && val <= 9) {
                if (!lookup[val]) {
                    lookup[val] = 1;
                } else {
                    return false;
                    // duplicated number
                }
            } else {
                return false;
                // illegal value or unfinished
            }
        }
        return true;
    };

    var printBoard = function() {
        var row, col;
        var output = '';
        for ( row = 0; row < 9; row++) {
            if (row % 3 === 0) {
                output += '-------------------------\n';
            }
            for ( col = 0; col < 9; col++) {
                if (col % 3 === 0) {
                    output += '| ';
                }
                output += board[row][col].value + ' ';
            }
            output += '|\n';
        }
        output += '-------------------------\n';
        console.log(output);
    };
    
    var getBoard = function() {
        var ret = _.map(board, function(row) {
            return _.map(row, function(cell) {
                return cell.value;
            });
        });
        return ret;
    };
    // public interface
    return {
        setBoard : setBoard,
        printBoard : printBoard,
        isSolved : isSolved,
        solve : solve,
        getBoard: getBoard
    };
};