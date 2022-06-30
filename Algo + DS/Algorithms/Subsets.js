/*------------------- 1. Subsets  ---------------------
Given a set with distinct elements, find all of its distinct subsets.
*/
const find_subsets = function (nums) {
	const subsets = [];

	subsets.push([]);

	for (let i = 0; i < nums.length; i++) {
		let currentNumber = nums[i];
		const n = subsets.length;

		for (let j = 0; j < n; j++) {
			const set1 = subsets[j].slice(0);
			set1.push(currentNumber);
			subsets.push(set1);
		}
	}
	return subsets;
};
