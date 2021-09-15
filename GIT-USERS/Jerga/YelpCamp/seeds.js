var mongoose = require("mongoose");
var User = require("./models/user");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// var data = [
//     {
//         name: "Clouds Rust",
//         image: "https://farm6.staticflickr.com/5098/5496185186_d7d7fed22a.jpg",
//         description: "Lorem Ipsum je fiktívny text, používaný pri návrhu tlačovín a typografie. Lorem Ipsum je štandardným výplňovým textom už od 16. storočia, keď neznámy tlačiar zobral sadzobnicu plnú tlačových znakov a pomiešal ich, aby tak vytvoril vzorkovú knihu. Prežil nielen päť storočí, ale aj skok do elektronickej sadzby, a pritom zostal v podstate nezmenený. Spopularizovaný bol v 60-tych rokoch 20.storočia, vydaním hárkov Letraset, ktoré obsahovali pasáže Lorem Ipsum, a neskôr aj publikačným softvérom ako Aldus PageMaker, ktorý obsahoval verzie Lorem Ipsum."
//     },
//     {
//         name: "Mountain View",
//         image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
//         description: "Lorem Ipsum je fiktívny text, používaný pri návrhu tlačovín a typografie. Lorem Ipsum je štandardným výplňovým textom už od 16. storočia, keď neznámy tlačiar zobral sadzobnicu plnú tlačových znakov a pomiešal ich, aby tak vytvoril vzorkovú knihu. Prežil nielen päť storočí, ale aj skok do elektronickej sadzby, a pritom zostal v podstate nezmenený. Spopularizovaný bol v 60-tych rokoch 20.storočia, vydaním hárkov Letraset, ktoré obsahovali pasáže Lorem Ipsum, a neskôr aj publikačným softvérom ako Aldus PageMaker, ktorý obsahoval verzie Lorem Ipsum."
//     },
//     {
//         name: "Gold Mones",
//         image: "https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg",
//         description: "Lorem Ipsum je fiktívny text, používaný pri návrhu tlačovín a typografie. Lorem Ipsum je štandardným výplňovým textom už od 16. storočia, keď neznámy tlačiar zobral sadzobnicu plnú tlačových znakov a pomiešal ich, aby tak vytvoril vzorkovú knihu. Prežil nielen päť storočí, ale aj skok do elektronickej sadzby, a pritom zostal v podstate nezmenený. Spopularizovaný bol v 60-tych rokoch 20.storočia, vydaním hárkov Letraset, ktoré obsahovali pasáže Lorem Ipsum, a neskôr aj publikačným softvérom ako Aldus PageMaker, ktorý obsahoval verzie Lorem Ipsum."
//     }
//     ]

function seedDB() {
  Campground.remove({}, function (err) {
    User.remove({}, function (err) {
      Comment.remove({}, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("removed campgrounds");
      });
    });
  });

  //add few camps
  // data.forEach(function(seed){
  //     Campground.create(seed, function(err,campground){
  //         if(err){
  //             console.log(err);
  //         } else {
  //             console.log("added campground");

  //             Comment.create(
  //                 {
  //                 text: "This place is great",
  //                 author: "Homer"
  //                 }, function(err, comment){
  //                     if(err){
  //                         console.log(err);
  //                     }else{
  //                     campground.comments.push(comment);
  //                     campground.save();
  //                     console.log("Created comment");
  //                     }
  //                 });
  //         }
  //     });
  //});
}

//add few comments

module.exports = seedDB;
