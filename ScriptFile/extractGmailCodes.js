// querySelectorAll() returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors.
const emailNodeList = document.querySelectorAll('.message');
console.log(`✅ Found ${emailNodeList.length} messages`);

for (let i = 5; i < emailNodeList.length; i++) {
	const msg = emailNodeList[i];

	const recipientBody = msg.querySelector('tr:nth-child(2)');
	const recipientText = recipientBody.querySelector('.recipient div:nth-child(2)').textContent;
	const recipientPattern = /^To: (.*)/;
	const recipientEmail = recipientText.replace(recipientPattern, '$1');

	// 3 parts body
	const emailSections = msg.querySelector(
		'tbody tr:nth-child(3) td table tbody tr td div font div table tbody tr td'
	);

	// Extract Amount
	const emailTitleSection = emailSections.querySelector('table:nth-child(2)');
	const rawCardAmount = emailTitleSection.querySelector(
		'table tbody tr td table tbody tr td table:nth-child(1) tbody tr td h1 span'
	).textContent;
	const amountRegex = /\$([\d.]+)/;
	const cardAmountText = extractCode(rawCardAmount, amountRegex);

	// Extract Code
	// Steps by steps to travser down the html tree; '>' is strictly used to target a child
	const emailCodeSection = emailSections.querySelector('table:nth-child(3)');

	const rawCodeText1 = emailCodeSection.querySelector(
		'table tbody tr td table tbody tr td table:nth-child(8) tbody tr td h1'
	);
	const rawCodeText2 = emailCodeSection.querySelector('table tbody tr td table tbody tr td table:nth-child(3) h1');

	const rawCodeText = rawCodeText1?.textContent || rawCodeText2?.textContent;

	const codeRegex = /\n(.*)/;
	const codeText = extractCode(rawCodeText, codeRegex);

	const validCode = codeText.length === 12;

	console.log(`${i + 1},${recipientEmail},${codeText},${cardAmountText},${validCode}`);
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
