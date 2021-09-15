# Text Manipulation Documentation

## Important functions in the text-manipulation module 
* [createBuffer](modules/_buffer_index_.md)
* [createTextRange](modules/_buffer_index_.md)


## Important Interfaces and Classes

* [TextBuffer](./interfaces/_buffer_text_buffer_.textbuffer.md)
    * Creates the abstraction around the text manipulation
     * This is the type that is returned when **createBuffer** function is called
    
* [MutableTextRange](./classes/_buffer_mutable_text_range_.mutabletextrange.md)
    * Provides a mutable TextRange, allowing for ranges to be changed
    
* [TextPosition](./classes/_buffer_text_position_.textposition.md)
    * Defines a position in a TextBuffer. This is a component used in TextRanges
    
* [ImmutableTextRange](./classes/_buffer_immutable_text_range_.immutabletextrange.md)
    * Provides an immutable TextRange (Cannot be changed)
    
