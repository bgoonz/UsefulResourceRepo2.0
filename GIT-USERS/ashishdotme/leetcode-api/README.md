# LEETCODE API

## Overview

I made this API for my discord bot but I am making this project public. Please email ashishsushilpatel@gmail.com if you find any bugs.

## Routes

| URL                                                 | Description                                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| https://leetcode.ashish.me/api/problem              | Returns a random leetcode problem                                                   |
| https://leetcode.ashish.me/api/problem?difficulty=1 | Returns a random leetcode problem with difficulty filter (1=easy, 2=medium, 3=hard) |
| https://leetcode.ashish.me/api/problem?id=15        | Returns leetcode question number 15                                                 |

## Examples

difficulty filter example: https://leetcode.ashish.me/api/problem?difficulty=1

```javascript
{
  "code": 200,
  "message": "Success",
  "response": [
    {
      "id": 263,
      "title": "Ugly Number",
      "slug": "ugly-number",
      "difficulty": 1,
      "question_no": 263,
      "is_paid": 0,
      "url": "https://leetcode.com/problems/ugly-number",
      "content": "<p>Write a program to check whether a given number is an ugly number.</p>\r\n\r\n<p>Ugly numbers are <strong>positive numbers</strong> whose prime factors only include <code>2, 3, 5</code>.</p>\r\n\r\n<p><strong>Example 1:</strong></p>\r\n\r\n<pre>\r\n<strong>Input:</strong> 6\r\n<strong>Output:</strong> true\r\n<strong>Explanation: </strong>6 = 2 &times;&nbsp;3</pre>\r\n\r\n<p><strong>Example 2:</strong></p>\r\n\r\n<pre>\r\n<strong>Input:</strong> 8\r\n<strong>Output:</strong> true\r\n<strong>Explanation: </strong>8 = 2 &times; 2 &times;&nbsp;2\r\n</pre>\r\n\r\n<p><strong>Example 3:</strong></p>\r\n\r\n<pre>\r\n<strong>Input:</strong> 14\r\n<strong>Output:</strong> false \r\n<strong>Explanation: </strong><code>14</code> is not ugly since it includes another prime factor <code>7</code>.\r\n</pre>\r\n\r\n<p><strong>Note:</strong></p>\r\n\r\n<ol>\r\n\t<li><code>1</code> is typically treated as an ugly number.</li>\r\n\t<li>Input is within the 32-bit signed integer range:&nbsp;[&minus;2<sup>31</sup>,&nbsp; 2<sup>31&nbsp;</sup>&minus; 1].</li>\r\n</ol>",
      "solution": null,
      "likes": 497,
      "dislikes": 635,
      "sample_testcase": "6",
      "hints": [

      ],
      "code_snippets": [
        {
          "code": "class Solution {\npublic:\n    bool isUgly(int num) {\n        \n    }\n};",
          "lang": "C++"
        },
        {
          "code": "class Solution {\n    public boolean isUgly(int num) {\n        \n    }\n}",
          "lang": "Java"
        },
        {
          "code": "class Solution(object):\n    def isUgly(self, num):\n        \"\"\"\n        :type num: int\n        :rtype: bool\n        \"\"\"\n        ",
          "lang": "Python"
        },
        {
          "code": "class Solution:\n    def isUgly(self, num: int) -> bool:\n        ",
          "lang": "Python3"
        },
        {
          "code": "\n\nbool isUgly(int num){\n\n}",
          "lang": "C"
        },
        {
          "code": "public class Solution {\n    public bool IsUgly(int num) {\n        \n    }\n}",
          "lang": "C#"
        },
        {
          "code": "/**\n * @param {number} num\n * @return {boolean}\n */\nvar isUgly = function(num) {\n    \n};",
          "lang": "JavaScript"
        },
        {
          "code": "# @param {Integer} num\n# @return {Boolean}\ndef is_ugly(num)\n    \nend",
          "lang": "Ruby"
        },
        {
          "code": "class Solution {\n    func isUgly(_ num: Int) -> Bool {\n        \n    }\n}",
          "lang": "Swift"
        },
        {
          "code": "func isUgly(num int) bool {\n    \n}",
          "lang": "Go"
        },
        {
          "code": "object Solution {\n    def isUgly(num: Int): Boolean = {\n        \n    }\n}",
          "lang": "Scala"
        },
        {
          "code": "class Solution {\n    fun isUgly(num: Int): Boolean {\n        \n    }\n}",
          "lang": "Kotlin"
        },
        {
          "code": "impl Solution {\n    pub fn is_ugly(num: i32) -> bool {\n        \n    }\n}",
          "lang": "Rust"
        },
        {
          "code": "class Solution {\n\n    /**\n     * @param Integer $num\n     * @return Boolean\n     */\n    function isUgly($num) {\n        \n    }\n}",
          "lang": "PHP"
        },
        {
          "code": "function isUgly(num: number): boolean {\n\n};",
          "lang": "TypeScript"
        }
      ],
      "topics": [
        {
          "name": "Math",
          "slug": "math"
        }
      ],
      "category": "Algorithms"
    }
  ]
}
```
