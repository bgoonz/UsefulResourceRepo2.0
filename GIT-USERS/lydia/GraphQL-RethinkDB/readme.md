# GraphQL-RethinkDB

The app itself is very easy to understand please refer to **schema/schema.js**

### Initial Setup

* Git clone , npm install
* Install RethinkDB
* Browse to RethinkDB adminstrator 
* Create Desired Tables. In our case
  * r.db('test').createTable('Company')
  * r.db('test').createTable('Employee')
* Add Secondry Index on ( one to many relationship ) child table. In our case
  * r.db('test').table('employees').indexCreate('companyId')

## Coming up

* Integration with React

### To-Do

* Integration with Relay
