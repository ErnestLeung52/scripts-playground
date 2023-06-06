// querySelectorAll() returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors.
const emailNodeList = document.querySelectorAll('.message');
console.log(`✅ Found ${emailNodeList.length} messages`);

emailNodeList.forEach((msg, index) => {
	const recipientBody = msg.querySelector('tr:nth-child(2)');
	const recipientText = recipientBody.querySelector('.recipient div:nth-child(2)').textContent;
	const recipientPattern = /^To: (.*)/;
	const recipientEmail = recipientText.replace(recipientPattern, '$1');

	const emailSections = msg.querySelector('tr:nth-child(3) td table tbody tr td div font div table tbody tr td');

	// Extract Amount
	const emailHeader = emailSections.querySelector('table:nth-child(2)');
	const cardAmount = emailHeader.querySelector(
		'tbody tr td table tbody tr td table:nth-child(1) tbody tr td h1 span'
	).textContent;
	const amountRegex = /\$([\d.]+)/;
	const cardAmountText = extractCode(cardAmount, amountRegex);

	// Extract Code
	// Steps by steps to travser down the html tree; '>' is strictly used to target a child
	const emailBody = emailSections.querySelector('table:nth-child(3)');
	const codeText = emailBody.querySelector(
		'tbody tr td table tbody tr td table:nth-child(1) tbody tr td div ol li:nth-child(2) strong span'
	).textContent;

	const validCode = codeText.length === 12;

	console.log(`${index + 1},${recipientEmail},${codeText},${cardAmountText},${validCode}`);
});

function extractCode(input, regex) {
	const matches = input.match(regex);

	if (matches) {
		const extractedString = matches[1];
		return extractedString;
	} else {
		return 'undefined';
	}
}
