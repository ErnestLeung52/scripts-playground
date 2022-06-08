// function remove_duplicates(arr) {
//     // index of the next non-duplicate element
//     let nextNonDuplicate = 1;

//     let i = 0;
//     while (i < arr.length) {
//         // console.log(arr[nextNonDuplicate - 1], arr[i])
//       if (arr[nextNonDuplicate - 1] !== arr[i]) {
//         arr[nextNonDuplicate] = arr[i];
//         nextNonDuplicate += 1;
//       }
//       i += 1;
//     }

//     return nextNonDuplicate;
//   }

//   console.log(remove_duplicates([2, 3, 3, 3, 6, 9, 9]));
//   console.log(remove_duplicates([2, 2, 2, 11]));

function remove_duplicates1(arr) {
  let nextUnique = 1;
  for (let i = 1; i < arr.length; i += 1) {
    // arr
    if (arr[i] !== arr[nextUnique - 1]) {
      arr[nextUnique] = arr[i];
      nextUnique += 1;
    }
    // arr
  }
  return nextUnique;
}
//   console.log(remove_duplicates1([2, 3, 3, 3, 6, 9, 9]));
//   console.log(remove_duplicates1([2, 2, 2, 11]));

/*
var sortedSquares = function(A) {
  const res = [];
  let i = 0;
  while (A[i] < 0) i++;
  let j = i - 1;
  while (j >= 0 || i < A.length) {
    if (i >= A.length || -A[j] <= A[i]) {
      res.push(A[j--] ** 2);
    } else {
      res.push(A[i++] ** 2);
    }
  }
  return res;
};
*/


const make_squares = function(arr) {
    /* Method 1: start from the middle */
    // squares = []
    // let firstPositive = 0;
    // // Use while loop -> handle no-positive num
    // while (arr[firstPositive] < 0) firstPositive += 1
  
    // let left = firstPositive - 1,
    //     right = firstPositive;
  
    // while (left >= 0 || right < arr.length) {
    //   // if right becomes undefined, left will automatically pushed into squares
    //   if (right >= arr.length || -arr[left] <= arr[right]) {
    //     squares.push(arr[left] ** 2)
    //     left -= 1;
    //   } else {
    //     squares.push(arr[right] ** 2)
    //     right += 1;
    //   }
    // }
    
    /* Method 2: start from both side*/
    const squares = Array(arr.length).fill()
    let left = 0,
        right = arr.length - 1,
        end = arr.length - 1;
    while (left <= right) {
      if (arr[left] ** 2 < arr[right] **2) {
        squares[end--] = arr[right--] ** 2
      } else {
        squares[end--] = arr[left++] ** 2
      }
    }
    
    return squares;
  };
  // [-2, -1, 2]

// console.log(make_squares([-2, -1])); 

/* -------------- 1. Pair with Target Sum ------------------
Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.
Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target.
Input: [1, 2, 3, 4, 6], target=6
Output: [1, 3]
*/
const pair_with_targetsum = function(arr, target_sum) {
  let left = 0,
      right = arr.length - 1;
  
  while (left < right) {
    if (arr[left] + arr [right] === target_sum) {
      return [left, right];
    } else if (arr[left] + arr[right] > target_sum) {
      right -= 1;
    } else {
      left += 1;
    }
  }
  return [-1, -1];
}
// console.log(pair_with_targetsum([1, 2, 3, 4, 6], 6));

/* -------------- 2. Remove Duplicates ------------------
Given an array of sorted numbers, separate all duplicates from it in-place. You should not use any extra space; move all duplicates at the end of the array and after moving return the length of the subarray that has no duplicate in it.
*/