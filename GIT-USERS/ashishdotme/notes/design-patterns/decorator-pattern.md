## Decorator Pattern

Decorator Pattern is designed to provide you with a clean way of extending abilities of your original Object or Component, without impacting its initial state or structure.

- It ingests a function and returns back a function
- Decorators can be used to add features and function to existing objects dynamically
- Implemented as high order functions

```javascript
// User.js

class User {
  constructor(firstName, lastName, title) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

```javascript
// UserDecorator.js

class UserDecorator {
  constructor(user) {
    this.user = user;
  }

  getFullName() {
    return this.user.getFullName();
  }
}
```

```javascript
// UserFullNameWithTitleDecorator.js

class UserFullNameWithTitleDecorator extends UserDecorator {
  getFullName() {
    return `${this.user.title} ${this.user.getFullName()}`;
  }
}
```

```javascript
// App.js

const user = new User("Arthur", "Frank", "Mr");
user.getFullName();

const decoratedUser = new UserFullNameWithTitleDecorator(user);
decoratedUser.getFullName();
```
