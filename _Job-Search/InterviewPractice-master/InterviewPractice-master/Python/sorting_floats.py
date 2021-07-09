"""
Reverse a list of floats
"""

input_list = ['104.900209904', '238.501860857', '9.59893298149', '-3.1415', '362.470027924', '419.737339973']

my_list = []
for i in input_list:
    my_list.append(i)

sort_list = sorted(my_list, key=lambda x: float(x))
print(sort_list)
