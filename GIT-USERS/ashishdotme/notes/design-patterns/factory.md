## Factory Pattern

In factory pattern, we create objects without exposing the creation logic to the code that requires the object to be created.

- It provides an interface for constructing pre configured objects
- Code is cleaner
- It allows you to offer an easy to understand interface to your packages function

```javascript
// Factory.js

function deliveryFactory(address, item) {
  if (distance > 10 && distance < 50) {
    return new DeliveryByCar(address, item);
  }

  if (distance > 50) {
    return new DeliveryByTruck(address, item);
  }

  return new DeliveryByBike(address, item);
}

class DeliveryByBike {
  constructor(address, item) {
    this.address = address;
    this.item = item;
  }
}

class DeliveryByTruck {
  constructor(address, item) {
    this.address = address;
    this.item = item;
  }
}

class DeliveryByCar {
  constructor(address, item) {
    this.address = address;
    this.item = item;
  }
}

const newDelivery = deliveryFactory(
  "121 baily ave, Toronto, canada",
  "nitendo 360"
);
```

## Abstract Factory Pattern

In factory pattern, we take care of creating objects of same family whereas in abstract factory pattern we will provide a constructor for creating families of related objects, without specifying concrete classes or constructors.

```javascript
function abstractFactory(address, item, options) {
  if (options.isSameday) {
    return sameDayDeliveryFactory(address, item);
  }
  if (options.isExpress) {
    return expressDeliveryFactory(address, item);
  }

  return deliveryFactory(address, item);
}
```
