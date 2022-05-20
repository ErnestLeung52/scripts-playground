var simplifyPath = function (path) {
  // start with '/', no '/' at the end
  // no '.' or '..'
  const pathArr = path.split('/');
  const stack = [];
  for (let el of pathArr) {
    if (el === '' || el === '.') {
      continue;
    }
    if (el === '..') {
      stack.pop(el);
      continue;
    }
    stack.push(el);
  }
  // stack
  return '/' + stack.join('/');
};

console.log(simplifyPath('/../'));
