// Given an array nums, and a value val, write a function to remove 
// all instances of val from the array and return the new length

const removeValInstances = (arr, val) => {
    if(!arr) return 0;
    if(!Array.isArray(arr)) return 0;
    if(!val) return arr.length;

    let newArrLength = 0;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === val) continue;
        newArrLength++;
    }
    return newArrLength;
}
removeValInstances(['i', 'e', 'd'], 'i'); //2