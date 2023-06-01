// querySelectorAll() returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors.
const emailNodeList = document.querySelectorAll('.message');
console.log(`✅ Found ${emailNodeList.length} messages`);

emailNodeList.forEach((msg, index) => {
	const recipientBody = msg.querySelector('tr:nth-child(2)');
	const recipientText = recipientBody.querySelector('.recipient div:nth-child(2)').textContent;
	const recipientPattern = /^To: (.*)/;
	const recipientEmail = recipientText.replace(recipientPattern, '$1');

	const emailBody = msg.querySelector('tr:nth-child(3)');
	// Steps by steps to travser down the html tree; '>' is strictly used to target a child
	const codeBody = emailBody.querySelector(
		'td table tr td div font div div div:nth-child(2) table tbody tr:nth-Child(2)'
	);
	const codeText = codeBody.querySelector('td div:nth-child(2) span span').textContent;

	const validCode = codeText.length === 12;

	console.log(`${index + 1},${recipientEmail},${codeText},${validCode}`);
});
