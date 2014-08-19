/**
 * big integer with high precision
 */
function bigInteger(initValue) {
	var MAX = 100;
	var result = [initValue];
	var needMerge = false;
	var merge = function(arr) {
		_.each(arr, function(digit, index, arr) {
			if(digit >= 10) {
				//carry to higher digits
				arr[index] = 0;
				while(digit > 0) {
					//lazy init new most significant digit
					if(index >= arr.length) {
						arr[index] = 0;
					}
					arr[index] = digit % 10 + arr[index];
					index = index + 1;
					digit = Math.floor(digit / 10);
				}
			}
		});
		needMerge = false;
	};
	var sum = function() {
		return _.reduce(result, function(memo, num) {
			return memo + num;
		}, 0);
	};
	var multiply = function(n) {
		_.each(result, function(digit, index, arr) {
			arr[index] = digit * n;
			if(arr[index] > MAX) {
				needMerge = true;
			}
		});
		if(needMerge) {
			merge(result);
		}
	};
	var finish = function() {
		merge(result);
	};
	return {
		multiply: multiply,
		sum: sum,
		finish: finish
	};
};

function factorialDigitSum(n) {
	var result = bigInteger(1);
	var sum, i;
	for(i = 2; i <=n; i++) {
		result.multiply(i);
	}	
	result.finish();
	return result.sum();
}

function powerDigitSum(n) {
	var result = bigInteger(1);
	var i, sum;
	for(i = 1; i <= n; i++) {
		result.multiply(2);
	}
	result.finish();
	return result.sum();
}