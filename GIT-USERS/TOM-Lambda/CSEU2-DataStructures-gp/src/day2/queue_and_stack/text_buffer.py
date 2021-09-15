<<<<<<< HEAD
from doubly_linked_list import DoublyLinkedList 

class TextBuffer:
 
=======
from doubly_linked_list import DoublyLinkedList


class TextBuffer:
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __init__(self, init=None):
        # create a storage contents for the buffer
        self.contents = DoublyLinkedList()
        # check if an init string has been provided
        if init:
            # if so insert the init string in to the contents
            for char in init:
                self.contents.add_to_tail(char)

    def __str__(self):
        # set a return string variable
        s = ""
        # set our current node to the contents head
        current_node = self.contents.head
        # while there are still nodes
        while current_node:
            # append the current value to the return string
            s += current_node.value
            # set current nodes to current nodes next
            current_node = current_node.next
        # return the string
        return s

    def append(self, string_to_add):
        # loop over each char in the string and add it to tail
        for char in string_to_add:
            self.contents.add_to_tail(char)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def prepend(self, string_to_add):
        # reverse incomming string to maintain order
        # loop over each char in string add it to head
        for char in string_to_add[::-1]:
            self.contents.add_to_head(char)

    def delete_front(self, chars_to_remove):
        # loop over all chars to remove
        for _ in range(chars_to_remove):
            # remove from head
            self.contents.remove_from_head()

    def delete_back(self, chars_to_remove):
        # loop over all chars to remove
        for _ in range(chars_to_remove):
            # remove from tail
            self.contents.remove_from_tail()

    """
    Join other_buffer to self
    The input buffer gets concatenated to the end of this buffer 
    The tail of the concatenated buffer will be the tail of the other buffer 
    The head of the concatenated buffer will be the head of this buffer 
    """
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def join(self, other_buffer):
        # set selfs tails next to be the head of other buffer
        self.contents.tail.next = other_buffer.contents.head
        # set other buffers prev node to be the tail of this buffer
        other_buffer.contents.head.prev = self.contents.tail
        other_buffer.contents.head = self.contents.head
        self.contents.tail = other_buffer.contents.tail

    def join_string(self, string_to_join):
        new_buffer = TextBuffer(string_to_join)
        self.join(new_buffer)

<<<<<<< HEAD
if __name__ == '__main__':
=======

if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    text = TextBuffer("Super")
    print(text)

    text.join_string("califragilisticexpealidocious")
    print(text)

    text.append(" is ")
    text.join(TextBuffer("weird."))

    print(text)

    text.delete_back(6)
    print(text)

    text.prepend("Hey! ")
    print(text)

    text.delete_front(4)
<<<<<<< HEAD
    print(text)
=======
    print(text)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
