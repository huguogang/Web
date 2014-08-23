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

QUnit
.cases([
    { n: 3, expected: 2 },
    { n: 4000000, expected: 4613732 }
])
.useTitleTemplate(true)
.test("even fibonacci number test, n=<%= n %>", function (params) {
    var ret = evenFibonacciNumbers(params.n);
    equal(ret, params.expected);
});

QUnit
    .cases([
        { n: 2, expected: 2 },
        { n: 16, expected: 5 }
    ])
    .useTitleTemplate(true)
    .test("find factors test, n=<%= n %>", function (params) {
        var ret = findFactors(params.n);
        equal(ret.length, params.expected);
    });

QUnit
    .cases([
        { n: 1, expected: true },
        { n: 2, expected: true },
        { n: 47, expected: true },
        { n: 16, expected: false }
    ])
    .useTitleTemplate(true)
    .test("is prime test, n=<%= n %>", function (params) {
        var ret = isPrime(params.n);
        equal(ret, params.expected);
    });

QUnit
    .cases([
        { n: 1, expected: 1 },
        { n: 2, expected: 2 },
        { n: 47, expected: 47 },
        { n: 16, expected: 2 },
        { n: 600851475143, expected: 6857}
    ])
    .useTitleTemplate(true)
    .test("largest prime factor test, n=<%= n %>", function (params) {
        var ret = largetPrimeFactor(params.n);
        equal(ret, params.expected);
    });
QUnit
    .cases([
        { n: 1, expected: true },
        { n: 12, expected: false },
        { n: 11, expected: true },
        { n: 121, expected: true }
    ])
    .useTitleTemplate(true)
    .test("isPalindromeNumber test, n=<%= n %>", function (params) {
        var ret = isPalindromeNumber(params.n);
        equal(ret, params.expected);
    });

QUnit
    .cases([
        { n: 1, expected: 9 },
        { n: 2, expected: 9009 },
        { n: 3, expected: 906609 }
    ])
    .useTitleTemplate(true)
    .test("largest palindrome product test, n=<%= n %>", function (params) {
        var ret = largestPalindromeProduct(params.n);
        equal(ret, params.expected);
    });
QUnit
    .cases([
        { n: 10, expected: 2520 },
        { n: 20, expected: 232792560 }
    ])
    .useTitleTemplate(true)
    .test("smallest multiple test, n=<%= n %>", function (params) {
        var ret = smallestMultiple(params.n);
        equal(ret, params.expected);
    });
    
QUnit
    .cases([
        { n: 10, expected: 2640 },
        { n: 100, expected: 25164150 }
    ])
    .useTitleTemplate(true)
    .test("smallest multiple test, n=<%= n %>", function (params) {
        var ret = sumSquareDifference(params.n);
        equal(ret, params.expected);
    });
*/
/*
QUnit
    .cases([
        { n: 6, expected: 13 },
        { n: 10001, expected: 104743}
    ])
    .useTitleTemplate(true)
    .test("10001st prime test, n=<%= n %>", function (params) {
        var ret = _10001stPrime(params.n);
        equal(ret, params.expected);
    });

//input data
var s = '73167176531330624919225119674426574742355349194934\
96983520312774506326239578318016984801869478851843\
85861560789112949495459501737958331952853208805511\
12540698747158523863050715693290963295227443043557\
66896648950445244523161731856403098711121722383113\
62229893423380308135336276614282806444486645238749\
30358907296290491560440772390713810515859307960866\
70172427121883998797908792274921901699720888093776\
65727333001053367881220235421809751254540594752243\
52584907711670556013604839586446706324415722155397\
53697817977846174064955149290862569321978468622482\
83972241375657056057490261407972968652414535100474\
82166370484403199890008895243450658541227588666881\
16427171479924442928230863465674813919123162824586\
17866458359124566529476545682848912883142607690042\
24219022671055626321111109370544217506941658960408\
07198403850962455444362981230987879927244284909188\
84580156166097919133875499200524063689912560717606\
05886116467109405077541002256983155200055935729725\
71636269561882670428252483600823257530420752963450';
QUnit
    .cases([
        { n: 4, expected: 5832 },
        { n: 13, expected: 23514624000}
    ])
    .useTitleTemplate(true)
    .test("largest product in a series test, n=<%= n %>", function (params) {
        var ret = largestProductInASeries(s, params.n);
        equal(ret, params.expected);
    });
QUnit.test("Special Pythagorean triplet test", function() {
   var ret = specialPythagoreanTriplet();
   equal(ret, 31875000);
});

QUnit
    .cases([
        { n: 10, expected: 17 },    //2 ms
        { n: 2000000, expected: 142913828922} //500 ms
    ])
    .useTitleTemplate(true)
    .test("summation of primes test, n=<%= n %>", function (params) {
        var ret = summationOfPrimes(params.n);
        equal(ret, params.expected);
    });
    
QUnit
    .cases([
        { n: 3, expected: 12 },
        { n: 1000, expected: 4782}
    ])
    .useTitleTemplate(true)
    .test("1000-digit Fibonacci number test, n=<%= n %>", function (params) {
        var ret = _1000DigitFibonacciNumber(params.n);
        equal(ret, params.expected);
    });
*/
    

QUnit
    .cases([
        { n: 12, expected: 12 },
        { n: 1000, expected: 1}
    ])
    .useTitleTemplate(true)
    .test("integer right triangles test, n=<%= n %>", function (params) {
        var ret = integerRightTriangles(params.n);
        equal(ret, params.expected);
    });