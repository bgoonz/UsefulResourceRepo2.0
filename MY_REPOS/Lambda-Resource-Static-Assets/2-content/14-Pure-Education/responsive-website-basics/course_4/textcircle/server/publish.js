Meteor.publish('documents', function() {
    return Documents.find({
        $or:[{isPrivate:false}, {owner:this.userId}]
    })
});

Meteor.publish('editingUsers', function() {
    return EditingUsers.find()
});
