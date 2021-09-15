meif (Meteor.isClient) {
   var img_data = [
   {
      img_src:"laptops.jpg",
      img_alt:"some laptops on a table" 
   }, 
   {
      img_src:"bass.jpg",
      img_alt:"a bass player" 
   }, 
   {
      img_src:"beard.jpg",
      img_alt:"some musicians with beards" 
   }, 

   ];

   Template.images.helpers({images:img_data});


   Template.images.events({
    'click .js-image':function(event){
        $(event.target).css("width", "50px");
    }
   });

}

if (Meteor.isServer) {
   console.log("I am the server");
}


console.log("where am I running");

