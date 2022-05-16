const array = [57, 10, 23, 11, 0, 5, -2, 42, 17];

/*
Bubble Sort
Compare 2 numbers, swap the greater one to the right
*/
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};
// console.log(bubbleSort(array))

/*
Insertion Sort
Compare the number on the left, insert t
*/

/*
Selection Sort
*/
