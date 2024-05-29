for (const el of document.querySelectorAll('body > input')) el.remove();
Object.assign(document.body.appendChild(document.createElement('input')), {
	type: 'file',
	style: 'position:absolute; top:2ex; right:0; z-index:999',
	onchange(e) {
		if (!this.files[0]) return;

		const fr = new FileReader();

		fr.readAsText(this.files[0], 'UTF-8');

		fr.onload = () => {
			for (const line of fr.result.split(/\r?\n/)) {
				const [email, fName, fN, lN, add, city, postal, state, phone, country] = line.split(',');

				// https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/api/autofill_private.idl
				chrome.autofillPrivate.saveAddress({
					guid: '',
					fields: [
						{ type: 'EMAIL_ADDRESS', value: email },
						{ type: 'NAME_FULL', value: fName },
						{ type: 'NAME_FIRST', value: fN },
						{ type: 'NAME_LAST', value: lN },
						{ type: 'PHONE_HOME_WHOLE_NUMBER', value: phone },
						// Address
						{ type: 'ADDRESS_HOME_STREET_ADDRESS', value: add },
						// State
						{ type: 'ADDRESS_HOME_STATE', value: state },
						// City
						{ type: 'ADDRESS_HOME_CITY', value: city },
						{ type: 'ADDRESS_HOME_ZIP', value: postal },
						{ type: 'ADDRESS_HOME_COUNTRY', value: country },
					],
					languageCode: 'en',
				});
			}
		};

		fr.onerror = console.error;
	},
});
