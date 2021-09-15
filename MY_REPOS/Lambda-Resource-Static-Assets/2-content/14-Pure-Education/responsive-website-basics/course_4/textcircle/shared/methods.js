Meteor.methods({
    addDocument: function(){
        if (!this.userId) {
            return
        }
        else {
            document = {owner:this.userId, createdOn:new Date(), title: 'my new document', isPrivate:false}
            var id = Documents.insert(document);
            return id
        }
    },

    
    // allows changes to the editing users collection 
    addEditingUser:function(docid){
        var doc, user, eusers;
        doc = Documents.findOne({_id:docid});
        if (!doc){return;}// no doc give up
        if (!this.userId){return;}// no logged in user give up

        user = Meteor.user()
        // console.log('Meteor.user().profile', Meteor.user().profile)
        eusers = EditingUsers.findOne({docid:doc._id});
        if (!eusers){// no editing users have been stored yet
            eusers = {
            docid:doc._id, 
            users:{}, 
            };
        }
        user.lastEdit = new Date();
        eusers.users[this.userId] = user;
        // upsert- insert or update if filter matches
        EditingUsers.upsert({_id:eusers._id}, eusers);
    },


    updateDocumentPrivacy:function(doc){
        owner_doc = Documents.findOne({_id:doc._id, owner:this.userId})
        if (owner_doc){
            owner_doc.isPrivate = doc.isPrivate
            Documents.update({_id:doc._id}, owner_doc)
            console.log('Document privacy set to ' + doc.isPrivate)
        }
        else {
            console.log('You have no permission to edit this document.')
        }
    },


    addComment:function(comment){
        if (this.userId){
            comment.createdOn = new Date();
            comment.user = this.userId;
            return Comments.insert(comment);
        }
        else {
            return
        }
    },
});
