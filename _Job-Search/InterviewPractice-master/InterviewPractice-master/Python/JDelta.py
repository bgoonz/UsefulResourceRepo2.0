
def solution():
    dict={}

    n,d = map(int, input().split())
    m = map(int, input().split())
    for i in m:
        dict[i]=True

    answer=0
    for i in dict:
        if i+d in dict:
            answer+=1

    return answer

solution()

def pairs(a,k):
    #a contains array of numbers and k is the value of difference
    answer = 0
    a.sort()
    j = 0
    for i in range(len(a)):
        while  j < len(a) and a[j] - a[i] < k : j += 1
        if j >= len(a) : break
        if(a[j] - a[i] == k): answer += 1
    return answer
# Tail starts here
if __name__ == '__main__':
    a = map(int, raw_input().strip().split(" "))
    _a_size=a[0]
    _k=a[1]
    b = map(int, raw_input().strip().split(" "))
    print(pairs(b,_k))