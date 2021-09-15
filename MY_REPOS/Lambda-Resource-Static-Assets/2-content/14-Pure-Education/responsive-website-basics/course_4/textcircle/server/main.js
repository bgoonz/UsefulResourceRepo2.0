Meteor.startup(function() {
    if (!Documents.findOne()){
        Documents.insert({
            title: 'New default document',
            createdOn: new Date(),
            owner: 'unknown',
            isPrivate:'false',
        });
    }
});
