const Queue = require('./queue')

describe('Queue', () => {
    let queue

    beforeEach(() => {
        queue = new Queue()
    })

    test('instantiation', () => {
        expect(queue).toBeDefined()
    })

    test('enqueue', () => {
        queue.enqueue(1)
        queue.enqueue(2)
        expect(queue.toArray()).toEqual([1, 2])
    })

    test('dequeue', () => {
        expect(queue.dequeue()).toEqual(undefined)
        queue.enqueue(1)
        queue.enqueue(2)
        const data = queue.dequeue()
        expect(data).toBe(1)
        expect(queue.toArray()).toEqual([2])
    })

    test('length', () => {
        expect(queue.length).toBe(0)
        queue.enqueue(1)
        queue.enqueue(2)
        queue.dequeue()
        expect(queue.length).toBe(1)
    })

    test('peek', () => {
        expect(queue.peek()).toBe(null)
        queue.enqueue(1)
        queue.enqueue(2)
        expect(queue.peek()).toBe(1)
    })

    test('toString', () => {
        expect(queue.toString()).toBe('')
        queue.enqueue(1)
        queue.enqueue(2)
        expect(queue.toString()).toBe('1,2')
    })

    test('isEmpty', () => {
        expect(queue.isEmpty()).toBe(true)
        queue.enqueue(1)
        queue.enqueue(2)
        expect(queue.isEmpty()).toBe(false)
    })

    test('creating queue with initial values', () => {
        queue = new Queue(1, 2)
        expect(queue.toArray()).toEqual([1, 2])
    })

    test('creating queue with initial values as args', () => {
        queue = new Queue(3, 1)
        expect(queue.toArray()).toEqual([3, 1])
    })
})
