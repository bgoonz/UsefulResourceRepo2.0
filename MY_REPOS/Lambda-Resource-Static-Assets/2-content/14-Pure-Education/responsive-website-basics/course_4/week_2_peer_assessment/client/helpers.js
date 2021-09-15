// this will configure the sign up field so it
// they only need a username
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});


Template.header.helpers({
    // HERE is another one for you - can you
    // complete the template helper for the 'header' template
    // called 'nickname' that
    // returns the nickname from the Session variable?, if they have set it
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    },
});


Template.messageList.helpers({
    // this helper provides the list of messages for the
    // messgaeList template
    messages:function(){
        return Messages.find({}, {sort: {createdOn: -1}})
    }
});
