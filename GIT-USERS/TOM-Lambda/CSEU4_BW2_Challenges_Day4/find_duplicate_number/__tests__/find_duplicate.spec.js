find_duplicate = require("../find_duplicate");
const f_d = find_duplicate.find_duplicate;

describe("Find Duplicate Functionality", () => {

    test("it should return 1 when supplied with [2, 4, 5, 1, 6, 7, 1]", () => {
        const input = [2, 4, 5, 1, 6, 7, 1];

        const output = 1;
        expect(f_d(input)).toEqual(output)
    });

    test("it should return 2 when supplied with [1,3,4,2,2]", () => {
        const input = [1,3,4,2,2];

        const output = 2;
        expect(f_d(input)).toEqual(output)
    });

    test("it should return 3 when supplied with [3,1,3,4,2]", () => {
        const input = [3,1,3,4,2];

        const output = 3;
        expect(f_d(input)).toEqual(output)
    });

    test("it should return 11 when supplied with [10, 7, 5, 8, 11, 9, 11]", () => {
        const input = [10, 7, 5, 8, 11, 9, 11];

        const output = 11;
        expect(f_d(input)).toEqual(output)
    });

    test("it should return 100 when supplied with [100, 90, 80, 50, 20, 10, 101, 100]", () => {
        const input = [100, 90, 80, 50, 20, 10, 101, 100];

        const output = 100;
        expect(f_d(input)).toEqual(output)
    });

    test("it should return 1540 when supplied with [1050, 270, 1540, 3800, 2, 3000, 1540]", () => {
        const input = [1050, 270, 1540, 3800, 2, 3000, 1540];

        const output = 1540;
        expect(f_d(input)).toEqual(output)
    });
});