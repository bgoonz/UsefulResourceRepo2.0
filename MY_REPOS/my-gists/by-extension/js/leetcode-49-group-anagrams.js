const groupAnagrams => (strs) => {
  let charMap = {};
  let anagram = (element, index) => {
    let thisKey = element.split('').sort().join('');
    if(charMap.hasOwnProperty(thisKey)){
      charMap[thisKey].unshift(element);
    } else {
      charMap[thisKey] = [element];
    }
  }
  strs.forEach(anagram);
  
  return Object.values(charMap);
};
