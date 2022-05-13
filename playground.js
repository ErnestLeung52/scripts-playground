// Brute Force -> TC: O(n^2), SC: O(1)

const twoSum = (array, target) => {
  for (let i = 0; i < array.length; i += 1) {
    for (let j = i + 1; j < array.length - 1; j += 1) {
      if (array[i] + array[j] === target) {
        return true;
      }
    }
  }
  return false;
};

// Hash Tabel Approach -> TC: O(n), SC: O(n)

const twoSum2 = (array, target) => {
  const hashTable = {};
  for (let i = 0; i < array.length; i += 1) {
    // if(hashTable[array[i]]) return true;
    let potentialMatch = target - array[i];
    // hashTable[potentialMatch] = true;

    if (potentialMatch in hashTable) {
      return true;
    } else {
      hashTable[array[i]] = potentialMatch;
    }
  }
  return false;
};

// console.log(twoSum2([1, 2, 5, 7, 8], 13));

function findThreeLargestNumbers(array) {
  // Write your code here.
}

let a = 0,
  b = 1,
  c = 2;

function shift(num, s, m, l) {
  a = m;
  b = l;
  c = num;
}

shift(10, a, b, c);
// console.log(a, b, c);
