changeQuote = () => {
    const newIndex = this.getRandomInt(this.state.quotes.length);
    this.setState({
      currentQuoteIndex: newIndex;
    })
  }