const obj = {};
obj.username = prompt("What is your name?");
const friendHash = {};

const setLink = () => {
  let link = "http://127.0.0.1:8080/messages/";
  if(obj.roomname !== undefined){
    link += obj.roomname;
  } else {
    link += "general";
  }
  return link;
};

const Message = Backbone.Model.extend();

const MessageView = Backbone.View.extend({
  render() {
    const name = $('<span/>').text(this.model.get("username")).addClass('name');
    const txt = $('<span/>').text(`: ${this.model.get("message")}`);
    this.$el.append(name).append(txt);

    if(friendHash[this.model.get("username")]) {
      this.$el.addClass("friend");
    }
    return this.$el;
  }
});

const addPost = () => {
  $.ajax(setLink(), {
    contentType: 'application/json',
    type: 'POST',
    data: JSON.stringify(obj),
    success(result) {
      console.log('result: ',result);
    }
  });
};

$(document).ready(() => {
  $('#container').on('click', '.name', function(){
    friendHash[this.innerHTML] = true;
    console.log(friendHash);
  });

    //create chatroom
  $('#createChatRoom').on('click', e => {
    e.preventDefault();
    obj.roomname = prompt("Enter a chat room name.");
    $('#enterChatRoom').append(`<option>${obj.roomname}</option>`);
  });

  //enter a chatroom
  $('#enterChatRoom').change( function(){
      obj.roomname = $(this).find('option:selected').val();
  });

  $('#submit').on('click', () => {
    obj.text = $('#inputBox').val();

    addPost();
    $('#inputBox').val('');
  }); //end #submit

  $.ajax("http://127.0.0.1:8080/chatrooms/", {
    contentType: 'application/json',
    success(response) {
      const chatrooms = JSON.parse(response);
      const $chatDropDown = $('#enterChatRoom');
      for (let i = 0; i < chatrooms.length; i++) {
        $chatDropDown.append(`<option> ${chatrooms[i]}</option>`);
      }
    },
    error() {
      console.log("Error retrieving chatrooms");
    }
  });

const getMessagesSuccess = response => {
  // response = JSON.parse(response);
  // $('#container').html('');
  // var input;

  // var messages = $.map(response, function(messageData){
  //   return new Message(messageData);
  // });

  // var messageViews = $.map(messages, function(message){
  //   return new MessageView({model: message});
  // });

  // $.map(messageViews, function(messageView){
  //   $('#container').append(messageView.render());
  // });

  $('#container').html($.map(JSON.parse(response), data => {
    return new MessageView({model: new Message(data)}).render();
  }));
};

const getMessages = () => {
  $.ajax(setLink(), {
    contentType: 'application/json',
    success: getMessagesSuccess,
    error(response) {
      console.log('Ajax request failed because of : ', arguments);
    }
  });
};

  setInterval(getMessages, 2000);
}); //end document.ready