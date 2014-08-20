QUnit.config.reorder = false;
/*
QUnit
    .cases([
        { n: 1, expected: 1 },
        { n: 10, expected: 27 },
        { n: 100, expected: 648 }
    ])
    .useTitleTemplate(true)
    .test("factorial digit sum test, n=<%= n %>", function (params) {
        var ret = factorialDigitSum(params.n);
        equal(ret, params.expected);
    });

QUnit
    .cases([
        { n: 1, expected: 2 },
        { n: 8, expected: 13 },
        { n: 15, expected: 26 },
        { n: 1000, expected: 1366 }
    ])
    .useTitleTemplate(true)
    .test("power digit sum test, n=<%= n %>", function (params) {
        var ret = powerDigitSum(params.n);
        equal(ret, params.expected);
    });
*/
/*
QUnit
    .cases([
        { n: 3, expected: 4 },
        { n: 4, expected: 9 },
        { n: 10, expected: 45 },
        { n: 50, expected: 406 },
        { n: 100, expected: 972 }
    ])
    .useTitleTemplate(true)
    .test("powerful digit sum test, n=<%= n %>", function (params) {
        var ret = powerfulDigitSum(params.n);
        equal(ret, params.expected);
    });

QUnit
    .cases([
        { n: 1, expected: 3 },
        { n: 2, expected: 8 },
        { n: 3, expected: 19 },
        { n: 4, expected: 43 },
        { n: 30, expected: 1918080160 }
    ])
    .useTitleTemplate(true)
    .test("prize strings test, n=<%= n %>", function (params) {
        var ret = prizeStrings(params.n);
        equal(ret, params.expected);
    });

QUnit
    .cases([
        { n: 1, expected: 0 },
        { n: 10, expected: 23 },
        { n: 1000, expected: 233168 }
    ])
    .useTitleTemplate(true)
    .test("multiples of 3 and 5 test, n=<%= n %>", function (params) {
        var ret = multiplesOfThreeAndFive(params.n);
        equal(ret, params.expected);
    });

QUnit.test("powerful digit counts", function () {
    var ret = powerfulDigitCounts();
    var expected = 49;
    equal(ret, expected);
});
 */
QUnit
    .cases([
        { n: 2, expected: 1 },
        { n: 3, expected: 2 },
        { n: 4, expected: 3 },
        { n: 5, expected: 3 },
        { n: 7, expected: 6 },
        { n: 12, expected: 9 },
        { n: 13, expected: 9 }
        ,
        { n: 1000000, expected: 837799 }
    ])
    .useTitleTemplate(true)
    .test("longest collatz sequence test, n=<%= n %>", function (params) {
        var ret = longestCollatzSequence(params.n);
        equal(ret, params.expected);
    });