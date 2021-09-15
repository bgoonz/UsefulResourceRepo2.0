# Request Reply Pattern

- It is a fundamental one way messaging pattern
- The client or requestor sends a request to a server or replier, which responds back with a 'reply'
- This pattern involves the use of unique correlation identifier in every request
- The correlation identifier is sent back to the requestor in the reply and is used to correlate the request and reply
- A return address may also be incorporated if multiple requestors are involved
- Can be used with all kinds of channels such as WebSockets, HTTP, inter process communication in Node.js and more
- Can also be used with message brokers such as RabbitMQ to enable multiple apps to communicate with each other effectively
