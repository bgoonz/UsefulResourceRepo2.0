
class Card:
    """Represents a playing card."""

    __slots__ = ["_suit", "_rank_name", "_rank_value"]

    def __init__(self, suit, rank_name, rank_value):
        self._suit = suit
        self._rank_name = rank_name
        self._rank_value = rank_value

    def __repr__(self):
        return f"{self._rank_name} of {self._suit}"


class Deck:
    """Represents a deck of cards."""

    __slots__ = ["_cards"]

    def __init__(self):
        self._cards = [
            Card("Hearts", "Ace", 1),
            Card("Hearts", "Two", 2),
            Card("Hearts", "Three", 3)
        ]

    @property
    def cards(self):
        return self._cards


deck = Deck()
print(deck.cards)
