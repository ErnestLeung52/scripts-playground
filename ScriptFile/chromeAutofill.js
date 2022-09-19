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
				const [name, email, num, add, ad1, ad2, ad3, postal, sorting, country] =
					line.split(',');
				chrome.autofillPrivate.saveAddress({
					emailAddresses: [email],
					fullNames: [name],
					phoneNumbers: [num],
					addressLines: add,
					addressLevel1: ad1,
					addressLevel2: ad2,
					addressLevel3: ad3,
					postalCode: postal,
					sortingCode: sorting,
					countryCode: country,
				});
			}
		};

		fr.onerror = console.error;
	},
});
