// this is image_share.js
Images = new Mongo.Collection("images");

if (Meteor.isClient) {
   Template.images.helpers({images:
    Images.find({}, {sort:{createdOn: -1, rating:-1}})
  });

   Template.images.events({
    'click .js-image':function(event){
        $(event.target).css("width", "50px");
    }, 
    'click .js-del-image':function(event){
       var image_id = this._id;
       console.log(image_id);
       // use jquery to hide the image component
       // then remove it at the end of the animation
       $("#"+image_id).hide('slow', function(){
        Images.remove({"_id":image_id});
       })  
    }, 
    'click .js-rate-image':function(event){
      var rating = $(event.currentTarget).data("userrating");
      console.log(rating);
      var image_id = this.id;
      console.log(image_id);

      Images.update({_id:image_id}, 
                    {$set: {rating:rating}});
    }, 
    'click .js-show-image-form':function(event){
      $("#image_add_form").modal('show');
    }

   });

  Template.image_add_form.events({
    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log("src: "+img_src+" alt:"+img_alt);

      Images.insert({
        img_src:img_src, 
        img_alt:img_alt, 
        createdOn:new Date()
      });
       $("#image_add_form").modal('show');
      return false;
    }
  });


}

