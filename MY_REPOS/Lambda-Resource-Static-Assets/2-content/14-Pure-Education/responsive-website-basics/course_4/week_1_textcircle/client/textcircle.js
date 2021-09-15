// find the first document in the Documents colleciton and send back its id

// Accounts.config({ 
//   sendVerificationEmail: true, 
//   forbidClientAccountCreation: true, 
//   restrictCreationByEmailDomain: 'school.edu', 
//   loginExpirationDays: 30, 
//   oauthSecretKey: 'wgporjigrpqgdfg', 
// }); 
Accounts.ui.config({ 
  passwordSignupFields: 'USERNAME_AND_EMAIL', 
}); 


Template.editor.helpers({
  docid:function(){
    var doc = Documents.findOne();
    if (doc){
      return doc._id;
    }
    else {
      return undefined;
    }
  }, 
  // template helper that configures the CodeMirror editor
  // you might also want to experiment with the ACE editor
  config:function(){
    return function(editor){
      editor.setOption("mode", "html");
      editor.on("change", function(cm_editor, info){
        //console.log(cm_editor.getValue());
        $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
      });        
    }
  }, 
});
