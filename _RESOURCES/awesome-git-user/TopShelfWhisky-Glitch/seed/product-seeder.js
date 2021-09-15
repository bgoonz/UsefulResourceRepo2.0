var Product = require("../models/product");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/whiskyshop", {
  useNewUrlParser: true,
});

var products = [
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/dwx0gkm8r0ogvdz/balvenie12.jpg?dl=0",
    title: "Balvenie 12 Year",
    category: "Speyside",
    description:
      "A Speyside classic. A wonderful after-dinner malt, Balvenie Doublewood's extra complexity and richness are a result of a second maturation in fresh sherry casks.",
    price: 50,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/ncjju1m4239azki/aberlourAbunadh.jpg?dl=0",
    title: "Aberlour A'Bunadh",
    category: "Speyside",
    description:
      "A Speyside sherry bomb. As always, matured in oloroso sherry butts. One of the most popular single malts among connoisseurs.",
    price: 65,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/b8zurlwizxqvxar/benRiachCS.jpg?dl=0",
    title: "Ben Riach Cask Strength",
    category: "Speyside",
    description:
      "The Ben Riach distillers in Speyside have combined whisky matured in bourbon, oloroso sherry and virgin oak casks. Intense, tasty stuff.",
    price: 75,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/sq6q8ipglusu3cc/macallan18.jpg?dl=0",
    title: "Macallan 18 Year",
    category: "Speyside",
    description:
      "Matured using a combination of Exceptional Oak Casks. An extraordinarily smooth, delicate yet complex Single Malt.",
    price: 190,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/nrxsshp7xtdebkm/macallan12.jpg?dl=0",
    title: "Macallan 12 Year",
    category: "Speyside",
    description:
      "A Speyside classic and one of the most well-known single malts in the world.",
    price: 65,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/xlanyler4ez9lid/glenfiddich15.jpg?dl=0",
    title: "Glenfiddich 15 Year Solera",
    category: "Speyside",
    description: "Immensely popular Glenfiddich variant.",
    price: 45,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/5y7fmp370a7flkq/lagavulin16.jpg?dl=0",
    title: "Lagavulin 16 Year",
    category: "Islay",
    description:
      "The Islay representative in the 'Classic Malts' series is a deep, dry and exceptionally peaty bruiser.",
    price: 60,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/q6d0fgxmgjurwsd/lagavulin12.jpg?dl=0",
    title: "Lagavulin 12 Year",
    category: "Islay",
    description:
      "The Diageo Special Releases welcomes back the Lagavulin 12 for 2018.",
    price: 120,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/520j9zfgoffv6h7/lagavulinDE.jpg?dl=0",
    title: "Lagavulin Distillers Edition",
    category: "Islay",
    description:
      "Lagavulin's Distillers Edition bottlings are allowed a finishing period in casks that previously held sweet, sticky Pedro Ximénez Sherry.",
    price: 100,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/b3maq3z9u3o398o/ardbeg10.jpg?dl=0",
    title: "Ardbeg 10 Year",
    category: "Islay",
    description:
      "For peat lovers, Ardbeg 10 Year Old is probably the highest-quality 'entry-level' single malt on the market.",
    price: 45,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/fxfhj9f8j4smj01/ardbegUigeadail.jpg?dl=0",
    title: "Ardbeg Uigeadail",
    category: "Islay",
    description: "A fine drop of Ardbeg bottled at cask strength.",
    price: 70,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/ix4rgsqbxpc3i2w/ardbegSupernova.jpg?dl=0",
    title: "Ardbeg Supernova",
    category: "Islay",
    description:
      "Ardbeg Supernova has been a phenomenon since the Advance Committee Release sold out in a matter of hours back in January 2009.",
    price: 450,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/gyr4carchmstv7a/laphroaig10.jpg?dl=0",
    title: "Laphroaig 10 Year",
    category: "Islay",
    description: "Laphroaig 10yo is a full-bodied, smoky gem.",
    price: 45,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/m1jkdr8rrybrffi/laphroaig10CS.jpg?dl=0",
    title: "Laphroaig 10 Year CS",
    category: "Islay",
    description:
      "Batch three of Laphroaig's new cask strength 10 year old. This is a stunning whisky with oodles (literally oodles) of complexity and flavour.",
    price: 100,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/0ui9r5pdg0jgihv/caolIla12.jpg?dl=0",
    title: "Caol Ila 12 Year",
    category: "Islay",
    description:
      "Caol Ila 12 Year Old is of medium weight, but still packing plenty of potent phenols A balanced, peaty beauty.",
    price: 50,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/h6zcxuibcd01rag/clynelish14.jpg?dl=0",
    title: "Caol Ila 12 Year",
    category: "Highland",
    description:
      "Clynelish is the successor to the now-silent Brora. One of the best entry-level proprietary bottlings available from any distillery",
    price: 45,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/z65bhgearvdfxut/edradour10.jpg?dl=0",
    title: "Edradour 10 Year",
    category: "Highland",
    description:
      "A tiny distillery in Perthshire is home to Edradour. One of Scotland's most endearingly different malts",
    price: 40,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/mksib2vrdlqx2lg/glenmorangie18.jpg?dl=0",
    title: "Glenmorangie 18 Year",
    category: "Highland",
    description: "A wonderfully creamy and thick 18 year old dram.",
    price: 85,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/tqbwqzwpybaqcva/royalBrackla12.jpg?dl=0",
    title: "Royal Brackla 12 Year",
    category: "Highland",
    description:
      "Royal Brackla 12 Year Old is finished in first-fill Oloroso sherry casks and is light and spicy with notes of vanilla and black pepper.",
    price: 50,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/8ti8q2ek4beoid5/oldPulteney17.jpg?dl=0",
    title: "Old Pulteney 17 Year",
    category: "Highland",
    description: "A delicious Highland dram from Old Pulteney.",
    price: 90,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/b2qan5v1azz2p4t/oban14.jpg?dl=0",
    title: "Oban 14 Year",
    category: "Highland",
    description:
      "The Western Highland representative in Diageo's 'Classic Malt' series.",
    price: 45,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/rilbytrvxijt8j1/arran14.jpg?dl=0",
    title: "Arran 14 Year",
    category: "Island",
    description:
      "As has always been the case with Arran's malt, this has been neither coloured nor chill-filtered.",
    price: 50,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/01q7qcjsrcn7g0d/hp18.jpg?dl=0",
    title: "Highland Park 18",
    category: "Island",
    description:
      "A superb 18 year old from the Highland Park distillery and a winner of a Gold Medal at the 2005 San Francisco World Spirits Competition.",
    price: 130,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/bt5d59v31szv2gi/ledaig18.jpg?dl=0",
    title: "Ledaig 18 Year",
    category: "Island",
    description:
      "The Tobermory distillers on the Isle of Mull also know their way around peated malt for sure.",
    price: 150,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/tedf0gbj8emu8pw/talisker10.jpg?dl=0",
    title: "Talisker 10 Year",
    category: "Island",
    description:
      "A massive success as the island representative in Diageo's 'Classic Malts' series.",
    price: 35,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/2d6lwek07wo8586/talisker18.jpg?dl=0",
    title: "Talisker 18 Year",
    category: "Island",
    description:
      "A must have for any Talisker fan. The 18 year old was hugely well received by just about everyone.",
    price: 105,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/dhoqz13jpc2kt6m/greyjoyTalisker.jpg?dl=0",
    title: "House Greyjoy & Talisker",
    category: "Island",
    description: "Part of the Game of Thrones Single Malts Collection.",
    price: 70,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/jw461r79hnhcfrp/springbank10LB.jpg?dl=0",
    title: "Springbank 10 Year Local Barley",
    category: "Campbeltown",
    description:
      "Another stunning release from Springbank's popular Local Barley series.",
    price: 120,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/aw3b753nhimqvqc/springbank12CS.jpg?dl=0",
    title: "Springbank 12 Year Cask Strength",
    category: "Campbeltown",
    description:
      "A staggeringly good cask strength edition of the 12 year old Springbank.",
    price: 80,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/01xm07fdulvwfxz/longrowRed11.jpg?dl=0",
    title: "Longrow Red 11 Year Port Cask",
    category: "Campbeltown",
    description:
      "Longrow is the peaty whisky produced at Springbank distillery. Expect a peaty yet fruity experience.",
    price: 110,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/4yl7hmap8v27zcf/blantonsSTFB.jpg?dl=0",
    title: "Blanton's SFTB",
    category: "Bourbon-Rye",
    description:
      "Always popular among bourbon lovers, Blanton's Straight From The Barrel doesn't disappoint. Single cask bourbon.",
    price: 80,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/woe9ai8pahhvvzg/bookers.jpg?dl=0",
    title: "Booker's",
    category: "Bourbon-Rye",
    description:
      "Booker Noe first released his signature bourbon in 1992, bottled straight from the barrel.",
    price: 85,
  }),
  new Product({
    imagePath:
      "https://dl.dropboxusercontent.com/s/iiysrsfw6j5iuf5/rittenhouseRye.jpg?dl=0",
    title: "Rittenhouse Rye",
    category: "Bourbon-Rye",
    description:
      "Very popular with rye aficionados, this must be tried by American whiskey enthusiasts.",
    price: 35,
  }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
