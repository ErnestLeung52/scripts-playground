// {()} acceptable
// {(})} not acceptable

// Input: string
// Output: true/false

// {[(`')]}
// ['{', '[', '(',...]
// [{(`)}]
// { 'foo' }

// Include ` and ' as a valid pair
// Include /* and */ as a valid pair

// Regex
// Look ahead

const dictionary = {
	'{': '}',
	'(': ')',
	'[': ']',
	'`': "'",
};

const rightParen = new Set([')', '}', ']', "'"]);

const checkParen = (str) => {
	if (str.length === 0) return true;

	const stack = [];

	// Iterate through the str
	// if statement to check whether the current char is inside the dictionary
	// true: push the corresponding righ paren into the stack
	// else if check right paren is not equal to the last item in the stack
	// truthy -> return false
	// check if there is anything left in the stack

	for (let i = 0; i < str.length; i++) {
		const paren = str[i];

		if (paren in dictionary) {
			stack.push(dictionary[paren]);
		} else if (rightParen.has(paren) && paren !== stack.pop()) {
			return false;
		}
	}

	return stack.length === 0;
};

// console.log(checkParen("{[(`')]}"))
// console.log(checkParen("[{(`)}]"))
// console.log(checkParen("{ 'foo' }"))

// 1st left opening, 2nd right closiing
const addSecondPara = (opening, closing) => {
	// check for its type
	// check for length
	// check if its already in the dictionary

	if (typeof opening === 'string' && typeof closing === 'string') {
		if (
			opening.length === 0 ||
			closing.length === 0 ||
			opening in dictionary ||
			rightParen.has(closing)
		) {
			return false;
		}

		dictionary[opening] = closing;
		rightParen.add(closing);
	}
};

addSecondPara('a', 'b');
// console.log(checkParen("{[(`a')]}"));
// console.log(checkParen('[{(ab)}]'));
// console.log(checkParen("{ 'faobo' }"));

// '{(abc'

// How do you work with team
// Conflict
//

/*---------------------------------------------------------------------
We’re going to build a Movie class that will help us maintain clean and legible code. Our movie class is going to need a few properties:

id a string

title, director, and writer are all strings

grossEarnings how much the movie has earned in the box office

ratings a collection of ratings for the movie

The following methods:

addRating accepts a string argument that contains 1 to 5 stars (‘*’) and adds the rating to the ratings array.

The following getters:

averageRating returns the average rating to 2 decimal places

formattedEarnings returns earnings formatted as a string with a leading dollar sign
*/

const API_KEY = 'a2fad8f4';
const API_URL = 'http://www.omdbapi.com';
const axios = require('axios');

// http://www.omdbapi.com/?apikey=[yourkey]&
// First para will be endpoint
// Second para will be data that we need
const movieType = 'dog';
const movieList = [];

const searchMovie = async () => {
	try {
		// axios
		// 	.get(`${API_URL}/?apikey=${API_KEY}`, {
		// 		params: { s: movieType, y: '1975' },
		// 	})
		// 	.then((response) => {
		// 		response.data.Search.forEach((movie) => {
		// 			movieList.push(movie.Title);
		// 		});
		// 		console.log(movieList);
		// 	});
		const dogMovieList = await axios.get(`${API_URL}/?apikey=${API_KEY}`, {
			params: { s: movieType, y: '2021' },
		});

		console.log(dogMovieList.data);
	} catch (error) {
		console.log(error);
	}
};

// searchMovie();

class Movie {
	constructor(id, title, director, writer, grossEarnings) {
		this.id = id;
		this.title = title;
		this.director = director;
		this.writer = writer;
		this.grossEarnings = grossEarnings;
		this.ratings = [];
	}

	addRating(str) {
		const starNumber = str.length;
		this.ratings.push(starNumber);
	}

	// get dsdlkajfhasdlkjfh() {
	//   return fsadlkjfhasldkjfh
	// }

	get averageRating() {
		let sum = 0;
		for (let i = 0; i < this.ratings.length; i++) {
			sum += this.ratings[i];
		}
		const average = sum / this.ratings.length;
		return average.toFixed(2);
	}
}

function run() {
	const Spiderman = new Movie();
	Spiderman.addRating('****');
	Spiderman.addRating('**');
	Spiderman.addRating('*');
	Spiderman.addRating('*');
	console.log(Spiderman.averageRating);
	return Spiderman;
}

// console.log(run());

// Imagine many years ago, you traveled to multiple cities, you kept in brief case for all your travel tickets. Today, you opened the brief case and don't remember about any these trips that you took, and you want to retrace your journey. Can you write a method that takes a list of these tickets and output your journey from start to end

const tickets = [
	['LA', 'NY'],
	['SEA', 'SF'],
	['NY', 'SEA'],
	['SF', 'HK'],
];

const printJourney = (dataSet) => {
	let reversemap = new Map();

	// To fill reverse map, iterate through the given map
	for (const [key, value] of dataSet) reversemap.set(value, key);

	// Find the starting point of itinerary
	let start = '';

	for (const key of dataSet.keys()) {
		if (!reversemap.has(key)) {
			start = key;
			break;
		}
	}

	// If we could not find a starting point, then something wrong with input
	if (start.length == 0) {
		console.log('Invalid Input');
		return;
	}

	// Once we have starting point, we simple need to go next,
	//next of next using given hash map
	let it = start;
	while (dataSet.has(it)) {
		console.log(it + '->' + dataSet.get(it));
		it = dataSet.get(it);
	}
};
// console.log(printJourney(tickets));
// output
// LA , NY, SEA, SF, HK
