var isPalindrome = function(s) {
    const lowerS = s.toLowerCase()
    let left = 0,
        right = s.length - 1;
    // a 97 - z 122
    while (left <= right) {
        let left_ASCII = lowerS.charCodeAt(left),
            right_ASCII = lowerS.charCodeAt(right);
        
        // Skip non-alphanumeric characters
        while (left_ASCII < 97 || left_ASCII > 122) {
            left_ASCII
            left += 1;
            left_ASCII = lowerS.charCodeAt(left)
        }
        while (right_ASCII < 97 || right_ASCII > 122) {
            right_ASCII
            right -= 1;
            right_ASCII = lowerS.charCodeAt(right);
        }

        if (left_ASCII !== right_ASCII) {
            return false;
        }

        left += 1;
        right -= 1;
    }
    

    return true;
};

// console.log(isPalindrome("!!!!aa!!!!"))