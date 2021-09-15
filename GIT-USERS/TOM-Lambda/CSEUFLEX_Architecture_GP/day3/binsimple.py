<<<<<<< HEAD
f=open("file","rb")
# f.seek(256, 0)
num=list(f.read())
=======
f = open("file", "rb")
# f.seek(256, 0)
num = list(f.read())
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# print(len(num))
# print(f"{num[0]:02X}")
# print(f"{num[256]:02X}")
data = []
for i in range(255, len(num)):

    # print(f"{num[i]:02X}")
    data.append(num[i])
print(data[2])
<<<<<<< HEAD
f.close()
=======
f.close()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
