/// <reference path="../typings/qunit/qunit.d.ts"/>
/// <reference path="../js/euler.js"/>

//candidates
// - problem 122    efficient exponentiation
// - problem 161    triomenoes
// - problem 182    RSA encryption
// - problem 185    number mind
// - problem 186    connectedness of a network
// - problem 215    crack free walls
// - problem 252    convex holes
// - problem 287    quadtree encoding
// - problem 300    protein folding
// - problem 400    fibonacci tree game

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
    

QUnit
    .cases([
        { n: 12, expected: 12 },
        { n: 1000, expected: 840}
    ])
    .useTitleTemplate(true)
    .test("integer right triangles test, n=<%= n %>", function (params) {
        var ret = integerRightTriangles(params.n);
        equal(ret, params.expected);
    });
QUnit.test("xor decryption", function() {
    var encryptedData = [79,59,12,2,79,35,8,28,20,2,3,68,8,9,68,45,0,12,9,67,68,4,7,5,23,27,1,21,79,85,78,79,85,71,38,10,71,27,12,2,79,6,2,8,13,9,1,13,9,8,68,19,7,1,71,56,11,21,11,68,6,3,22,2,14,0,30,79,1,31,6,23,19,10,0,73,79,44,2,79,19,6,28,68,16,6,16,15,79,35,8,11,72,71,14,10,3,79,12,2,79,19,6,28,68,32,0,0,73,79,86,71,39,1,71,24,5,20,79,13,9,79,16,15,10,68,5,10,3,14,1,10,14,1,3,71,24,13,19,7,68,32,0,0,73,79,87,71,39,1,71,12,22,2,14,16,2,11,68,2,25,1,21,22,16,15,6,10,0,79,16,15,10,22,2,79,13,20,65,68,41,0,16,15,6,10,0,79,1,31,6,23,19,28,68,19,7,5,19,79,12,2,79,0,14,11,10,64,27,68,10,14,15,2,65,68,83,79,40,14,9,1,71,6,16,20,10,8,1,79,19,6,28,68,14,1,68,15,6,9,75,79,5,9,11,68,19,7,13,20,79,8,14,9,1,71,8,13,17,10,23,71,3,13,0,7,16,71,27,11,71,10,18,2,29,29,8,1,1,73,79,81,71,59,12,2,79,8,14,8,12,19,79,23,15,6,10,2,28,68,19,7,22,8,26,3,15,79,16,15,10,68,3,14,22,12,1,1,20,28,72,71,14,10,3,79,16,15,10,68,3,14,22,12,1,1,20,28,68,4,14,10,71,1,1,17,10,22,71,10,28,19,6,10,0,26,13,20,7,68,14,27,74,71,89,68,32,0,0,71,28,1,9,27,68,45,0,12,9,79,16,15,10,68,37,14,20,19,6,23,19,79,83,71,27,11,71,27,1,11,3,68,2,25,1,21,22,11,9,10,68,6,13,11,18,27,68,19,7,1,71,3,13,0,7,16,71,28,11,71,27,12,6,27,68,2,25,1,21,22,11,9,10,68,10,6,3,15,27,68,5,10,8,14,10,18,2,79,6,2,12,5,18,28,1,71,0,2,71,7,13,20,79,16,2,28,16,14,2,11,9,22,74,71,87,68,45,0,12,9,79,12,14,2,23,2,3,2,71,24,5,20,79,10,8,27,68,19,7,1,71,3,13,0,7,16,92,79,12,2,79,19,6,28,68,8,1,8,30,79,5,71,24,13,19,1,1,20,28,68,19,0,68,19,7,1,71,3,13,0,7,16,73,79,93,71,59,12,2,79,11,9,10,68,16,7,11,71,6,23,71,27,12,2,79,16,21,26,1,71,3,13,0,7,16,75,79,19,15,0,68,0,6,18,2,28,68,11,6,3,15,27,68,19,0,68,2,25,1,21,22,11,9,10,72,71,24,5,20,79,3,8,6,10,0,79,16,8,79,7,8,2,1,71,6,10,19,0,68,19,7,1,71,24,11,21,3,0,73,79,85,87,79,38,18,27,68,6,3,16,15,0,17,0,7,68,19,7,1,71,24,11,21,3,0,71,24,5,20,79,9,6,11,1,71,27,12,21,0,17,0,7,68,15,6,9,75,79,16,15,10,68,16,0,22,11,11,68,3,6,0,9,72,16,71,29,1,4,0,3,9,6,30,2,79,12,14,2,68,16,7,1,9,79,12,2,79,7,6,2,1,73,79,85,86,79,33,17,10,10,71,6,10,71,7,13,20,79,11,16,1,68,11,14,10,3,79,5,9,11,68,6,2,11,9,8,68,15,6,23,71,0,19,9,79,20,2,0,20,11,10,72,71,7,1,71,24,5,20,79,10,8,27,68,6,12,7,2,31,16,2,11,74,71,94,86,71,45,17,19,79,16,8,79,5,11,3,68,16,7,11,71,13,1,11,6,1,17,10,0,71,7,13,10,79,5,9,11,68,6,12,7,2,31,16,2,11,68,15,6,9,75,79,12,2,79,3,6,25,1,71,27,12,2,79,22,14,8,12,19,79,16,8,79,6,2,12,11,10,10,68,4,7,13,11,11,22,2,1,68,8,9,68,32,0,0,73,79,85,84,79,48,15,10,29,71,14,22,2,79,22,2,13,11,21,1,69,71,59,12,14,28,68,14,28,68,9,0,16,71,14,68,23,7,29,20,6,7,6,3,68,5,6,22,19,7,68,21,10,23,18,3,16,14,1,3,71,9,22,8,2,68,15,26,9,6,1,68,23,14,23,20,6,11,9,79,11,21,79,20,11,14,10,75,79,16,15,6,23,71,29,1,5,6,22,19,7,68,4,0,9,2,28,68,1,29,11,10,79,35,8,11,74,86,91,68,52,0,68,19,7,1,71,56,11,21,11,68,5,10,7,6,2,1,71,7,17,10,14,10,71,14,10,3,79,8,14,25,1,3,79,12,2,29,1,71,0,10,71,10,5,21,27,12,71,14,9,8,1,3,71,26,23,73,79,44,2,79,19,6,28,68,1,26,8,11,79,11,1,79,17,9,9,5,14,3,13,9,8,68,11,0,18,2,79,5,9,11,68,1,14,13,19,7,2,18,3,10,2,28,23,73,79,37,9,11,68,16,10,68,15,14,18,2,79,23,2,10,10,71,7,13,20,79,3,11,0,22,30,67,68,19,7,1,71,8,8,8,29,29,71,0,2,71,27,12,2,79,11,9,3,29,71,60,11,9,79,11,1,79,16,15,10,68,33,14,16,15,10,22,73];
    xorDecryption(encryptedData);
    //after inspection 
});
*/
    /*
$.ajax({
    url: 'keylog.txt'
}).done(function(data) {
    var ZERO = '0'.charCodeAt(0);
    var rows = data.split('\n');
    var answers = _.map(rows, function(row) {
        var len = row.length;
        var ret = [];
        var i;
        for(i = 0; i < len; i++) {
            ret.push(row.charCodeAt(i) - ZERO);
        }        
        return ret;
    });
    QUnit.test("passcode derivation test", function() {
        var ret = passcodeDerivation(answers);
        equal(ret.min, 8);            
    });
    });
    QUnit
        .cases([
            //edge weights are unique
            { input: 'p107_network_test.txt', expected: 150 },
            //edge weights are not unique
            { input: 'p107_network.txt', expected: 259679 }
        ])
        .useTitleTemplate(true)
        .asyncTest("minimal network test, input file =<%= input %>",
        function (params, assert) {
            $.ajax({
                url: params.input
            }).done(function(data) {
                var matrix = utils.readCSV(data);
                console.log(matrix);
                var ret = minimalNetwork(matrix);
                equal(ret, params.expected);            
                QUnit.start();
            });
        });
    */
    QUnit
        .cases([
             {    
                nDigits: 5,
                guesses: [
                    ['90342', 2],
                    ['70794', 0],
                    ['39458', 2],
                    ['34109', 1],
                    ['51545', 2],
                    ['12531', 1]
                ],
                expected: '39542'
            }
            ///*
             ,
            { 
                nDigits: 16,
                guesses: [
                    ['5616185650518293', 2], ['3847439647293047', 1],
                    ['5855462940810587', 3], ['9742855507068353', 3],
                    ['4296849643607543', 3], ['3174248439465858', 1],
                    ['4513559094146117', 2], ['7890971548908067', 3],
                    ['8157356344118483', 1], ['2615250744386899', 2],
                    ['8690095851526254', 3], ['6375711915077050', 1],
                    ['6913859173121360', 1], ['6442889055042768', 2],
                    ['2321386104303845', 0], ['2326509471271448', 2],
                    ['5251583379644322', 2], ['1748270476758276', 3],
                    ['4895722652190306', 1], ['3041631117224635', 3],
                    ['1841236454324589', 3], ['2659862637316867', 2]],
                expected: '1'}
              //  */
        ])
        .useTitleTemplate(true)
        .test("number mind test, nDigits=<%= nDigits %>", function (params) {
            var ret = numberMind(params.nDigits, params.guesses);
            equal(ret, params.expected);
        });
    
    
   /* 
    nDigits = 5;
    guesses = [['90342', 2],
                    ['70794', 0],
                    ['39458', 2],
                    ['34109', 1],
                    ['51545', 2],
                    ['12531', 1]];
nDigits= 16;
guesses = [ ['5616185650518293', 2], ['3847439647293047', 1],
    ['5855462940810587', 3], ['9742855507068353', 3],
    ['4296849643607543', 3], ['3174248439465858', 1],
    ['4513559094146117', 2], ['7890971548908067', 3],
    ['8157356344118483', 1], ['2615250744386899', 2],
    ['8690095851526254', 3], ['6375711915077050', 1],
    ['6913859173121360', 1], ['6442889055042768', 2],
    ['2321386104303845', 0], ['2326509471271448', 2],
    ['5251583379644322', 2], ['1748270476758276', 3],
    ['4895722652190306', 1], ['3041631117224635', 3],
    ['1841236454324589', 3], ['2659862637316867', 2]];
numberMind(nDigits, guesses);

    */