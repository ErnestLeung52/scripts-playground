// Find all links on the page
const links = document.querySelectorAll('a');
const pdfLinks = [];

// Filter links that end in .pdf
links.forEach((link) => {
	if (link.href.endsWith('.pdf')) {
		pdfLinks.push(link.href);
	}
});

// Function to download files one by one with a slight delay
function downloadAll(urls) {
	let i = 0;
	const interval = setInterval(() => {
		if (i >= urls.length) {
			clearInterval(interval);
			return;
		}
		const a = document.createElement('a');
		a.href = urls[i];
		a.download = '';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		i++;
	}, 500); // 500ms delay between downloads to prevent browser blocking
}

// Start the process
downloadAll(pdfLinks);
