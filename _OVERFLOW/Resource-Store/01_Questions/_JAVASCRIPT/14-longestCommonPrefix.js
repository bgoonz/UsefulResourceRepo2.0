/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = strs => {
    if (strs.length === 0) return '';
    const firstString = strs[0];
    let commonLength = firstString.length;
    for (let i = 1; i < strs.length; i++) {
        for (var j = 0; j < commonLength; j++) {
            if (!strs[i][j]) break;
            if (firstString[j] !== strs[i][j]) break;
        }
        commonLength = j;
    }

    return firstString.substring(0, commonLength);
};

// a better way
var longestCommonPrefix = strs => {
    if (strs.length === 0) {
        return '';
    }
    
    return strs.reduce((pre, str) => {
        while (str.indexOf(pre) !== 0) {
            pre = pre.slice(0, pre.length - 1); 
        }
        
        return pre;
    }, strs[0]);
};
