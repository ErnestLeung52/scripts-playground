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

	const textArr = getAllTextNodes(msg);
	let redemptionCode;

	for (let i = 0; i < textArr.length; i++) {
		if (textArr[i] === 'Reward Code') {
			redemptionCode = textArr[i - 1];
			break;
		}
	}

	console.log(`${i + 1},${recipientEmail},${redemptionCode}`);
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
