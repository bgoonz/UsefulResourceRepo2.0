// Card Data contains constants which stand in for data loaded from a server
// This will allow developers to focus on the concepts of React without worrying
// about backend development or data fetching.
//
// 1. Cards - array of card objects
// 2. Inventory - object tracking number of cards left in the store

export const initialCards = [ {
    id: 0,
    name: "Martok",
    imgUrl: "http://guide.fleetops.net/images/avatars/martok.png",
    content: "Ferocious Klingon",
  },
  {
    id: 1,
    name: "Mijural",
    imgUrl: "http://guide.fleetops.net/images/avatars/mijural.png",
    content: "Shrike Class Romulan",
  },
  {
    id: 2,
    name: "Puretech",
    imgUrl: "http://guide.fleetops.net/images/avatars/puretech.png",
    content: "Hypersapce Sensor System",
  },
  {
    id: 3,
    name: "Breen",
    imgUrl: "http://guide.fleetops.net/images/avatars/breen.png",
    content: "Breen Battleship",
  },
  {
    id: 4,
    name: "Mayson",
    imgUrl: "http://guide.fleetops.net/images/avatars/mayson.png",
    content: " Norway class Admiral",
  },
  {
    id: 5,
    name: "Risner",
    imgUrl: "http://guide.fleetops.net/images/avatars/risner.png",
    content: "Phalanx class Admiral",
  },
];

export const initialInventory = initialCards.reduce( ( accum, el ) => {
  accum[ el.id ] = 10;
  return accum;
}, {} );

export const initialDecks = [ {
    name: "My Deck",
    cards: []
  },
  {
    name: "Danny Butterwick's Deck",
    cards: [ initialCards[ 0 ], initialCards[ 1 ], initialCards[ 2 ] ],
  },
]
