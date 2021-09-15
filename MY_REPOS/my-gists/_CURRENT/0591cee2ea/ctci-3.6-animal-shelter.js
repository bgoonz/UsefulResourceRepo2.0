// 3.6. Animal Shelter:
// An animal shelter, which holds only dogs and cats, operates on a strictly "first in, first out" basis.
// People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or they
// can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type).
// They cannot select which specific animal they would like. Create the data structures to maintain this
// system and implement operations such as enqueue, dequeueAny, deQueueDog, and deQueueCat.
// You may use the built-in LinkedList data structure.
//
// Solution:
// We keep an ID to denote the oldest animal and create separate arrays to enqueue and dequeue.

class AnimalShelter {
  constructor(capacity) {
    this._dogs = [];
    this._cats = [];
    this._id = 0;
  }

  enqueue(type) {
    if (!type) {
      return "Please specify type of animal";
    }

    if (type === "dog") {
      this._dogs.push(this._id);
    } else if (type === "cat") {
      this._cats.push(this._id);
    }
    this._id++;
    return this._id - 1;
  }

  dequeueAny() {
    let lastDog = this._dogs[this._dogs.length - 1];
    let lastCat = this._cats[this._cats.length - 1];

    if (lastDog > lastCat) {
      return lastDog.pop();
    }
    return lastCat.pop();
  }

  dequeueDog() {
    return this._dogs.pop();
  }

  dequeueCat() {
    return this._cats.pop();
  }
}
