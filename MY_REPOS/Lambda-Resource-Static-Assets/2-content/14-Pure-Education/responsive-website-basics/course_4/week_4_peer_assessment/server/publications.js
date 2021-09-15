// the messages publicaction now takes a parameter
// so we can limit the set of messages
// that get sent to the client in one go.
Meteor.publish('messages.filtered',function (chatroomId) {
    if (this.userId){
        return Messages.find({chatroomId:chatroomId})
        // HERE is another place for you to edit
        // put in a line that finds
        // and returns all messages that have chatroomId
        // equal to the chatroomId sent into this function
    }
});


Meteor.publish("chatrooms", function(){
    if (this.userId){
        return Chatrooms.find({});
    }
});
