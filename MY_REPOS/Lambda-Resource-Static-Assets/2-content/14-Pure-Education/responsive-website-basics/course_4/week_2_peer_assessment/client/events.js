Template.messageForm.events({
    // this event listener is triggered when they click on
    // the post! button on the message form template

    'click .js-save-message':function(event){
        var messageText = $('#message-text-input').val();
        // notice how tihs has changed since the lsat time
        // now we read the username from the Meteor.user()
        var messageNickname = "Anon";
        if (Meteor.user()){
            messageNickname = Meteor.user().username;
        }
        else {
            alert('You must be logged in to post a message.')
        }
        var message = {messageText:messageText,
                        nickname:messageNickname,
                        createdOn:new Date()};

        Meteor.call("insertMessage", message);
    }
});
