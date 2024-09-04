const tbody = document.querySelector('.kora-table-body table tbody');
const rows = tbody.querySelectorAll('tr');
const results = [];

async function processRow(row) {
	const videoInfo = row.querySelectorAll('td')[0];
	const creatorName = videoInfo
		.querySelector('div:nth-child(3) .m5b-overflow-text-single.text-neutral-text2')
		.textContent.trim();

	const targetVideoModal = videoInfo.querySelector('.cursor-pointer');

	if (targetVideoModal) {
		targetVideoModal.click();

		// Wait for the modal to load and the video element to appear
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay if necessary

		const videoElement = document.querySelector('video');
		if (videoElement) {
			const videoURL = videoElement.querySelector('source').src;
			results.push({ creatorName, videoURL });
		} else {
			console.log('Video element not found');
		}

		// Close the modal to proceed to the next row
		const closeModalButton = document.querySelector('.kora-modal-close-icon'); // Replace with the actual selector for the close button
		if (closeModalButton) {
			closeModalButton.click();
			await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for the modal to close
		} else {
			console.log('Modal close button not found');
		}
	} else {
		console.log('No video modal found for', creatorName);
	}
}

async function processAllRows() {
	for (let i = 0; i < rows.length; i++) {
		await processRow(rows[i]);
	}

	console.log('All data processed:', results);
}

await processAllRows();

async function downloadVideosSequentially(results) {
	for (let i = 0; i < results.length; i++) {
		const { creatorName, videoURL } = results[i];

		console.log(`Downloading video for ${creatorName} from ${videoURL}`);

		// Fetch the video data as a blob
		try {
			const response = await fetch(videoURL);
			const blob = await response.blob();
			const blobURL = URL.createObjectURL(blob);

			// Create an invisible link element, set the href to the blob URL, and trigger the download
			const a = document.createElement('a');
			a.href = blobURL;
			a.download = `${creatorName}.mp4`; // Set the file name to the creator's name
			a.style.display = 'none'; // Make sure the link is invisible
			document.body.appendChild(a);
			a.click();
			a.remove();

			// Revoke the blob URL to free up memory
			URL.revokeObjectURL(blobURL);

			// Wait a bit before downloading the next video to avoid overwhelming the browser
			await new Promise((resolve) => setTimeout(resolve, 1500)); // 1 second delay, adjust if necessary
		} catch (error) {
			console.error(`Failed to download video for ${creatorName}:`, error);
		}
	}

	console.log('All videos have been downloaded.');
}

// Call the function with the results array
downloadVideosSequentially(results);
