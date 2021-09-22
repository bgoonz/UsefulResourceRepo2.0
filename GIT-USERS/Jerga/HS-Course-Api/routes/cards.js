const express = require("express");
const router = express.Router();
const cards = require("../data.json");

router.get("", function (req, res) {
  return res.json(cards);
});

router.get("/:cardId", function (req, res) {
  const { cardId } = req.params;
  const card = cards.find((card) => card.cardId === cardId);
  if (card) {
    card.img = `http://wow.zamimg.com/images/hearthstone/cards/enus/original/${card.cardId}.png`;
    return res.json([card]);
  } else {
    return res.status(422).send({ errors: { message: "Card not found!" } });
  }
});

router.get("/classes/:cardClass", function (req, res) {
  const { cardClass } = req.params;

  const cardDeckCards = cards.filter(
    (card) => card.cardClass === cardClass.toUpperCase()
  );
  if (cardDeckCards) {
    return res.json(cardDeckCards);
  } else {
    return res.status(422).send({ errors: { message: "Card not found!" } });
  }
});

router.get("/races/:race", function (req, res) {
  const { race } = req.params;

  const cardDeckCards = cards.filter(
    (card) => card.race === race.toUpperCase()
  );
  if (cardDeckCards) {
    return res.json(cardDeckCards);
  } else {
    return res.status(422).send({ errors: { message: "Card not found!" } });
  }
});

router.get("/qualities/:quality", function (req, res) {
  const { quality } = req.params;

  const cardDeckCards = cards.filter(
    (card) => card.rarity === quality.toUpperCase()
  );
  if (cardDeckCards) {
    return res.json(cardDeckCards);
  } else {
    return res.status(422).send({ errors: { message: "Card not found!" } });
  }
});

router.get("/types/:type", function (req, res) {
  const { type } = req.params;

  const cardDeckCards = cards.filter(
    (card) => card.type === type.toUpperCase()
  );
  if (cardDeckCards) {
    return res.json(cardDeckCards);
  } else {
    return res.status(422).send({ errors: { message: "Card not found!" } });
  }
});

router.get("/factions/:faction", function (req, res) {
  const { faction } = req.params;

  const cardDeckCards = cards.filter(
    (card) => card.faction === faction.toUpperCase()
  );
  if (cardDeckCards) {
    return res.json(cardDeckCards);
  } else {
    return res.status(422).send({ errors: { message: "Card not found!" } });
  }
});

module.exports = router;
