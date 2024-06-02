const emailListTagId = '#v64 li';

const emailListTag = document.querySelectorAll(emailListTagId);
console.log(`✅ Found ${emailListTag.length} email address`);

for (let i = 0; i < emailListTag.length; i++) {
	const emailAddressTag = emailListTag[i].querySelector('div p div div b div');
	const emailAddress = emailAddressTag.textContent.trim();
	console.log(`${i + 1} - ${emailAddress}`);
}

const maskedListTagId = '#v2094 li';
const maskedListTag = document.querySelectorAll(maskedListTagId);

for (let i = 0; i < maskedListTag.length; i++) {
	const maskedTag = maskedListTag[i].querySelector('div:nth-child(2) p:nth-child(2) div div');
	const maskedAddress = maskedTag.textContent.trim();
	console.log(`${i + 1} - ${maskedAddress}`);
}
