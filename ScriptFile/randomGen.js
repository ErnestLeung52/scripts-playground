// x inclusive, y exclusive
const randomIntBetween = (x, y) => {
	return Math.floor(x + (y - x) * Math.random());
};

const extractDate = (inputDate) => {
	const timeStamp = inputDate.getTime();

	const yearLong = inputDate.getFullYear().toString();
	const yearShort = inputDate.getFullYear().toString().substring(2);

	const monthLong = inputDate.toLocaleString('en-US', {
		month: 'long',
	});
	const monthShort = inputDate.toLocaleString('en-US', {
		month: 'short',
	});

	const weekLong = inputDate.toLocaleDateString('en-US', {
		weekday: 'long',
	});
	const weekShort = inputDate.toLocaleDateString('en-US', {
		weekday: 'short',
	});

	const day1 = inputDate.getDate().toString();
	const month1 = inputDate.getMonth() + 1;
	const year = inputDate.getFullYear();
	const day2 = inputDate.getDate().toString().padStart(2, '0');
	const month2 = (inputDate.getMonth() + 1).toString().padStart(2, '0');

	const hourLong = inputDate.getHours();
	const hourShort = inputDate.getHours() % 12 || 12;
	let minute = inputDate.getMinutes();
	const second = inputDate.getSeconds();

	if (minute < 10) {
		minute = '0' + minute.toString();
	}

	const amPmLower = hourLong >= 12 ? 'pm' : 'am';
	const amPmUpper = hourLong >= 12 ? 'PM' : 'AM';

	return {
		inputDate,
		timeStamp,
		yearLong,
		yearShort,
		year,
		monthLong,
		monthShort,
		month1,
		month2,
		weekLong,
		weekShort,
		day1,
		day2,
		hourLong,
		hourShort,
		minute,
		second,
		amPmLower,
		amPmUpper,
	};
};

const randomDateGen = (from, to) => {
	function randomValueBetween(min, max) {
		return Math.random() * (max - min) + min;
	}
	let date1 = from || '01-01-2010';
	let date2 = to || new Date().toLocaleDateString();
	date1 = new Date(date1).getTime();
	date2 = new Date(date2).getTime();

	if (date1 > date2) {
		const randomTimestamp = new Date(randomValueBetween(date2, date1));
		const dateFormat = extractDate(randomTimestamp);
		return dateFormat;
	} else {
		const randomTimestamp = new Date(randomValueBetween(date1, date2));
		const dateFormat = extractDate(randomTimestamp);
		return dateFormat;
	}
};

const randomDelayDate = (dateFormat, from, to) => {
	const { timeStamp } = dateFormat;

	const delayDays = randomIntBetween(from, to);

	// 24hr * 60min * 60sec * 1000mm
	const daysInMilliseconds = delayDays * 24 * 60 * 60 * 1000;

	const delayedDate = new Date(timeStamp + daysInMilliseconds);

	const delayedDateFormat = extractDate(delayedDate);

	return delayedDateFormat;
};

// DOB
// for (let i = 0; i < 1; i++) {
// 	// const date = randomDateGen('01/01/1990', '12/30/1998'); // adult
// 	const date = randomDateGen('01/01/1999', '12/30/1999'); // youth

// 	const { day2, month2, year } = date;

// 	console.log(`${month2}/${day2}/${year}`);
// }

// Purchase Date
for (let i = 0; i < 1; i++) {
	// const startDate = randomDateGen('01/01/2015', '10/30/2017');
	const startDate = randomDateGen('01/01/2015', '5/20/2016'); //youth

	const twoYearEndDate = randomDelayDate(startDate, 735, 1080);
	// const threeYearEndDate = randomDelayDate(startDate, 1096, 1450);

	console.log(
		`${startDate.month2}/${startDate.day2}/${startDate.yearLong},${twoYearEndDate.month2}/${twoYearEndDate.day2}/${twoYearEndDate.yearLong}`
	);
	// console.log(
	// 	`${startDate.month2}/${startDate.day2}/${startDate.yearLong},${threeYearEndDate.month2}/${threeYearEndDate.day2}/${threeYearEndDate.yearLong}`
	// );
}

/* 
first purchase date after Jan 1,2015
last purchase date prior to December 7, 2022.
Total report of $300
2 years: $150 per year
3 years: $100 per year
*/

// Product allocation
const yearlyClaim = 100;
const maxPack4 = Math.floor(yearlyClaim / 15.99);
const maxPack2 = Math.floor(yearlyClaim / 9.99);

for (let x = 0; x <= maxPack4; x++) {
	for (let y = 0; y <= maxPack2; y++) {
		if (
			15.99 * x + 9.99 * y <= yearlyClaim &&
			15.99 * x + 9.99 * y >= yearlyClaim - 5
		) {
			console.log('pack4:', x, ', pack2:', y);
		}
	}
}
