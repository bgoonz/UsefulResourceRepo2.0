#
# Complete the 'calculateScore' function below.
#
# The function is expected to return a STRING.
# The function accepts following parameters:
#  1. STRING text
#  2. STRING prefixString
#  3. STRING suffixString
#


def calculateScore(text, prefixString, suffixString):
    score = len(text)
    result = {}
    while score > 0:

        for i in range(len(text) + 1 - score):
            substring = text[i:i + score]
            prefixScore = min(len(prefixString), len(substring))

            while substring[:prefixScore] != prefixString[-prefixScore:] and prefixScore > 0:
                prefixScore -= 1

            suffixScore = min(len(suffixString), len(substring))

            while substring[-suffixScore:] != suffixString[:suffixScore] and suffixScore > 0:
                suffixScore -= 1

            textScore = prefixScore + suffixScore

            if textScore not in result:
                result[textScore] = []

            result[textScore].append(substring)

        score -= 1

    max_textScore = max(result.keys())
    result[max_textScore].sort()

    return result[max_textScore][0]


print(calculateScore("engine", "raven", "gintextScorego"))

print(calculateScore("nothing", "bruno", "ingenious"))

print(calculateScore("ab", "b", "a"))
