const allEmailSection = document.querySelector('.aHU.hx');
const emailNodeList = allEmailSection.querySelector('div:nth-child(3)').children;

console.log(`✅ Found ${emailNodeList.length} messages`);

for (let i = 0; i < emailNodeList.length; i++) {
	const msg = emailNodeList[i];

	// Recipient Email
	const emailSpanNodeList = msg.querySelectorAll('span[email]');
	// const emailSpan = emailSpanNodeList[emailSpanNodeList.length - 1];
	let recipientEmail = '❌';
	for (const spanNode of emailSpanNodeList) {
		const foundEmail = spanNode.getAttribute('email').toLowerCase();
		if (foundEmail.includes('@gmail.com')) {
			recipientEmail = foundEmail;
			break;
		}
	}

	// Payment Amount
	const bTagNodeList = msg.querySelectorAll('b');
	let paymentAmount = '❌';
	for (const bTagNode of bTagNodeList) {
		if (bTagNode.textContent.includes('$')) {
			paymentAmount = bTagNode.textContent;
			break;
		}
	}

	// Claim Link
	const aTagNodeList = msg.querySelectorAll('a');
	const claimTextContent = 'Claim Payment';
	let claimLink = '❌';
	for (const aTagNode of aTagNodeList) {
		if (aTagNode.textContent.trim() === claimTextContent) {
			claimLink = aTagNode.getAttribute('href');
			break;
		}
	}

	console.log(`${i + 1},${recipientEmail},${paymentAmount},${claimLink}`);
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

function getAllTextNodes(parent) {
	let walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT, null, false);
	let node;
	let textNodes = [];

	while ((node = walker.nextNode())) {
		textNodes.push(node.textContent.trim());
	}
	return textNodes.filter((text) => text.length > 0);
}
