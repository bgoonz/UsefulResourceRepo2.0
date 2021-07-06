def bwMoves(start, target):

    action = 0
    counter = 0

    for i in range(len(start)):
        if start[i] == target[i]:
            if counter != i:
                action += 1
            counter +=1


    return action



def main():

    start = "BBWBBWBBBB"
    
    target = "WWWWWBBWWB"

    print(bwMoves(start, target))


main()