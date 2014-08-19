QUnit
	.cases([
	    {n: 1, expected: 1},
	    {n: 10, expected: 27},
	    {n: 100, expected: 648}
	])
	.test("factorial digit sum test", function(params) {
	    var ret = factorialDigitSum(params.n);
	    equal(ret, params.expected);
	});

QUnit
.cases([
    {n: 1, expected: 2},
    {n: 8, expected: 13},
    {n: 15, expected: 26},
    {n: 1000, expected: 1366}
])
.test("power digit sum test", function(params) {
    var ret = powerDigitSum(params.n);
    equal(ret, params.expected);
});
