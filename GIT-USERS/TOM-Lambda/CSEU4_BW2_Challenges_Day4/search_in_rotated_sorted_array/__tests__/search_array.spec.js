search_array = require("../search_array");
const search = search_array.search;

describe("Search Array Functionality", () => {

    test("it should return 4 when supplied with [4,5,6,7,0,1,2] and 0", () => {
        const input = [4,5,6,7,0,1,2];
        const to_find = 0

        const output = 4;
        expect(search(input, to_find)).toEqual(output)
    });

    test("it should return -1 when supplied with [4,5,6,7,0,1,2] and 3", () => {
        const input = [4,5,6,7,0,1,2];
        const to_find = 3

        const output = -1;
        expect(search(input, to_find)).toEqual(output)
    });

    test("it should return -1 when supplied with [7, 8, 9, 0, 1, 2, 3, 4, 6] and 5", () => {
        const input = [7, 8, 9, 0, 1, 2, 3, 4, 6];
        const to_find = 5

        const output = -1;
        expect(search(input, to_find)).toEqual(output)
    });

    test("it should return 0 when supplied with [7, 8, 9, 0, 1, 2, 3, 4, 6] and 7", () => {
        const input = [7, 8, 9, 0, 1, 2, 3, 4, 6];
        const to_find = 7

        const output = 0;
        expect(search(input, to_find)).toEqual(output)
    });

    test("it should return 8 when supplied with [7, 8, 9, 0, 1, 2, 3, 4, 6] and 6", () => {
        const input = [7, 8, 9, 0, 1, 2, 3, 4, 6];
        const to_find = 6

        const output = 8;
        expect(search(input, to_find)).toEqual(output)
    });

});