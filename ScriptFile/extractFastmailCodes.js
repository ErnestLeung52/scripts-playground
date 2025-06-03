// To Run the code:
// node ScriptFile/extractFastmailCodes.js

const EmlParser = require('eml-parser');
const fs = require('fs');
const path = require('path');
const util = require('util');

const folderPath = path.resolve(__dirname, '../resources/ernestleung52-fastmail-FB22InternetTracking');

const readdir = util.promisify(fs.readdir);

const extractEmail = async (emlStream) => {
	const recipientEmail = await new EmlParser(emlStream).getEmailHeaders().then((headers) => {
		return headers.to[0].address;
	});

	return recipientEmail;
};

const extractCode = async (emlStream) => {
	const emailBody = await new EmlParser(emlStream).getEmailBodyHtml().then((htmlString) => {
		return htmlString;
	});

	const regex = /(?<=https:\/\/www\.myprepaidcenter\.com\/redeem\?ecode=).*?(?=<\/a>)/;

	const matchedCode = await emailBody.match(regex);

	if (matchedCode) {
		return matchedCode[0];
	} else {
		return undefined;
	}
};

async function iterateFilesInFolder(folderPath) {
	try {
		const files = await readdir(folderPath);

		console.log(`Number of files in folder: ${files.length}`);

		for (let i = 0; i < files.length; i++) {
			const emlFile = files[i];
			const emlPath = path.resolve(folderPath, emlFile);

			const emlStream1 = fs.createReadStream(emlPath);
			const emlStream2 = fs.createReadStream(emlPath);

			const recipient = await extractEmail(emlStream2);
			const code = await extractCode(emlStream1);

			const validCodeLength = code.length === 12;

			console.log(`${i + 1},${recipient},${code},${validCodeLength}`);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

iterateFilesInFolder(folderPath);
