
// public sets of editing users
Meteor.publish("messages", function(){

    if (this.userId){
        return Messages.find({})
    }

    // MAKE your edit here...
    // check if the user is logged in.
    // (note that we check 'this.userId' not 'Meteor.user()'
    // when we are in a publication()
    // Then, if they are logged in, return
    // a mongo cursor that results from Messages.find({})
	
})
