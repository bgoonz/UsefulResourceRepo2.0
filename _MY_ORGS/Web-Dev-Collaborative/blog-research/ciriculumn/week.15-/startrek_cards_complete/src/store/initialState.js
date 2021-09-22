const cards = [
	{
		id: 0,
		name: 'Martok',
		imgUrl: 'http://guide.fleetops.net/images/avatars/martok.png',
		content: 'Ferocious Klingon'
	},
	{
		id: 1,
		name: 'Mijural',
		imgUrl: 'http://guide.fleetops.net/images/avatars/mijural.png',
		content: 'Shrike Class Romulan'
	},
	{
		id: 2,
		name: 'Puretech',
		imgUrl: 'http://guide.fleetops.net/images/avatars/puretech.png',
		content: 'Hypersapce Sensor System'
	},
	{
		id: 3,
		name: 'Breen',
		imgUrl: 'http://guide.fleetops.net/images/avatars/breen.png',
		content: 'Breen Battleship'
	},
	{
		id: 4,
		name: 'Mayson',
		imgUrl: 'http://guide.fleetops.net/images/avatars/mayson.png',
		content: ' Norway class Admiral'
	},
	{
		id: 5,
		name: 'Risner',
		imgUrl: 'http://guide.fleetops.net/images/avatars/risner.png',
		content: 'Phalanx class Admiral'
	}
];

const inventory = cards.reduce((accum, el) => {
	accum[el.id] = 10;
	return accum;
}, {});

const decks = [
	{ id: 0, name: 'My Deck', cards: [] },
	{ id: 1, name: "Danny Butterwick's Deck", cards: [ cards[0], cards[1], cards[2], cards[0], cards[1] ] }
];

export default { cards, inventory, decks };
