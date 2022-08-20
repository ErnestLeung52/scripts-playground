const axios = require('axios');
// import axios from 'axios';

const startDate = '2017-10-28';
// const today = new Date().toISOString().split('T')[0];
const endDate = '2022-08-19';
// console.log(`Mega Millions Number Frequency from ${startDate} to ${endDate}`);

// const options = {
// 	method: 'GET',
// 	url: `https://mega-millions.p.rapidapi.com/BetweenDates/${startDate}/${today}`,
// 	// params: { date1: '2017-10-28', date2: '2022-07-29' },
// 	headers: {
// 		'X-RapidAPI-Key': '1ddbaf6c59msh777676b61c4e9aep173740jsn92bd92568114',
// 		'X-RapidAPI-Host': 'mega-millions.p.rapidapi.com',
// 	},
// };

const fiveNumsFreq = {};
const megaballFreq = {};

// axios
// 	.request(options)
// 	.then(function (response) {
// 		parseMega(response.data.data);
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});

// /*
// const megaData = {
// 	status: 'success',
// 	data: [
// 		{
// 			DrawingDate: '2022-07-26T00:00:00.000Z',
// 			FirstNumber: 7,
// 			SecondNumber: 29,
// 			ThirdNumber: 60,
// 			FourthNumber: 63,
// 			FifthNumber: 66,
// 			MegaBall: 15,
// 			Megaplier: 3,
// 			JackPot: '$830,000,000',
// 			NumberSet: '7 29 60 63 66 15 3x',
// 		},
// 		{
// 			DrawingDate: '2018-01-05T00:00:00.000Z',
// 			FirstNumber: 28,
// 			SecondNumber: 30,
// 			ThirdNumber: 39,
// 			FourthNumber: 59,
// 			FifthNumber: 70,
// 			MegaBall: 10,
// 			Megaplier: 3,
// 			JackPot: '$450,000,000',
// 			NumberSet: '28 30 39 59 70 10 3x',
// 		},
// 		{
// 			DrawingDate: '2018-01-09T00:00:00.000Z',
// 			FirstNumber: 16,
// 			SecondNumber: 29,
// 			ThirdNumber: 31,
// 			FourthNumber: 65,
// 			FifthNumber: 67,
// 			MegaBall: 23,
// 			Megaplier: 3,
// 			JackPot: '$40,000,000',
// 			NumberSet: '16 29 31 65 67 23 3x',
// 		},
// 		{
// 			DrawingDate: '2018-01-12T00:00:00.000Z',
// 			FirstNumber: 17,
// 			SecondNumber: 18,
// 			ThirdNumber: 33,
// 			FourthNumber: 46,
// 			FifthNumber: 60,
// 			MegaBall: 24,
// 			Megaplier: 4,
// 			JackPot: '$45,000,000',
// 			NumberSet: '17 18 33 46 60 24 4x',
// 		},
// 	],
// };

const parseMega = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		const b1 = arr[i].FirstNumber;
		const b2 = arr[i].SecondNumber;
		const b3 = arr[i].ThirdNumber;
		const b4 = arr[i].FourthNumber;
		const b5 = arr[i].FifthNumber;
		const mb = arr[i].MegaBall;

		fiveNumsFreq[b1] = fiveNumsFreq[b1] ? fiveNumsFreq[b1] + 1 : 1;
		fiveNumsFreq[b2] = fiveNumsFreq[b2] ? fiveNumsFreq[b2] + 1 : 1;
		fiveNumsFreq[b3] = fiveNumsFreq[b3] ? fiveNumsFreq[b3] + 1 : 1;
		fiveNumsFreq[b4] = fiveNumsFreq[b4] ? fiveNumsFreq[b4] + 1 : 1;
		fiveNumsFreq[b5] = fiveNumsFreq[b5] ? fiveNumsFreq[b5] + 1 : 1;

		megaballFreq[mb] = megaballFreq[mb] ? megaballFreq[mb] + 1 : 1;
	}
	console.log(fiveNumsFreq);
	console.log(megaballFreq);
};

// parseMega(megaData.data);

const fiveBalls = {
	1: 34,
	2: 31,
	3: 42,
	4: 44,
	5: 25,
	6: 33,
	7: 44,
	8: 43,
	9: 32,
	10: 47,
	11: 43,
	12: 30,
	13: 31,
	14: 47,
	15: 39,
	16: 34,
	17: 48,
	18: 34,
	19: 34,
	20: 42,
	21: 29,
	22: 37,
	23: 27,
	24: 38,
	25: 38,
	26: 36,
	27: 37,
	28: 37,
	29: 35,
	30: 34,
	31: 47,
	32: 35,
	33: 33,
	34: 39,
	35: 25,
	36: 27,
	37: 35,
	38: 40,
	39: 34,
	40: 36,
	41: 32,
	42: 41,
	43: 42,
	44: 40,
	45: 27,
	46: 40,
	47: 31,
	48: 42,
	49: 25,
	50: 26,
	51: 21,
	52: 32,
	53: 40,
	54: 30,
	55: 25,
	56: 39,
	57: 34,
	58: 42,
	59: 36,
	60: 34,
	61: 34,
	62: 41,
	63: 32,
	64: 41,
	65: 26,
	66: 33,
	67: 27,
	68: 35,
	69: 29,
	70: 37,
};
const megaBall = {
	1: 18,
	2: 17,
	3: 16,
	4: 23,
	5: 16,
	6: 16,
	7: 13,
	8: 15,
	9: 24,
	10: 24,
	11: 26,
	12: 19,
	13: 21,
	14: 19,
	15: 20,
	16: 18,
	17: 22,
	18: 21,
	19: 21,
	20: 19,
	21: 16,
	22: 28,
	23: 15,
	24: 25,
	25: 22,
};

// console.log(JSON.stringify(fiveBalls));
// console.log(JSON.stringify(megaBall));
