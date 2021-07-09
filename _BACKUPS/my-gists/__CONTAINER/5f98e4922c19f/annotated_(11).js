function (array, iterator) {
    // array = [1,2,3,4,,"pewpew"];
    // array.toString() -> "1,2,3,4,,pewpew"
    // string.replace(/[^,]+/g, iterator); 
    // itreator(item);
    ''.replace.call(array, /[^,]+/g, iterator);
}