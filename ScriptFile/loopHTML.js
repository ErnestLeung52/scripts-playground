// Target the wrapper parent class
const list = document.querySelectorAll(
	'.store-directory__state-wrapper--1d5kf'
)[0];

// Get its children: a list of div
const listChildren = list.children;

const output = [];

for (let i = 0; i < listChildren.length; i++) {
	const store = listChildren[i];

	const cityStateZipLi = store.querySelector('ul li:nth-child(2)');
	const cityStateZipText = cityStateZipLi.innerText;

	const regexMatchBeforeNY = /^(?:(?! NY).)+/g;

	// const city = cityStateZipText.split(' ')[0];
	const city = cityStateZipText.match(regexMatchBeforeNY);

	output.push(city[0]);
}
/*
[
	'Commack',
	'Freeport',
	'Wappingers Falls',
	'Elmont',
	'Selden',
	'Bay Shore',
	'Port Chester',
	'Jericho',
	'Flushing',
	'South Ozone Park',
	'Valley Stream',
	'West Nyack',
	'Copiague',
	'Glendale',
	'Bronx',
	'Riverhead',
	'Saratoga Springs',
	'Brooklyn',
	'Kingston',
	'Cheektowaga',
	'Coram',
	'Williamsville',
	'West Seneca',
	'Amherst',
	'Buffalo',
	'Cicero',
	'East Syracuse',
	'Jamaica',
	'Schenectady',
	'Albany',
	'Middletown',
	'Greece',
	'New Rochelle',
	'Rochester',
	'Rochester',
	'Yonkers',
	'Staten Island',
	'Newburgh',
	'Mohegan Lake',
	'Johnson City',
	'New Hartford',
	'Long Island City',
	'Brooklyn',
	'Camillus',
	'Patchogue',
	'Latham',
	'Nanuet',
	'Albany',
	'Rensselaer',
	'Victor',
	'South Setauket',
	'Poughkeepsie',
	'Farmingdale',
	'Lockport',
	'Halfmoon',
	'Brewster',
	'Huntington',
	'Rochester',
	'Hempstead',
	'Flushing',
	'Rochester',
	'Staten Island',
	'Shirley',
	'Monroe',
	'Deer Park',
	'Buffalo',
	'Niagara Falls',
	'Amsterdam',
	'Levittown',
	'Maspeth',
	'Staten Island',
	'Brooklyn',
	'Liverpool',
	'Jamestown',
	'Ithaca',
	'Brooklyn',
	'Painted Post',
	'Queensbury',
	'Olean',
	'Commack',
	'Batavia',
	'Dunkirk',
	'Monticello',
	'Oneonta',
	'Watertown',
	'New York',
	'Leeds',
	'New York',
	'Fishkill',
	'East Elmhurst',
	'Auburn',
	'Bronx',
	'Bronx',
	'Jamaica',
	'Central Islip',
	'Brooklyn',
	'Hawthorne',
	'Westbury',
	'Syosset',
	'Bellport',
	'Massena',
];
*/