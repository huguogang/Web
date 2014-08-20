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
        if (!isFlat) {
            merge(result);
        }
        return _.reduce(result, function (memo, num) {
            return memo + num;
        }, 0);
    };
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
        merge(result);
        return this;
    };
    return {
        multiply: multiply,
        sum: sum,
        finish: finish
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