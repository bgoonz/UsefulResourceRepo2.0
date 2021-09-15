/*
Your job is to fix the parentheses so that all opening and closing parentheses (brackets) have matching counterparts. You will do this by appending parenthesis to the beginning or end of the string. The result should be of minimum length. Don't add unnecessary parenthesis.

The input will be a string of varying length, only containing '(' and/or ')'.

For example:

Input: ")("
Output: "()()"

Input: "))))(()("
Output: "(((())))(()())"
*/

// keep track of the open parens
// if you come across an open parens, increment the open count
// if it's not an open paren but the open count is 0, you want to add an open to the beginning of the string.
// if it's a closing one, then you decrement the open count
// at the end of this check, no matter what, you push the current paren on to the end of the string

// this way you are putting open parens at the front if need be, keeping current parens in place,
//  and at the end, you are closing off all open parens.

const fixParentheses = (str) => {

  let res = ''
  let open = 0;

  for (let char of str) {

    if (char === '(') {
      open++;
    } else if (!open) {
      res = '(' + res;
    } else {
      open--;
    }
    console.log(res)
    res += char;
    console.log(res)
  }

  return res + ')'.repeat(open);

};

console.log(fixParentheses("))))(()("))