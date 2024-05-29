const allEmailSection = document.querySelector('.aHU.hx');
const emailNodeList = allEmailSection.querySelector('div:nth-child(3)').children;

console.log(`✅ Found ${emailNodeList.length} messages`);

for (let i = 0; i < emailNodeList.length; i++) {
	const msg = emailNodeList[0];

	// Recipient Email
	// const emailSpan = msg.querySelectorAll('span[email]')[2];
	// const recipientEmail = emailSpan.textContent;

	const recipientBody = msg.querySelector('tr:nth-child(2)');
	const recipientText = recipientBody.querySelector('.recipient div').textContent;
	const recipientPattern = /^To: (.*)/;
	const recipientEmail = recipientText.replace(recipientPattern, '$1').toLowerCase();

	// 3 Body Parts
	const emailSections = msg.querySelector(
		'tbody tr:nth-child(3) td table tbody tr td div font div div div:nth-child(2) table tbody tr td div table tbody'
	);

	// GC Amount
	const emailBody = emailSections.querySelector('tr:nth-child(2) td div');
	const emailBodyString = emailBody.innerText;
	const amountRegex = /\$([\d.]+)/;
	const cardAmountText = extractCode(emailBodyString, amountRegex).slice(0, -1);

	// Claim Button
	const claimButtonLink = emailSections.querySelector('tr:nth-child(3) > td > table > tbody > tr > td > a').href;

	// Log that
	console.log(`${i + 1},${recipientEmail},${cardAmountText},${claimButtonLink}`);
}

function extractCode(input, regex) {
	const matches = input.match(regex);

	if (matches) {
		const extractedString = matches[1];
		return extractedString;
	} else {
		return 'undefined';
	}
}
