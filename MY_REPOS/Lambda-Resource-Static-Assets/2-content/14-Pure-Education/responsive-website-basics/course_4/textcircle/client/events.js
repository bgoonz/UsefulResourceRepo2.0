Template.navbar.events({ 
    'click .js-add-document': function(event) {
        event.preventDefault();        
        if (!Meteor.user()){ // user not logged in
            alert('Please login to add a document')
        }
        else {
            var id = Meteor.call('addDocument', function(err, res) {
                if (!err) {// all's fine
                    Session.set('docid', res)
                }
            });
        }
    },
});


Template.documentMeta.events({
    'click .js-toggle-private':function(){
        var document = {_id:Session.get('docid'), isPrivate:event.target.checked}
        Meteor.call('updateDocumentPrivacy', document)
    }
});
