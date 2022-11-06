// https://www.dizkover.com/map/snapchat
// Chrome dev tool -> 3 dots -> Sensors -> Change location
// Chicago Latitude Longitude 41.88428, -87.63309
const path = require('path');
const fs = require('fs');

const listPath = './ScriptFile';
const inputFile = path.join(listPath, 'snapList.json');

const extractUser = (filePath) => {
	const data = fs.readFileSync(filePath);

	const userListArr = JSON.parse(data).data;

	const nameSet = new Set();

	userListArr.forEach((user) => {
		const nameObj = JSON.parse(user.username);

		// username: null / empty object
		if (nameObj === null || Object.keys(user).length === 0) {
			return;
		}

		// Parse username obj
		// Multiple usernames
		for (const username in nameObj) {
			const name = nameObj[username];
			if (name && name.length >= 6) {
				nameSet.add(nameObj[username]);
			}
		}
	});

	const resultArr = Array.from(nameSet);

	fs.writeFileSync(
		path.join(listPath, 'snapListOutput.json'),
		JSON.stringify(resultArr)
	);
};

extractUser(inputFile);
