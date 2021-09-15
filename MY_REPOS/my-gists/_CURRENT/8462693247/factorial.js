/* ---------
 * Challenge
 * ---------
 * Rewrite the code of the function factorial
 * in a way to use recursion
*/

function factorial(num)
{

    if (num < 0) {
        return -1;
    }

    else if (num == 0) {
        return 1;
    }

    else {
        return (num * factorial(num - 1));
    }
}