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
                    debugger;
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