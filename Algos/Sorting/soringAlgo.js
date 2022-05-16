const array = [57, 10, 23, 11, 0, 5, -2, 42, 17];

/* Bubble Sort
Compare 2 numbers, swap the greater one to the right */

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

/* Insertion Sort
Compare the number on the left, while the current number is smaller, keep swapping
j = i to initialize the swap */

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i += 1) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j -= 1;
    }
  }
  return arr;
};
// console.log(insertionSort(array));

/* Selection Sort
Find the smallest and swap to the current parent loop index */
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    let min = arr[i];
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j] < min) {
        min = arr[j];
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
};
// console.log(selectionSort(array));
