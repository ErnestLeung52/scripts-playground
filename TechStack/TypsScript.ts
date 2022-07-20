/* ----------------------------------------------------
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
import { type } from 'os';

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

// Type Annotations ----------------------------------------------------
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

// 3. When we want a variable to have a type that can't be inferred correctly
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;
numbers.forEach((num) => {
	if (num > 0) numberAboveZero = num;
});

/* Function ----------------------------------------------------
- Annotations for function: code we add to tell TS what type of arguments a function will receive and what type of values it will return
- Inference for function: TS tries to figure out what type of value a function will return
*/

const add_annotation = (a: number, b: number): number => {
	return a + b;
};

const add_inference = (a: number, b: number) => {
	a + b;
};

function divide(a: number, b: number): number {
	return a / b;
}

const multiply = function (a: number, b: number): number {
	return a * b;
};

const logger = (message: string): void => {
	console.log(message);
	// return '';
};

const throwError = (message: string): never => {
	// Edge case
	throw new Error(message);
};

const todaysWeather = {
	date: new Date(),
	weather: 'sunny',
};

// Desctructure
const logWeather = ({
	date,
	weather,
}: {
	date: Date;
	weather: string;
}): void => {
	console.log(date);
	console.log(weather);
};

// Object ----------------------------------------------------
const profile = {
	name: 'alex',
	age: 20,
	coords: {
		lat: 0,
		lng: 15,
	},

	setAge(age: number): void {
		this.age = age;
	},
};

const { age, name }: { age: number; name: string } = profile;
const {
	coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;

// Array
const carMakers = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];
const carsByMake: string[][] = [['f150'], ['corolla'], ['camaro']];

// 1) Help with inference when extracting values
const car1 = carMakers[0];
const myCar = carMakers.pop();

// 2) Prevent incompatible values
// carMakers.push(100);

// 3) Help with Map
carMakers.map((car: string): string => {
	return car.toUpperCase();
});

// 4) Flexible types
const importantDates: (Date | string)[] = [new Date(), '2030-10-10'];
importantDates.push('2030-10-10');
// importantDates.push(10);

/*----------------------------------------------------
Tuple: 
*/

const drink = {
	color: 'brown',
	carbonated: true,
	sugar: 40,
};

// const pepsi: [string, boolean, number] = ['brown', true, 40];
// Type alias
type Drink = [string, boolean, number];
const pepsi: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 45];

const carSpecs: [number, number] = [400, 3354];

const carStats = {
	horsepower: 400,
	weight: 3354,
};

/* ----------------------------------------------------
Interfaces: creates a new type, describing the property names and value types of an object
*/

interface Reportable {
	summary(): string;
}

const oldCivic = {
	name: 'civic',
	year: new Date(),
	broken: true,
	summary(): string {
		return '${I want a gts}';
	},
};

const drink1 = {
	color: 'brown',
	carbonated: true,
	sugar: 40,
	summary(): string {
		return `My drink has ${this.sugar}g of sugar`;
	},
};

const printSummary = (item: Reportable): void => {
	console.log(item.summary());
};

// printSummary(oldCivic);
// printSummary(drink1);

/* ------------------------- 359
General Strategy for Reusable Code in TS
- Create functions that accept args that are typed with interfaces
- Objects/ classes can decide to 'implement' a given interface to work with a function
*/

/* ----------------------- 360
Classes: Blueprint to create an object with some fields (values) and methods to represent to a thing
*/
class Vehicle {
	// public drive(): void {
	// 	console.log('chugga chugga');
	// }

	// public honk(): void {
	// 	console.log('biu biu');
	// }

	// color: string ;

	constructor(public color: string) {
		this.color = color;
	}

	protected honk(): void {
		console.log('biu biu');
	}
}

class Car1 extends Vehicle {
	// color does not have public because it belongs to vehicle class
	constructor(public wheels: number, color: string) {
		super(color);
	}

	private drive(): void {
		console.log('vrooom');
	}

	startDriving(): void {
		this.drive();
		this.honk();
	}
}

const car2 = new Car1(4, 'red');
car2.startDriving();

// Public -> method can be called any where, any time
// Private -> method can only be called by other methods in this class
// Protected -> method can be called by other methods in this class or by other methods in child classes
