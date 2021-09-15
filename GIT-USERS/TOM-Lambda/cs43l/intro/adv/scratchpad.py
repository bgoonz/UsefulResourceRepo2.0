class Box:
    def __init__(self, name):
        self.name = name

<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Person:
    def __init__(self, name, current_box):
        self.name = name
        self.current_box = current_box

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
box1 = Box("box1")
box2 = Box("box2")
box3 = Box("box3")
box4 = Box("box4")

box1.n_box = box3
box3.s_box = box1
box3.w_box = box4
box4.e_box = box3
box4.n_box = box2
box2.s_box = box4

person = Person("Dave", box1)
dir = "n"
attrib = dir + "_box"

# current_box = box4
<<<<<<< HEAD
print(f"{person.name} is in {person.current_box.name}") # => box 4
if hasattr(person.current_box, attrib):
    person.current_box = getattr(person.current_box, attrib) # person.current_box.n_box
else:
    print(f"{person.name} can not go that way!")

print(f"{person.name} is in {person.current_box.name}") # => box 2
    
=======
print(f"{person.name} is in {person.current_box.name}")  # => box 4
if hasattr(person.current_box, attrib):
    person.current_box = getattr(person.current_box, attrib)  # person.current_box.n_box
else:
    print(f"{person.name} can not go that way!")

print(f"{person.name} is in {person.current_box.name}")  # => box 2
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
