def findSchedules(workHours, dayHours, pattern):
    # Write your code here

    current = []
    remainingList = []

    for i in pattern:
        for s in i:
            if s.isdigit():
                current.append(int(s))
            else:
                remainingList.append(s)

    remaining = len(remainingList)
    currentTotal = sum(current[0:len(current)])
    hoursLeft = workHours - currentTotal

    if (hoursLeft % remaining) == 0:
        value = hoursLeft / remaining
        strVal = str(int(value))
        result = pattern.replace("?", strVal)

    return result





def main():
    workHours = 56
    dayHours = 8
    pattern = "???8???"

    print(findSchedules(workHours, dayHours, pattern))

main()