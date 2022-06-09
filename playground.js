var goodNodes = function (root) {
	let result = 0;
	function helper(node, prev) {
		if (node === undefined || node === null) return;
		if (node.val >= prev) {
			result += 1;
		}

		prev = Math.max(node.val, prev);
	}
};

function nbYear(p0, percent, aug, p) {
	let years = 1;
	let inhabitants = p0 + p0 * (percent / 100) + aug;
	while (inhabitants < p) {
		inhabitants = inhabitants + inhabitants * (percent / 100) + aug;
		years += 1;
	}
  console.log(inhabitants);
	return years;
}
console.log(nbYear(1000, 2, 50, 1214));
