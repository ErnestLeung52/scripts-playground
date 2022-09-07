const filterButton = document.querySelector('[aria-label="Filters"]');
filterButton.click();

const yearButton = document.querySelector(
	'[aria-label="Post Filters"] [role="combobox"]'
);

const year = document.querySelector('#jsc_c_3y__14');

const doneButton = document.querySelectorAll(
	'[aria-label="Post Filters"] [aria-label="Done"]'
)[1];
