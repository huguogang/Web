/*
 * problem 1 multiples of 3 and 5
 */
function multiplesOfThreeAndFive(n) {
    var sum = 0;
    var i = 0;
    var threeStep = 3;
    var fiveStep = 5;
    var step = 0;
    while (i < n) {
        sum += i;

        step = Math.min(threeStep, fiveStep);
        i += step;
        threeStep -= step;
        fiveStep -= step;
        if (threeStep == 0) {
            threeStep = 3;
        }
        if (fiveStep == 0) {
            fiveStep = 5;
        }
    }
    return sum;
}

//find all factors of n
function findFactors(n) {
    var factors = [];
    var sq = Math.sqrt(n);
    var i;
    for (i = 1; i <= sq; i++) {
        if (n % i === 0) {
            factors.push(i);
            if (i < sq) {
                factors.push(n / i);
            }
        }
    }
    return factors;
}

//check if input is prime integer
function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    if(n === 2) {
        return true;
    }
    if(n%2 === 0) {
        return false;
    }
    
    var sq = Math.sqrt(n);
    var i;
    for (i = 3; i <= sq; i = i + 2) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

/*
 * problem 3 largest prime factor
 */
function largetPrimeFactor(n) {
    var i;
    var factors = findFactors(n);
    var len = factors.length;
    //default JS sort is Alphabetical Asending!
    //Numeric Descending Sort
    factors.sort(function (n1, n2) {
        return n1 < n2;
    });
    return _.find(factors, function (num) {
        return isPrime(num);
    });
}

//check if a number is palindrome
//assumption: n is position integer
function isPalindromeNumber(n) {
    var head, tail;
    var digits = [];
    while (n >= 10) {
        digits.push(n % 10);
        n = Math.floor(n / 10);
    }
    digits.push(n);
    head = digits.length - 1;
    tail = 0;
    while (head > tail) {
        if (digits[head] !== digits[tail]) {
            return false;
        }
        head--;
        tail++;
    }
    return true;
}

/*
 * problem 4 largest palindrome product 
 * @param n Number of digits
 */
function largestPalindromeProduct(n) {
    var i, j, product;
    var min = 1
        , max = 9;
    var maxP = 0;
    for (i = 1; i < n; i++) {
        min *= 10;
        max = max * 10 + 9;
    }
    for (i = min; i <= max; i++) {
        for (j = i; j <= max; j++) {
            product = i * j;
            if (product > maxP && isPalindromeNumber(product)) {
                maxP = product;
            }
        }
    }
    return maxP;
}

/*
 * problem 2 even fibonacci numbers
 */
function evenFibonacciNumbers(n) {
	var fib;
	var p = 2 		//previous
		, pp = 1  	//two back
		, sum = 2;
	
	//assuming n > 2
	while((fib = p + pp) <= n) {
		if(fib % 2 === 0) {
			sum += fib;
		}
		pp = p;
		p = fib;
	}
	return sum;
}

/*
 * decompose a natural number into product of prime numbers
 * 
 * @return Array of prime factors
 */
function primeFactorization(n) {
    var ret = [];
    var divider = 2;
    while(n > 1) {
        if(n%divider === 0) {
            ret.push(divider);
            n = n/divider;
        }
        else {
            divider++;
        }
    }
    return ret;
}
/*
 * problem 4 smallest multiple
 */
function smallestMultiple(n) {
    var tmp, i;
    var union = {};
    var factors = {};
    var product = 1;
    for(i = 2; i <= n; i++) {
        tmp = primeFactorization(i);
        factors = {};
        tmp.forEach(function(factor) {
            if(!factors[factor]) {
                factors[factor] = 0;
            }
            factors[factor] += 1;
        });
        _.each(factors, function(count, factor) {
           if(!union[factor]) {
               union[factor] = count;
           } 
           else if(union[factor] < count){
               union[factor] = count;
           }
        });
    }
    _.each(union, function(count, factor) {
         product *= Math.pow(factor, count);    
    });
    return product;
}
/*
 * problem 6 sum square difference
 */
function sumSquareDifference(n) {
    var sumOfSquares = 0,
        squareOfSum,
        sum = 0,
        i;
    for(i = 1; i <= n; i++) {
        sum += i;
        sumOfSquares += i * i;
    }
    squareOfSum = sum * sum;
    return squareOfSum - sumOfSquares;
}

/*
 * problem 7 10001st prime
 */
function _10001stPrime(n) {
    var prime,
        count = 0,
        number = 2;
    while(count < n) {
        if(isPrime(number)) {
            prime = number;
            count++;
        }
        number++;
    }
    return prime;
}

/*
 * problem 8 largest product in a series
 */
function largestProductInASeries(s, n) {
    var ZERO = '0'.charCodeAt(0);
    var i, digit;
    
    var arr = [],
        max = 0,    //could be true for all 0 digits case
        length = 0,
        product = 1;
    //convert s to number array
    for(i = 0; i < s.length; i++) {
        digit = s.charCodeAt(i) - ZERO;
        arr.push(digit);
        if(digit === 0) {
            //reset
            length = 0;
            product = 1;
            continue;
        }
        product *= digit;
        length++;
        if(length < n) {
            //still building up the first product
            continue;
        }
        if(length > n) {
            product = product / arr[i - n];
        }
        if(product > max) {
            max = product;
        }
    }
    return max;
}
/*
 * problem 9 Special Pythagorean triplet
 */
function specialPythagoreanTriplet() {
    var SUM = 1000;
    var a, b, c;
    //only search the case a < b < c
    for(c = Math.ceil(1000/3); c < 1000/2; c++) {
        for(b = Math.ceil((SUM - c)/2); b < c; b++) {
            a = SUM - c - b;
            if(a*a + b*b - c*c === 0) {
                console.log(a, b, c);
                return a * b * c;
            }
        }
    }
}
/*
 * problem 10 summation of primes
 */
function summationOfPrimes(n) {
    var sum = 0;
    var i;
    for(i = 2; i <= n; i++) {
        if(isPrime(i)) {
            sum += i;
        }
    }
    return sum;
}
/*
 * problem 14 longest collatz sequence
 */
function longestCollatzSequence(searchMax) {
    var n, i, j, len, path;
    //store known results, expect no more than 1 million records
    //improve search of 1,000,000 from 10 sec to 2 sec
    var memo = {1: 1};
    var maxLen = 1
        , maxNum = 1;
    for (i = 2; i < searchMax; i++) {
        n = i;
        path = [];
        while (true) {
            if (memo[n]) {
                //hit cache, remember 1 is already in the cache
                //so this is our exit of the while loop
                len = memo[n];
                break;
            }
            else {
                path.push(n);
                if (n % 2 === 0) {
                    //even
                    n = n / 2;
                }
                else {
                    n = 3 * n + 1;
                }
            }
        }
        //unwind the stack, add to memo
        for (j = path.length - 1; j >= 0; j--) {
            len++;
            memo[path[j]] = len;
        }
        if (len > maxLen) {
            //save max result
            maxLen = len;
            maxNum = i;
        }
    }
    return maxNum;
}

/*
 * problem 39 Integer right triangles
 */
function integerRightTriangles(n) {
    var sum = n;
    var a, b, c;
    var count = 0,
        maxCount = 0,
        maxSum = 0;
    for(sum = 1; sum <= n; sum++) {
        count = 0;
        //only search the case a < b < c
        for(c = Math.ceil(sum/3); c < sum/2; c++) {
            for(b = Math.ceil((sum - c)/2); b < c; b++) {
                a = sum - c - b;
                if(a*a + b*b - c*c === 0) {
                    count++;
                }
            }
        }
        if(count > maxCount) {
            maxCount = count;
            maxSum = sum;
        }
    }
    return maxSum;
}

//help, xor key over data
function xorDecode(data, key) {
    var ret = [];
    var keyLen = key.length;
    var i, dd;
    for(i = 0; i < data.length; i++) {
        ret.push(data[i] ^ key[i % keyLen]);
    }
    return ret;
}
/*
 * problem 59 xor decryption
 */
function xorDecryption(encryptedData) {
    var SPACE = ' '.charCodeAt(0);
    var EXCLUDE = [
        '~'.charCodeAt(0),
        '|'.charCodeAt(0),
        '%'.charCodeAt(0),
        '{'.charCodeAt(0),
        '}'.charCodeAt(0),
        '^'.charCodeAt(0)
    ];
    var a = 'a'.charCodeAt(0);
    var z = 'z'.charCodeAt(0);
    var key = [];
    var threshold = encryptedData.length * 0.05;
    var decryptedData;
    var i, j, k, nSpace;
    for(i = a; i <= z; i++) {
        for(j = a; j <= z; j++) {
            for(k = a; k <= z; k++) {
                key = [i, j, k];
                decryptedData = xorDecode(encryptedData, key);
                if(_.some(decryptedData, function(ch){
                    return (ch < 32 || _.contains(EXCLUDE, ch));
                })) {
                    //ASCII code 31 or under are not displayable
                    continue;
                }
                //a rough criteria: space character should be
                //more than 5 percent of the total length
                nSpace = _.reduce(decryptedData, function(count, ch) {
                    return (ch === SPACE ? count + 1 : count);
                }, 0);
                if(nSpace > threshold) {
                    s = String.fromCharCode(i, j, k);
                    console.log('\n-------------------------\nkey: ', s);
                    s = '';
                    _.each(decryptedData, function(ch) {
                        s = s + String.fromCharCode(ch);
                    });
                    
                    //after inspection by eye, key is found to be 'god'
                    console.log(s);
                    //sum
                    console.log(_.reduce(decryptedData, function(memo, ch) {return ch + memo;}, 0));
                    //debugger;
                }
            }
        }
    }
}
/*
 * problem 63 powerful digit counts
 */
function powerfulDigitCounts() {
    var count = 0;
    //we only need to search 1 through 9, anything above 10 is hopeless
    var base, exp, val, digit;
    for (base = 1; base <= 9; base++) {
        val = base;
        exp = 1;
        digit = 1;
        while (val >= digit && val < digit * 10) {
            count++;
            val *= base;
            exp++;
            digit *= 10;

        }
    }
    return count;
}
/**
 * big integer with high precision
 */
function bigInteger(initValue) {
    var MAX = 1000000;
    var result = [initValue];
    var needMerge = false;
    var isFlat = false;
    var merge = function (arr) {
        var i, digit;
        for (i = 0; i < arr.length; i++) {
            digit = arr[i];
            if (digit >= 10) {
                //carry to higher digit
                arr[i] = digit % 10;
                if (i + 1 >= arr.length) {
                    //lazy init new most significant digit
                    arr[i + 1] = 0;
                }
                arr[i + 1] += Math.floor(digit / 10);
            }
        }
        needMerge = false;
        isFlat = true;
    };
    var sum = function () {
        finish();
        
        return _.reduce(result, function (memo, num) {
            return memo + num;
        }, 0);
    };
    /*
     * multiply with another integer
     */
    var multiply = function (n) {
        isFlat = false;

        _.each(result, function (digit, index, arr) {
            arr[index] = digit * n;
            if (arr[index] > MAX) {
                needMerge = true;
            }
        });
        if (needMerge) {
            merge(result);
        }
        return this;
    };
    var finish = function () {
        if (!isFlat) {
            merge(result);
        }
        return this;
    };
    /*
     * add another big integer
     */
    var add = function(other) {
        isFlat = false;
        var arrOther = other.result();   
        _.each(arrOther, function(digit, index) {
            if(index >= result.length) {
                result[index] = 0;
            }
            result[index] += digit;
            if(result[index] > MAX) {
                needMerge = true;
            } 
        });
        if(needMerge) {
            merge(result);
        }
        return this;
    };
    var print = function() {
        finish();
        var i;
        var s = '';
        for(i = result.lengt - 1; i >=0; i--) {
            s += result[i];
        }
        console.log(s);
    };
    var length = function() {
        finish();
        return result.length;
    };
    var getResult = function() {
        finish();
        return result;
    };
    return {
        multiply: multiply,
        sum: sum,
        finish: finish,
        add: add,
        print: print,
        length: length,
        result: getResult
    };
};
/*
 * problem 20 factorial digit sum
 */
function factorialDigitSum(n) {
    var result = bigInteger(1);
    var sum, i;
    for (i = 2; i <= n; i++) {
        result.multiply(i);
    }
    result.finish();
    return result.sum();
}

/*
 * problem 16 Power digit sum
 */
function powerDigitSum(n) {
    var result = bigInteger(1);
    var i, sum;
    for (i = 1; i <= n; i++) {
        result.multiply(2);
    }
    result.finish();
    return result.sum();
}

/*
 * problem 56 powerful digit sum
 */
function powerfulDigitSum(n) {
    var maxSum = 0;
    var a, b, sum;
    var bigInt;
    for (i = 2; i < n; i++) {
        bigInt = bigInteger(i);
        for (j = 1; j < n; j++) {
            sum = bigInt.sum();
            if (sum > maxSum) {
                maxSum = sum;
            }
            bigInt.multiply(i);
        }
    }
    return maxSum;
}

/*
 * problem 25 1000-digit Fibonacci number
 */
function _1000DigitFibonacciNumber(n) {
    var p = bigInteger(1);
    var pp = bigInteger(1);
    var count = 2;
    var tmp;
    while(p.length() < n) {
        pp.add(p);
        tmp = pp;
        pp = p;
        p = tmp;
        count++;
    }    
    return count;
}

/*
 * problem 79 passcode derivation
 */
function passcodeDerivation(answers) {
    var minCode = [];
    var min = ''; //indication of no answer yet
    var code = []; //code of the current search path
    
    var data = _.map(answers, function(answer) {
       return { 
           answer: answer,
           currentPos: 0
       }; 
    });  
    var numAnswers = 0;
    var numPrune1s = 0;
    var numPrune2s = 0;
    
    var searchR = function(data) {
        //remove code that are already covered
        var arr = _.filter(data, function(row) {
            return (row.currentPos < row.answer.length);
        });
        if(arr.length === 0) {
            //termination condition: all digits are covered
            if(min === '' || code.length < min) {
                min = code.length;
                //clone the code
                minCode = [];
                _.each(code, function(num) {
                   minCode.push(num); 
                });
                //console.log('found a better solution: ', min);
                //console.log(minCode);
            }
            numAnswers++;
            return;
        }
        if(min!== '' && code.length >= min) {
            //prune, already worse than current best solution
            numPrune1s++;
            return;
        }
        //group by the current head of all answers
        var group = _.groupBy(arr, function(row){
            return row.answer[row.currentPos];
        });
        //start search from the most numerous number
        group = _.sortBy(group, function(rows, num) {
            return -rows.length;
        });
        if(min !== '' && code.length + group.length >= min) {
            //prune, total expected length cannot beat the current best solution
            numPrune2s++;
            return;
        }
        
        //recursively search all numbers presented in the group
        _.each(group, function(rows) {
            var row0, num;
            row0 = rows[0];
            var num = row0.answer[row0.currentPos];
            code.push(num);
            _.each(rows, function(row) {
               row.currentPos++; 
            });          
            searchR(data);
            //clean up, ready to switch to search another branch
            code.pop();
            _.each(rows, function(row) {
               row.currentPos--; 
            });          
        });
    };
    
    searchR(data);
    //console.log("number of answers ", numAnswers);
    //console.log("number of type 1 prunes", numPrune1s);
    //console.log("number of type 2 prunes", numPrune2s);
    
    return {
        min: min,
        minCode: minCode
    };
}

/*
 * problem 107 minimal network
 */
function minimalNetwork(matrix) {
    //convert matrix to network data
    var nVertex = matrix.length;
    var edges = [];
    //lookup of all connected nodes
    var treeNodes = {};
    //number of connected v when buidling tree
    var nEdge = 0; //index of edge we are visiting
    var totalWeight = 0,
        minWeight = 0;
    var i, v1, v2, edge, weight;
    for(v1 = 0; v1 < nVertex - 1; v1++) {
        for(v2 = v1 + 1; v2 < nVertex; v2++) {
            weight = matrix[v1][v2].trim();
            if(weight === '-') {
                continue;
            }
            weight = parseInt(weight);
            edges.push({
                v1: v1,
                v2: v2,
                weight: weight
            });
            totalWeight += weight;
        }
    }
    //min edge first
    edges = _.sortBy(edges, function(e) {
       return e.weight; 
    });
    var addEdge = function(edge) {
        treeNodes[edge.v1]  =1;
        treeNodes[edge.v2] = 1;
        minWeight += edge.weight;
    };
    addEdge(edges[0]); //min edge is always in
    i = 1; //edge iterator
    nEdge = 1; //total edges selected
    while(nEdge < nVertex - 1) {
        edge = edges[i];
        if(treeNodes[edge.v1] ^ treeNodes[edge.v2]) {
            //add min edge connect current tree to a new node
            addEdge(edge);
            i = 1;
            nEdge++;
        }
        else {
            i++;
        }
    }
    return totalWeight - minWeight;
}
/*
 * problem 185 number mind
 */
function numberMind(nDigits, guesses) {
    //because it's stated that we have a unique answer, some
    //shortcut are taken
    var i, j, tmp;
    //total count of digits that have guessed right
    var totalMatchingDigits = _.reduce(guesses, function(memo, guess) {
            return guess[1] + memo; 
        }, 0);
    console.log('totoal matches: ', totalMatchingDigits);
    
    //digit 0 is the most significant digit
    var digitCandidates = [];
     
    //using our guesses to prune down candidates of each digit
    for(i = 0; i < nDigits; i++) {
        //digits that are guessed for digit[i]
        tmp = _.groupBy(guesses, function(guess) {
           return guess[0].charAt(i); 
        });

        //Add digits that never showed up in the guesses
        //they make fine search candidates with guess count = 0
        //since we're told there is unique solution, corners are cut here
        // -- Only add when there is only one missing number
        /*if(_.size(tmp) === 9) {
            for(j = 0; j < 10; j++) {
                if(!tmp[j]) {
                    tmp[j] = [];
                }
            }
        }
         */
        //exclude digits that showed up in "0" matching cases
        digitCandidates[i] = []; 
        _.each(tmp, function(guesses, digit) {
           if(!_.some(guesses, function(guess) {
              return (guess[1] == 0); 
           })) {
                digitCandidates[i].push({digit: digit, count: guesses.length});
           }
        });
    }
    var minMax = []; //min and max count that can be reached at each digit (from lsd to msd)
    var min, max;
    minMax[nDigits] = {min: 0, max: 0}; //tail boundary condition
    for(i = nDigits - 1; i >= 0; i--) {
        min = _.min(digitCandidates[i], function(candidate) {
           return candidate.count; 
        });
        min = min.count;
        max = _.max(digitCandidates[i], function(candidate) {
           return candidate.count; 
        });
        max = max.count;
        //accumulate from right to left
        minMax[i] = {
            min: min + minMax[i + 1].min, 
            max: max + minMax[i + 1].max
        };  
    }
    console.log(JSON.stringify(minMax));
    //console.log(JSON.stringify(digitCandidates));
    //return;
    /*
    //search for count candidates for each digit
    var countCandidates = _.map(digitCandidates, function(candidates) {
       return _.groupBy(candidates, function(candidate) {
          return candidate.count; 
       });
    });
    console.log(JSON.stringify(countCandidates));
    return '';*/
    var loopCount = 0;
    var answer = [];
    var answerCount = 0; //total matching digits of our count
    var loopCount = 0;
    
    /*
     * search solution recursively
     * 
     * @param candidates    Candidates for each digit
     * @param digit         The current digit of interest 
     */
    var searchR = function(candidates, digit) {
        loopCount++;
        if(loopCount > 10000000) {
            console.log('stop loop now');
            console.log(answer);
            console.log(digit);
            return false;
        }
        var digitCandidates = candidates;
        //termination condition
        if(digit >= nDigits) {
            if(answerCount !== totalMatchingDigits) {
                return false;
            }    
            else {
                console.log("found a potential candidate: ", answer);
                //scan all guesses see if we match
                return _.every(guesses, function(guess) {
                    //no need to verify "0" guesses, because their
                    //digits are excluded in our search
                    if(guess[1] === 0) {
                        return true;
                    }
                    
                    var nMatches = 0;
                    var i;
                    for(i = 0; i < nDigits; i++) {
                        if(answer[i] === guess[0].charAt(i)) {
                            nMatches++;
                        }
                    }
                    //debugger;
                    return nMatches === guess[1];
                });
            }
        }
        
        return _.some(digitCandidates[digit], function(guess) {
            answer[digit] = guess.digit;
            answerCount += guess.count;
            //candidates for the search of rest of the digits
            //might be further pruned
            var newCandidates = digitCandidates;
            //array of guesses
            //new guesses that met their answer, thus the rest of digits
            //are excluded from scanning of the following digits
            var newExclusions = [];
            var isCloned = false;
            //prune condition
            // 1. total matching digits so far is too big or too small
            // 2. some numbers already have too many matching
            var digitMatch = _.every(guesses, function(guess) {
                if(guess[1] === 0) {
                    return true; //ok, should not have any of its digits
                } 
                if(guess[2]) {
                    //they are the new zeros based on recursion so far,
                    //expanded exclusion during scanning when it met
                    //count of matching digits
                    //console.log('it helps');
                    return true;
                }
                var nMatches = 0;
                var i, tmp;
                var max = nDigits - digit - 1; //if the rest all match this number 
                for(i = 0; i <= digit; i++) {
                    if(answer[i] === guess[0].charAt(i)) {
                        nMatches++;
                    }
                }
                if(nMatches === guess[1] && digit < nDigits - 1) {
                    if(!isCloned) {
                        //make a shallow clone
                        //if any digit's candidates is modified, a clone will
                        //be made on demand
                        newCandidates = _.map(digitCandidates, function(candidate) {
                            return candidate;
                        });
                        isCloned = true;
                    }
                    //prune candidates for the search following this one
                    for(i = digit + 1; i < nDigits; i++) {
                        tmp = guess[0].charAt(i); //exclusion
                        newCandidates[i] = _.reject(newCandidates[i], function(val) {
                            return val.digit === tmp;
                        });
                    }
                    guess[2] = true; //flag this guess to prevent further scanning
                    newExclusions.push(guess);
                    //console.log(newCandidates);
                    //debugger;
                }
                //debugger;
                return nMatches <= guess[1] && nMatches >= (guess[1] - max);
            });
            if(digitMatch &&
               answerCount <= (totalMatchingDigits - minMax[digit + 1].min) &&
               answerCount >= (totalMatchingDigits - minMax[digit + 1].max)) {
                if(searchR(newCandidates, digit + 1)) {
                    return true;
                }
            }
            //rewind
            answerCount -= guess.count;
            _.forEach(newExclusions, function(guess) {
               guess[2] = false; 
            });
        });
    };

    var searchResult = searchR(digitCandidates, 0);
    console.log(searchResult);
    console.log('loopCount', loopCount);
    return answer.join('');
}
/*
 * problem 191 prize strings
 */
function prizeStrings(n) {
    var i;
    //init state for n = 1
    var count = {
        //total prize string
        total: 3,
        //prize string with no A in the front
        nWOA: 2,
        //prize string with one A in the front
        nA: 1,
        //prize string with a L
        nL: 1,
        //prize string starts with no A, with one L
        nLWOA: 1,
        //prize string starts with one A, has one L
        nLA: 0
    };
    //new counts for the next iteration
    var total, nWOA, nA, nL;
    for (i = 2; i <= n; i++) {
        //iteratively add one day in front
        total = count.total +               //starts with O
            count.nWOA + count.nA +  //starts with A
            (count.total - count.nL);   //starts with L
        nWOA = count.total +         //starts with O
               (count.total - count.nL);          //starts with L
        nA = count.nWOA;           //starts with A             
        nL = count.nL +             //starts with O
             count.nLWOA + count.nLA +             //starts with A
             (count.total - count.nL);  //starts with L
        nLWOA = count.nL +      //starts with O
                count.total - count.nL;          //starts with L
        nLA = count.nLWOA;     //starts with A

        count = {
            total: total,
            nWOA: nWOA,
            nA: nA,
            nL: nL,
            nLWOA: nLWOA,
            nLA: nLA
        };
    }
    return count.total;
}
