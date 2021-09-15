Template.header.helpers({
    // HERE is another one for you - can you
    // complete the template helper for the 'header' template
    // called 'nickname' that
    // returns the nickname from the Session variable?, if they have set it
    nickname:function(){
        if (Session.get('nickname')){
            return Session.get('nickname')
        }
        else {
            return ""
        }
    },
});


Template.body.helpers({
    showhideform:function(){
        var nickname = Session.get('nickname');
        if (!nickname){
            return true
        }
        else {
            return false
        }
    },
})

Template.messageList.helpers({
    // this helper provides the list of messages for the
    // messgaeList template
    messages:function(){
        return Messages.find({});
    }
});

