// ((()))

const checkParen = (s) => {
	const match = { '(': ')' };
	const stack = [];

	for (let i = 0; i < s.length; i++) {
		const paren = s[i];
		if (paren in match) {
			stack.push(match[paren]);
		} else if (paren !== stack.pop()) {
			return false;
		}
	}
	return stack.length === 0;
};
