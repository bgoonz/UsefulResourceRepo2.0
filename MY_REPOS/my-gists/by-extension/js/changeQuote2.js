changeQuote = () => {
  this.setState((state, props) => {
    const { quotes, currentQuoteIndex } = state;
    let newIndex = -1;
    do {
      newIndex = this.getRandomInt(quote.length);
    } while (newIndex === currentQuoteIndex);
    return {
      currentQuoteIndex: newIndex,
    };
  });
};