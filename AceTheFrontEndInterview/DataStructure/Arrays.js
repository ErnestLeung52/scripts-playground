/* 1. Merge Two Sorted Arrays
 Given two sorted arrays, merge them into one array that is sorted. 
arr1 = [1,3,4,5]  
arr2 = [2,6,7,8]
*/
const mergeArrays = (arr1, arr2) => {
	// N+M
	// Iterate through arr1 and arr2 with index i & j with while loop
	// if i and j ===, push both into output arr, and increment i,j
	// else if i < j, push i first, then increment i
	// else push j, then increment j
	// concat any remaining ele from arr1/arr2 to output
	const output = [];

	let i = 0;
	let j = 0;

	while (i < arr1.length && j < arr2.length) {
		const num1 = arr1[i];
		const num2 = arr2[j];

		if (num1 === num2) {
			output.push(num1, num2);
			i++;
			j++;
		} else if (num1 < num2) {
			output.push(num1);
			i++;
		} else {
			output.push(num2);
			j++;
		}
	}

	// while (i < arr1.length) {
	// 	output.push(arr1[i]);
	// 	i++;
	// }

	// while (j < arr2.length) {
	// 	output.push(arr2[j]);
	// 	j++;
	// }

	const nonExhaustedArr = arr1[i] ? arr1 : arr2;
	const nonExhaustedIndex = arr1[i] ? i : j;

	for (let k = nonExhaustedIndex; k < nonExhaustedArr.length; k++) {
		output.push(nonExhaustedArr[k]);
	}

	return output;
};
// console.log(mergeArrays([1, 2, 3, 13], [10, 11, 12]));

/* 2. twoSum
Given an array and a number "value", find two numbers from the array that sum to 'value'. 
*/
const twoSum = (arr, value) => {
	// Iterate through arr
	// subtract current num in arr from value to find the diff
	// lookup in object to see if there is a key with diff
	// if so, return it this [key, diff]
	// store into an object as currNum:diff

	const obj = {};

	for (let i = 0; i < arr.length; i++) {
		const diff = value - arr[i];

		// If we don't find the diff first, we might ended up using the same element
		if (diff in obj) {
			return [arr[i], diff];
		}

		obj[arr[i]] = diff;
	}

	return [];
};
// console.log(twoSum([1, 4, 6, 5, 10], 10));

/* 3. Product except self
Implement a function, findProduct(arr), which modifies an array so that each index has a product of all the numbers present in the array except the number stored at that index.
input: [1,2,3,4]
output: [24,12,8,6]
prefix = [1, 1*1, 1*2, 2*3]
suffix = [2*12, 3*4, 4*1, 1] 
*/
const productExceptSelf = (arr) => {
	// Loop through arr 2 times
	// prefix: for each current number, find the product of all its previous numbers
	// suffix: for each curretn number, find the product of all its following numbers
	// special case: start/end should be 1
	// multiple the number from prefix and suffix in order to get the result

	const result = [];

	const prefix = [];

	for (let i = 0; i < arr.length; i++) {
		if (i === 0) {
			prefix[i] = 1;
		} else {
			prefix[i] = arr[i - 1] * prefix[i - 1];
		}
	}

	const suffix = [];

	for (let j = arr.length - 1; j >= 0; j--) {
		if (j === arr.length - 1) {
			suffix[j] = 1;
		} else {
			suffix[j] = arr[j + 1] * suffix[j + 1];
		}
	}

	for (let k = 0; k < prefix.length; k++) {
		result[k] = prefix[k] * suffix[k];
	}

	return result;
};
// console.log(productExceptSelf([1, 2, 3, 4]));

const productExceptSelf_optimized = (arr) => {
	const result = [];

	let prefix = 1;

	for (let i = 0; i < arr.length; i++) {
		result[i] = prefix;
		prefix = prefix * arr[i];
	}

	let suffix = 1;

	for (let j = arr.length - 1; j >= 0; j--) {
		result[j] = result[j] * suffix;
		suffix = suffix * arr[j];
	}

	return result;
};
// console.log(productExceptSelf_optimized([1, 2, 3, 4]));
