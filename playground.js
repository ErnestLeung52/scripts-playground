var goodNodes = function(root) {
  let result = 0;
  function helper(node, prev) {
      if (node === undefined || node === null) return;
      if (node.val >= prev) {
      result += 1;
      }
  
  prev = Math.max(node.val, prev)
  }
};


