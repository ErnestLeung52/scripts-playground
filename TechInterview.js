console.log('hello world');

// {()} acceptable
// {(})} not acceptable

// Input: string
// Output: true/false

// {[(`')]}
// ['{', '[', '(',...]
// [{(`)}]
// { 'foo' }

// Include ` and ' as a valid pair
// Include /* and */ as a valid pair

// Regex
// Look ahead

const dictionary = {
  '{' : '}',
  '(' : ')',
  '[' : ']',
  '`' : "'",
}

const rightParen = new Set([')', '}', ']', "'"])

const checkParen = (str) => {
  if (str.length === 0) return true;


  const stack = [];

  // Iterate through the str
    // if statement to check whether the current char is inside the dictionary
    // true: push the corresponding righ paren into the stack
    // else if check right paren is not equal to the last item in the stack
      // truthy -> return false
  // check if there is anything left in the stack

  for (let i = 0; i < str.length; i++) {
    const paren = str[i];

    if (paren in dictionary) {
      stack.push(dictionary[paren]);
    } else if (rightParen.has(paren) && paren !== stack.pop()) {
      return false;
    }
  }
   
  return stack.length === 0;
}

// console.log(checkParen("{[(`')]}"))
// console.log(checkParen("[{(`)}]"))
// console.log(checkParen("{ 'foo' }"))

// 1st left opening, 2nd right closiing
const addSecondPara = (opening, closing) => {
  // check for its type
  // check for length
  // check if its already in the dictionary

  if (typeof opening === 'string' && typeof closing === 'string') {
    if (opening.length === 0 || closing.length === 0 || opening in dictionary || rightParen.has(closing)) {
      return false;
    }

    dictionary[opening] = closing;
    rightParen.add(closing);
  }

}


addSecondPara('a', 'b');
console.log(checkParen("{[(`a')]}"))
console.log(checkParen("[{(ab)}]"))
console.log(checkParen("{ 'faobo' }"))

// '{(abc'