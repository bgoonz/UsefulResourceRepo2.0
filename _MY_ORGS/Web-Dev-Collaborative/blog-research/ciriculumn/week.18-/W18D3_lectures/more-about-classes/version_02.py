
from collections import namedtuple


class Card:
    """Represents a playing card."""

    __slots__ = ["_suit", "_rank_name", "_rank_value"]

    def __init__(self, suit, rank_name, rank_value):
        self._suit = suit
        self._rank_name = rank_name
        self._rank_value = rank_value

    def __repr__(self):
        return f"{self._rank_name} of {self._suit}"


Rank = namedtuple("Rank", "name value")


class Deck:
    """Represents a deck of cards."""

    __slots__ = ["_cards"]

    _SUITS = ("Hearts", "Diamonds", "Clubs", "Spades")
    _RANKS = (
        Rank(name="Ace", value=1),
        Rank(name="Two", value=2),
        Rank(name="Three", value=3),
        Rank(name="Four", value=4),
        Rank(name="Five", value=5),
        Rank(name="Six", value=6),
        Rank(name="Seven", value=7),
        Rank(name="Eight", value=8),
        Rank(name="Nine", value=9),
        Rank(name="Ten", value=10),
        Rank(name="Jack", value=11),
        Rank(name="Queen", value=12),
        Rank(name="King", value=13)
    )

    def __init__(self):
        self._cards = [Card(suit, rank.name, rank.value)
                       for suit in self._SUITS
                       for rank in self._RANKS]

    @property
    def cards(self):
        return self._cards


deck = Deck()
print(deck.cards)
