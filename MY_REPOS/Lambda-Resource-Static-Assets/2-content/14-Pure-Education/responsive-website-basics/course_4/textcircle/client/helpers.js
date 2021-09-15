Router.configure({
    layoutTemplate: 'applicationLayout'
});


Router.route('/', function(){
    this.render("navbar", {to:"header"})
    this.render("docList", {to:"main"})
})

Router.route('/documents/:_id', function(){
    Session.set("docid", this.params._id);
    this.render("navbar", {to:"header"});
    this.render("docItem", {to:"main"});
})


Template.navbar.helpers({
    documents:function(){
        return  Documents.find()
    },
});


Template.docList.helpers({
    documents:function(){
        return  Documents.find()
    },
});


Template.editableText.helpers({
    userCanEdit:function(document, collection){
        // edit if current document is owned by logged in user
        doc = Documents.findOne({_id:Session.get("docid"), owner:Meteor.userId()})
        if (doc) {
            return true;
        }
        else {
            return false
        }
    },
});


Template.editor.helpers({
    // return the id of the first document you can find
    docid:function(){
        setupCurrentDocument();
        return Session.get('docid');
    },

    // configure the CodeMirror editor
    config:function(){
        return function(editor){
            editor.setOption("lineNumbers", true);
            editor.setOption("theme", "blackboard");
            // set a callback that gets triggered whenever the user
            // makes a change in the code editing window
            editor.on("change", function(cm_editor, info){
            // send the current code over to the iframe for rendering
            $("#previewFrame").contents().find("html").html(cm_editor.getValue());
            Meteor.call("addEditingUser", Session.get('docid'));
            });        
        }
    }, 
});


Template.documentMeta.helpers({
    doc:function(){
        return Documents.findOne({_id:Session.get('docid')})
    },

    canEdit:function(){
        var doc = Documents.findOne({_id:Session.get("docid")})
        if (doc){
            if (doc.owner == Meteor.userId()){
                return true
            }
        }
        return false
    },
});


Template.editingUsers.helpers({
    // retrieve a set of users that are editing this document
    users:function(){
        var doc, eusers, users;
        doc = Documents.findOne({_id:Session.get('docid')});
        if (!doc){
            return;
        }// give up
        eusers = EditingUsers.findOne({docid:doc._id});
        if (!eusers){return;}// give up
        users = new Array();
        var i = 0;
        for (var user_id in eusers.users){
            users[i] = eusers.users[user_id];
            //   users[i] = fixObjectKeys(eusers.users[user_id]);
            i++;
        }
        return users;
    },
});


function fixObjectKeys(obj){
    var newObj = {};
    for (key in obj){
      var key2 = key.replace("-", "");
      newObj[key2] = obj[key];
    }
    return newObj;
}

function setupCurrentDocument(){
    var doc;
    if (!Session.get('docid')){ // no document yet
        doc = Documents.findOne();
        if (doc) {
            Session.set('docid', doc._id);
        }
    }
}