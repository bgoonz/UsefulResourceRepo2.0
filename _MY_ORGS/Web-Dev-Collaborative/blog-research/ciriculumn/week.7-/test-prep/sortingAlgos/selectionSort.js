// ! For selection sort we need a swap helper function

function swap(arr, idx1, idx2) {
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp
}

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++){
        let minIndex = i;
        for (let j = i+1 ; j < arr.length; j++) {
            if(arr[j]< arr[minIndex]) swap(arr, i, j)
        }
    }
    return arr;
    
}
// ! comment in to test


// arr = [23, 323, 323213, 23, 23, 545, 213, 23, 23, 23, 213, 213, 21, 32]
// console.log(selectionSort(arr))