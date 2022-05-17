// ------------- May 14 Bi-weekly ----------------
var divisorSubstrings = function (num, k) {
  // Extract k-digits from num
  // Divid num with k-digits and check whether it is divisible to a whole number
  // return how many times it can be divisible
  let kbeauty = 0;
  let numStr = num.toString();
  for (let i = 0; i < numStr.length - k + 1; i += 1) {
    let divisor = numStr.slice(i, i + k);
    if (Number(divisor) === 0) continue;
    divisor;
    if (num % divisor === 0) kbeauty += 1;
  }
  return kbeauty;
};

// console.log(divisorSubstrings(30003, 3));

var waysToSplitArray = function (nums) {
  // Find SUM of nums
  // Find sum of first split
  // subctract sum of first split from SUM, and test its validity
  const sumAll = nums.reduce((a, b) => a + b);
  let validResult = 0;
  let firstSplit = 0;
  for (let i = 0; i < nums.length - 1; i += 1) {
    firstSplit += nums[i];
    let secondSplit = sumAll - firstSplit;
    console.log(firstSplit)
    console.log(secondSplit)
    if (firstSplit >= secondSplit) validResult += 1;
  }
  return validResult;
};

// console.log(waysToSplitArray([10, 4, -8, 7]));

