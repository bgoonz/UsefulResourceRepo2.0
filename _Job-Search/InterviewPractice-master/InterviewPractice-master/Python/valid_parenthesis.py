"""
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.
"""

def isValid(s):
        """
        :type s: str
        :rtype: bool
        """

        previous = ""
        result = ""

        if not s:
            return True
        if len(s) == 1:
            return False
        else:
            while s is not None:
                s = s.split("()")
                s = result.join(s)
                s = s.split("[]")
                s = result.join(s)
                s = s.split("{}")
                s = result.join(s)
                if s == "":
                    return True
                elif s == previous:
                    return False
                else:
                    previous = s
            
            return True

def main():
    s = "()"
    print(isValid(s))

main()
