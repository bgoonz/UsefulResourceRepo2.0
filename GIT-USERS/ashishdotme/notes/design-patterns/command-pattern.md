# Command Pattern

- The command pattern allow us to craft a uniform interface, known as an Invoker, that issues commands which encapsulate the inner workings of the operation
- The invoker must expose an execute method that accepts a command and executes its internal execute function
- Commands act on a reciever, which receives the outcome of an action
- The invoker may also provide with the ability to undo operations
- This pattern allows you to write diverse set of operations, without affecting or refactoring the invoker interface, used by the client
