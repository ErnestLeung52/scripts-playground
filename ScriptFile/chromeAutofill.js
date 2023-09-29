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
				chrome.autofillPrivate.saveAddress({
					emailAddress: email,
					fullName: fName,
					phoneNumber: phone,
					// Address
					addressLines: add,
					// State
					addressLevel1: state,
					// City
					addressLevel2: city,
					postalCode: postal,
					countryCode: country,
				});
			}
		};

		fr.onerror = console.error;
	},
});
