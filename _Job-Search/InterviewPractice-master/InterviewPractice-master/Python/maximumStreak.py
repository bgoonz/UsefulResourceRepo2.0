"""
    Return maximum streak of days where all employees can work
"""

def maxStreak(m, data):
    # Write your code here

    word = ""

    # Checks to make sure all are available on day
    for i in data:
        if len(set(i)) == 1:
            for j in i:
                if j != "Y":
                    break
                else:
                    word = i
                    break

    count = 0
    maxcount = 0

    for j in data:
        if j == word:
            count += 1
        elif count > maxcount:
            maxcount = count
            count = 0
        else:
            count = 0

    if count > maxcount:
        maxcount = count

    return maxcount

def main():
    m = 2
    data = ['YN', 'NN', 'NY', 'YY']
    maxStreak(m, data)

main()