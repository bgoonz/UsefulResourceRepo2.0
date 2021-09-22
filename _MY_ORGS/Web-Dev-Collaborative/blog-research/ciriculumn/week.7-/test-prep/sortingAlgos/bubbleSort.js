// ! To have a bubble sorting method we need a swap helper function

function swap(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2]
    array[index2] = temp;        
}

function bubbleSort(array) {
    
    let swapped = true;
    while (swapped) {
        swapped = false;

        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
                swapped = true;
            } 
        }
    }
    return array
}

// ! Code to run test

// let array = [12, 23, 3232, 32, 323, 23, 123, 123, 45, 75, 658, 942, 452, 345, 145254, 2343];
// console.log(bubbleSort(array));
