/*
TypeScript
1. Help us catch errors during development
2. Use 'type annotations' to analyze our code
3. Only active during development
4. Doesn't provide any performance optimization

TypeScript code -> TS compiler -> Plain old JavaScript

- Install
npm install -g typescript ts-node
tsc --help

- Compile
tsc index.js
ts-node index.js
*/

import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// Define structure of an object
interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

axios.get(url).then((response) => {
	// Response.data is an object that reference to the Todo interface
	const { id, title, completed } = response.data as Todo;

	// logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
	console.log(`---------------${id} ${title} ${completed}`);
};

/*
Type: easy way to refer to the different properties + function that a value has
Primitive types / Object types
*/

/* 
Type Annotations: code we add to tell TS what type of value a variable will refer to (we tell TS the types)

Type Inference: TS tries to figure out what type of value a variable refers to (TS guess the type)
- Used Always
*/

// Type Annotations
let apples = 5;
// apples = '';
let speed: string = 'fast';
let hasName: boolean = true;
let nothingMuch: null = null;
let nothing: undefined = undefined;

let now: Date = new Date();

let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3, 4, 5];

class Car {}
// variable named car is only ever going to refer to an instance of a car
let car: Car = new Car();

let point: { x: number; y: number } = {
	x: 10,
	y: 20,
};

const logNumber: (i: number) => void = (i: number) => {
	console.log(i);
};

// When to use annotations
// 1. Used when a function returns the 'any' type and we need to clarify the value. Any: can't detect the property
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
// console.log(coordinates); // { x: 10, y: 20 }

// 2. When we declare a variable on one line then initialize it later
let words = ['red', 'green', 'blue'];
let foundWord: boolean;
words.forEach((word) => {
	if (word === 'green') foundWord = true;
});

// - When we want a variable to have a type that can't be inferred
