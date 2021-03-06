/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../js/SudokuGame.js"/>

QUnit.config.reorder = false;
/*
QUnit
.cases([
{
board: [
//[0][]
[0, 0, 3, 0, 2, 0, 6, 0, 0],
//[1][]
[9, 0, 0, 3, 0, 5, 0, 0, 1],
//[2][]
[0, 0, 1, 8, 0, 6, 4, 0, 0],
//[3][]
[0, 0, 8, 1, 0, 2, 9, 0, 0],
//[4][]
[7, 0, 0, 0, 0, 0, 0, 0, 8],
//[5][]
[0, 0, 6, 7, 0, 8, 2, 0, 0],
//[6][]
[0, 0, 2, 6, 0, 9, 5, 0, 0],
//[7][]
[8, 0, 0, 2, 0, 3, 0, 0, 9],
//[8][]
[0, 0, 5, 0, 1, 0, 3, 0, 0],
], expected: "483921657"
}
])
.useTitleTemplate(true)
.test("Sudoku Solver test", function (params) {
var ret = solve(params.board);
var s = '' + ret[0][0] + ret[0][1] + ret[0][2] + ret[0][3] + ret[0][4] + ret[0][5] + ret[0][6] + ret[0][7] + ret[0][8];
equal(s, params.expected);
});
QUnit
.cases([
{
s: '003020600\n\
900305001\n\
001806400\n\
008102900\n\
700000008\n\
006708200\n\
002609500\n\
800203009\n\
005010300',
expected: 0
},
{
s: '003020600 900305001 001806400 008102900 700000008 006708200 002609500 800203009 005010300',
expected: 0
},
])
.test("parse board test", function (params) {
var b = parseBoard(params.s);
console.log(b);
equal(b[0][0], params.expected);
equal(b[8][2], 5);
});
*/
/*
QUnit
.cases([
{
s: '003020600 900305001 001806400 008102900 700000008 006708200 002609500 800203009 005010300',
expected: false
},
{
s: '483 921 657\
967 345 821\
251 876 493\
548 132 976\
729 564 138\
136 798 245\
372 689 514\
814 253 769\
695 417 382',
expected: true
},
])
.test("isSolved test", function (params) {
var s = sudoku(params.s);
var ret = s.isSolved();
equal(ret, params.expected);
});
*/
/*
QUnit
.cases([
{
s: '003 020 600\
900 305 001\
001 806 400\
\
008 102 900\
700 000 008\
006 708 200\
\
002 609 500\
800 203 009\
005 010 300',
expected: true
},
{
s: '083 921 657\
967 345 821\
251 876 493\
548 132 976\
729 564 138\
136 798 245\
372 689 514\
814 253 769\
695 417 382',
expected: true
},
])
.test("isSolved test", function (params) {
var s = sudoku();
s.setBoard(params.s);
var ret = s.solve();
equal(ret, params.expected);
});
*/
//euler problem 96
//all but Grid 7, 50 can be solved using simple strategies only, using less
//than half second for all the puzzles
//with backtracking: Grid 7 got solution on the first try
//  Grid 50 got solution after a second cell guessing
// still total time is 500 ms
$.ajax({
  url: 'p096_sudoku.txt'
}).done(function (data) {
  var rows = data.split('\n');
  var boards = [];
  var i, board, row;
  var sum = 0;

  for (i = 0; i < rows.length; i++) {
    row = rows[i].trim();
    if (row === '') {
      break;
    }
    if (row.substr(0, 4) === 'Grid') {
      board = [];
      boards.push(board);
      continue;
    }
    board.push(row);
  }
  boards = _.map(boards, function (board) {
    return {
      board: board.join('|'),
      expected: true
    };
  });
  QUnit.cases(boards).test("euler problem 096 test", function (params) {
    var s = sudoku();
    s.setBoard(params.board);
    //console.log('before solve');
    //s.printBoard();
    var ret = s.solve();
    //console.log(ret);
    //s.printBoard();
    //console.log(s.getBoard());
    equal(ret, params.expected);
    var row = s.getBoard()[0];
    sum += row[0] * 100 + row[1] * 10 + row[2];
    s.printBoard();
    console.log(sum);
  });
}); 