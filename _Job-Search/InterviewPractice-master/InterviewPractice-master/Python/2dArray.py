import sys

board = []
for i in range(6):
    board.append([int(x) for x in input().split()])
i,j = 0,0
m = sum([board[i][j],board[i][j+1],board[i][j+2],board[i+1][j+1],board[i+2][j],board[i+2][j+1],board[i+2][j+2]])
for i in range(4):
    for j in range(4):
        acc = sum([board[i][j],board[i][j+1],board[i][j+2],board[i+1][j+1],board[i+2][j],board[i+2][j+1],board[i+2][j+2]])
        m = max(m,acc)
print(m)

