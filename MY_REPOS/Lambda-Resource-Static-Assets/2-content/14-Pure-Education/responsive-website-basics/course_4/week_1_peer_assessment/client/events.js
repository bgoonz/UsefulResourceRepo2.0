Template.nicknameForm.events({
    'click .js-set-nickname':function(){
        var nickname = $('#nickname-input').val();
        Session.set('nickname', nickname);
    }
});

Template.messageForm.events({
    // this event listener is triggered when they click on
    // the post! button on the message form template

    'click .js-save-message':function(event){
        var messageText = $('#message-text-input').val();
        if (!messageText) {
            alert('Message text cannot be empty')
        }
        else {
            var messageNickname = Session.get('nickname');
            var message = {messageText:messageText,
                nickname:messageNickname,
                createdOn:new Date()};
                Messages.insert(message);
        }

    }
});
