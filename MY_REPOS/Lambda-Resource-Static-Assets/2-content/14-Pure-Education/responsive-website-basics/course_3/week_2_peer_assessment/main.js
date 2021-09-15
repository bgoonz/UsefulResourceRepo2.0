// shared code
Websites = new Mongo.Collection("websites");

// client only code
if (Meteor.isClient){

    // Accounts.config({ 
    //     sendVerificationEmail: true, 
    //     forbidClientAccountCreation: true, 
    //     restrictCreationByEmailDomain: 'school.edu', 
    //     loginExpirationDays: 30, 
    //     oauthSecretKey: 'wgporjigrpqgdfg', 
    // }); 

    Accounts.ui.config({ 
        passwordSignupFields: 'USERNAME_AND_EMAIL',
        requestPermissions: true, 
        requestOfflineToken: true, 
    }); 
    
    $(window).scroll(function(event) {
        console.log(new Date())
    })

    // event listeners on the addSiteForm template
    Template.addSiteForm.events({
        // this runs when they click the add button... you need to compete it
     'click .js-add-site':function(event){
         var url = $('#url_input').val();// get the form value using jquery...
         var site = {"url":url};// create a simple object to insert to the collection

         if (Meteor.user()) {
            console.log(Meteor.user())
            var creatorId = Meteor.user()._id;
            var creatorEmail = Meteor.user().emails[0].address;
            console.log(creatorEmail)
            var createdOn = new Date();
        } else {
            var creatorId = 'anonymous person'
            var creatorEmail = 'anonymous person'
        }
        console.log("You need to put some code in here that calls insert on the Websites collection");

         // make sure input box received a text
         if (!url) {
             alert('Input box cannot be empty')
         } else {
            Websites.insert({
                url : url,
                creatorEmail : creatorEmail,
                creatorId : creatorId,
                createdOn : createdOn
            })
         }

         // put your code in here...
         return false;
     }
    });

    Template.addSiteForm.events({
        'click .js-prompt-to-login' : function(event){
            alert('Login to add a site')
        }
    });

    // this helper gets the data from the collection for the site-list Template
    Template.siteList.helpers({
        'all_websites' : function(){
            if (Session.get('userFilter')) {
                return Websites.find({creatorId : Session.get('userFilter')})
            } else {
                return Websites.find({})
            }
        },

        getUser : function(user_id){
            var user = Meteor.users.findOne({_id : user_id});
            if (user) {
                return user.username;
            } else {
                return 'anonymous person'
            }
        },

        // to be completed
        safer_email : function(email){
            if (email.indexOf('@')!=-1){// we have an email
                return email.split('@')[0];
            }
            else{// probably anonymouse.
                return email;
            }
        },

    });

    Template.siteList.events({
        'click .js-set-websites-filter' : function(event){
            Session.set('userFilter', this.creatorId)
        },
        'click .js-unset-websites-filter' : function(event){
            Session.set('userFilter', undefined)
        },
    });

    // events in the body of the page

    Template.body.events({
        'click .js-unset-websites-filter' : function(event){
            Session.set('userFilter', undefined)
        },
    });

    // this helper displays the logged in user's name on the page
    Template.body.helpers({
        username: function() {
            if (Meteor.user()) {
                // console.log(Meteor.user());
                return Meteor.user().username
            }
            else {
                return 'anonymous person'
            }
        },

        filtering_sites : function() {
            if  (Session.get('userFilter')) {
                return true;
            }
            else {
                return false;
            }
        },

        getFilterUser : function(){
            if (Session.get('userFilter')) {
                var user = Meteor.users.findOne({_id : Session.get('userFilter')});
                if (user) {
                    return user.username
                }
                else {
                    return 'anonymous person'
                }
            }
        },
    });

}
