[![VithalReddy](https://miro.medium.com/fit/c/96/96/1*GlQSX_dAtVf7agV94PlmgA.jpeg)](https://medium.com/@vithalreddy?source=post_page-----91b7bbd0d218--------------------------------)

If you’re Developing your Rest API’s using Node.js or Express.js, Then You’re probably using MongoDB as Database for Storing Data and Probably with mongoose ODM for working with MongoDB Database.Now as you’re DB starts to grow and you have multiple collections and they are related to each other and soon, you need to work with **array’s** inside in **MongoDB document** and now you want to **push** and **pop** from that **array**, In this MongoDB How-To Tutorial, we are going to learn **How to Push items into mongo Array** with an example.

Consider the following document, which is **USER** document, which has an **array** of **Friends**:

{  
“\_id” : ObjectId(“5a0fa6f6e744c923ec159606”),  
“updated_at” : ISODate(“2017-11-18T03:20:22.282Z”),  
“created_at” : ISODate(“2017-11-18T03:20:22.282Z”),  
“firstName” : “stackFame”,  
“lastName” : “Media”,  
“userName” : “stackFame”,  
“email” : “stackFame@stackFame.com”,  
“password” : “$2a<span class="math inline">10</span>Ru5TVFL889Y5RjDhycly.74c2tFXUEOn0rghzq6OiAu8oQNuqZwu”,  
“status” : 1,  
“language” : “en”,  
“friends”:\[  
5a0fa6f6e744c923ec159606,  
5a0fa6f6e744c923ec159606,  
5a0fa6f6e744c923ec159606, \]  
}

Now, You want edit friends array, when you want to add or remove friend to friends array.First, we will push a friend into an array with the mongoose in nodejs app.

// find by document id and update and push item in array  
users.findByIdAndUpdate(userID,  
{$push: {friends: friend}},  
{safe: true, upsert: true},  
function(err, doc) {  
if(err){  
console.log(err);  
}else{  
//do stuff  
}  
}  
);

## [Receive Inbound emails using Node.js — Node-Mailin](https://stackfame.com/receive-inbound-emails-node-js)

and you’ve successfully pushed item in a MongoDB document.Now we will learn how to pop or remove an item from MongoDB document array.

// find by document id and update and pop or remove item in array  
users.findByIdAndUpdate(userID,  
{$pull: {friends: friend}},  
{safe: true, upsert: true},  
function(err, doc) {  
if(err){  
console.log(err);  
}else{  
//do stuff  
}  
}  
);

and you’re successfully poped or removed an item in a MongoDB document.

**Conclusion**:

It’s very easy to handle data with mongoose and MongoDB.So that you’ve to spend less time with data handling in MongoDB, Focus on your business logic of Rest API’s.

Article first appeared on: [stackfame.com](https://stackfame.com/push-pop-item-mongodb-array-mongoose-nodejs)
