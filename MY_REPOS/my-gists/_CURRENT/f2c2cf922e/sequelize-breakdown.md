# Sequelize: Step-By-Step

Sequelize is a powerful library in Javascript that makes it easy to manage a SQL database. Sequelize can layer over different protocols, but here we'll use PostgreSQL. At its core, Sequelize is an Object-Relational Mapper – meaning that it maps an object syntax onto our database schemas. Sequelize uses Node.JS and Javascript's object syntax to accomplish its mapping.

Under the hood, Sequelize used with PostgreSQL is several layers removed from our actual database:

1. First, we write our Sequelize, using Javascript objects to mimic the structure of our database tables.
2. Sequelize creates a SQL string and passes it to a lower-level library called `pg` (PostgreSQL).
3. `pg` connects to your PostgreSQL database and queries it or transforms its data.
4. `pg` passes the data back to Sequelize, which parses and returns that data as a Javascript object.

#### Getting Started
Now let's look at the building blocks of your next Sequelize project.

To get started with Sequelize, we need to create a database instance, connected to a PostgreSQL database.

The following assumes that you have PostgreSQL set up on your computer and that you can monitor its state. You should also go ahead and make a new database before we begin. Consider using `psql` or [Postico](https://eggerapps.at/postico/) if you need some way to manage PostgreSQL on your machine.

#### Creating a DB

Sequelize uses a constructor function to connect to your database. It return a Sequelize instance for you to interact with.

Here's all you need to do:

```js
const db = new Sequelize('postgres://localhost:3000/yourDatabaseNameHere')
                          //^ Our protocol   ^Path to DB     ^Database name
```

This line creates a new instance of Sequelize, which we have called `db`. We'll need to pass in a string with the protocol (PostgreSQL), the database's location (an IP or other path), and the database name.

### Defining Your Models
Sequelize is all about *models*. In database-speak, these are our *schemas* – the shape that our data takes. Your models are both the objects that you'll interact with in your application and the primary tables that you'll create and manage in your database.

Here's how to define a new model called *Album*.

```js
db.define('Album', {
  title: {
    type: Sequelize.STRING,
  }
  tracks: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
  price: {
    type: Sequelize.INTEGER,
  }
});

```

`db.define()` defines a new table in our database with the name 'Album'. As our second parameter to `define()`, we pass in an object that will hold the attributes of our database schemas.

Inside this object, our properties create the names of our columns. Now, our Album table will have a `title`, `price`, and `tracks` column.

For each column, we specify *another* object that instructs Sequelize how to create and manage that column.

In our example, we specify the `type` of each column using [Sequelize's data types](http://docs.sequelizejs.com/en/latest/docs/models-definition/#data-types). This constrains our schemas, allowing attributes to be assigned only certain types of data.

We can (and should) add some validation to our columns as well.

```js
var Album = db.define('Album', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
  tracks: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10
  }
});
```

We've added an `allowNull` property. This validation will `throw` an error if we ever try to create an Album where any of these fields are not specified.

We can also set default values with `defaultValue`. Let's make each Album cost $10, by default.

### Add a Second Model

Let's also add an Artist model.

```js
var Artist = db.define('Artist', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
  genre: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
});
```

Once we have our second model, we should associate Artists with Albums. After all, each album will be created by an artist!

In SQL, we would normally need to create and specify a *join table*. In our join table the primary key (an id number) of our artist would be tied to the primary key of an album. This would allow us to know that an album 'belongs to' an artist.

Sequelize makes this simple. Rather than building new tables manually, we can just call `.belongsTo()` on our models to set up an association.

So below our model definitions, we can write:
```js
Album.belongsTo(Artist, {as: 'artist'});
```

Just like that, Sequelize creates our join table. The `{as: 'artist'}` allows us to set an *alias* for our association. By default, Sequelize adds an id field to associate our Albums and Artists. Now we can refer to that field just by its alias: 'artist'.

### Synchronizing Your Models
The last step to set up Sequelize is to synchronize our models. We can sychronize individual tables by calling `.sync()` on the table.

For example, `Albums.sync()` or `Artists.sync()`. To sync the whole database, just use `db.sync()`.

When testing, it's sometimes easier to start with fresh tables every time you launch your application. `.sync()` can take an object with parameters that allow you to control various aspects of database synchronization. One of these is `{force: true}`.

> Beware! `db.sync({force: true})` will drop (delete) your tables, and resync your data as though you're starting fresh! This can be very useful if you need to clean up your database after each run. But it can also cause you to lose data!

That's all you need to get your SQL database set up and going.

## Methods, Hooks, Getters, and Setters
Sequelize models have loads of helpful functionality to make your life easier.

Let's look at a few.

### Virtuals: Getters and Setters
Sequelize lets us do even more to enhance our models with getters and setters.

Getters and setters are commonly used in traditional object-oriented languages like C# or Java. Getters are methods that help you retrieve (get) the value. Setters help you, well, set the value.

Both are considered *virtuals*, meaning that they are not actually part of your model's schema. Getters and setters are just ways to supplement your model with logic of their own.

First, let's add a getter to help us get a nicely formatted string of an album title and its price.

We need to edit the definition of our model for this to work.

```js
var Album = db.define('Album', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
    tracks: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    }
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    }
  },
  getterMethods: {
    getTitleWithPrice: function() {
      return this.title + ' – $' + this.price; // Our `this` context will refer to our album instance
    }
  }
);
```

If we need to get this string, we just need to call our getter on an album. Assuming we have already found our album instance, `console.log(albumInstance.getTitleWithPrice());` will log 'My Album Title – $10'.

Now, let's add a setter for our tracks.

```js
var Album = db.define('Album', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
    tracks: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    }
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    }
  },
  getterMethods: {
    getTitleWithPrice: function() {
      return this.title + ' – $' + this.price; // Our `this` context will refer to our album instance
    }
  },
  setterMethods: {
    setTrackList: function (arrayOfTracks) {
      this.tracks = arrayOfTracks;
    }
  }
);
```
## TBC HERE

To create an complete tracks list from an array, we need only call `albumInstance.setTrackList(arrayOfTracks)` with an `arrayOfTracks`.

    Hooks, e.g. beforeValidate
    Class methods
    Instance methods
    this value in options
        getters: the instance
        hooks: the model (instance is 1st arg of the hook func)
        Instance methods: instance
        Class methods: class


### Class Methods
Class methods exist on the *class* of the object. Don't confuse them with methods on an object's prototype or in an object's constructor. Methods on an object's `.prototype` and added via .thismethod are both instance methods,

Class methods are added to a class directly. For example, if we had a Users class, we would add a method as follows:

```js
User.myValidationMethod = function() {

};

```

Again, notice this is not on the User object's prototype.




### Instance Methods
As you might guess, instance methods exist on instances themselves. Typically, instance methods are added to an object's prototype.

For example,
```js
var User = db.define('user') // finish this

User.prototype.myAmazingMethod = function () {

};


```

#### Hooks
Hooks are functions that will run every time your database is updated. A hook on a particular table will run each time a value is changed or perhaps when a new row is added.



### Creating Model Associations
Databases have standard associations like 'many to many', 'belongs to many', or 'many to one'.

In each case, Sequelize gives us clear methods to configure out associations.

If we were managing our database in a traditional way, we would need to create separate tables to hold our foreign keys. These tables, often called foreign-key tables or join tables, hold references that connect two other tables.

For example, if we wanted to associate Users and Accounts, we might want a table to connect a UserID with an accountID. Instead of storing these in the same table, we would create a foreign-key tale that held only a userID and its associated accountID. This would allow easy access of a user's profile and ID with that user's account information.

Associating models, e.g. hasOne, belongsTo, etc.
    Which model has the foreignKey
    Which Sequelize model is given new methods

# Promises and Sequelize
<!-- Spin off this article as part of something on Promises  -->

Sequelize operates with Promises.

Promises allow us to escape from callback hell when running asynchronous code in Node.js. It's beyond the scope of this article to go into detail about Promises. Read more about them here.

When we call Sequelize methods like `Model.create()` or `Model.select()`, we are interacting with the file system and therefore making an asynchronous call. These methods return a Promise object, which will resolve or reject based on the successful or failed interaction with your database.
