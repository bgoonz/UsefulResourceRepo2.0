import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDeck } from '../actions/cardActions';
import Flashcard from './Flashcard';
import './Home.css';

interface HomeProps {
  deck: any;
  getDeck(): void;
}

interface HomeState {
  currentCardIndex: number;
  isFlipped: boolean;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = { currentCardIndex: 0, isFlipped: true };
    this.getNextCard = this.getNextCard.bind(this);
    this.getFlipcardState = this.getFlipcardState.bind(this);
  }

  componentDidMount() {
    this.props.getDeck();
  }

  getNextCard() {
    if (this.props.deck) {
      if (this.state.currentCardIndex === this.props.deck.cards.length - 1) {
        this.setState({ currentCardIndex: 0 });
      } else {
        let nextCard = this.state.currentCardIndex + 1;
        this.setState({ currentCardIndex: nextCard });
      }
    }
  }

  getFlipcardState(flipcardState: boolean) {
    this.setState({ isFlipped: flipcardState });
  }

  render() {
    const { deck } = this.props;
    const cards = deck.cards && deck.cards.length > 0 && deck.cards.sort(() => Math.random() - 0.5);
    return (
      <div>
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div className="section">
                <div className="row columns">
                  <div className="column is-one-third" />
                  <div className="column is-one-third">
                    {this.props.deck.cards && (
                      <div>
                        <Flashcard
                          currentCard={cards[this.state.currentCardIndex]}
                          getFlipcardState={this.getFlipcardState}
                          getNextCard={this.getNextCard}
                        />
                        {this.state.isFlipped && (
                          <div className="buttons is-centered">
                            <button
                              className="button is-info"
                              onClick={() => {
                                this.getNextCard();
                              }}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="column is-one-third" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  deck: state.deck,
});

export default connect(mapStateToProps, { getDeck })(Home);
