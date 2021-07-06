i = 7
j = 31
problems = []

while i <= j:
    if i%2 == 0:
        pass
    else: 
        problems.append(i)
    
    i = i + 1

print(problems[::2])