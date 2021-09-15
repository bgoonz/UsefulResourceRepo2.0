import { Observable, BehaviorSubject } from "rxjs";
import * as A from "../actions";
import { mapOp$ } from "shared/observable";
import _ from "lodash";

const defaultView = {
  id: 42,
  title: "Filips Game",
  step: A.STEP_CHOOSE_WHITES,
  options: {
    scoreLimit: 5,
    sets: ["1ed"],
  },
  players: [
    {
      id: 1,
      name: "Filip",
      score: 3,
      isCzar: false,
      isPlaying: true,
      isWinner: false,
    },
    {
      id: 2,
      name: "Rolo",
      score: 1,
      isCzar: false,
      isPlaying: true,
      isWinner: false,
    },
    {
      id: 3,
      name: "David",
      score: 4,
      isCzar: true,
      isPlaying: false,
      isWinner: false,
    },
    {
      id: 4,
      name: "Tomas",
      score: 2,
      isCzar: false,
      isPlaying: true,
      isWinner: false,
    },
  ],
  messages: [
    { index: 1, name: "Nelson", message: "blegh" },
    { index: 2, name: "Filip", message: "Hola" },
    { index: 3, name: "Rolo", message: "Fajn" },
    { index: 4, name: "David", message: "Great" },
  ],
  round: {
    blackCard: {
      id: 1,
      text: "Does something do something",
      set: "1ed",
      whiteCardCount: 3,
    },
    stacks: [
      { id: 1, cards: [{ id: 1, text: "HEY THERE", set: "whoa" }] },
      { id: 2, cards: [{ id: 2, text: "STUFF AND THINGS", set: "whoa" }] },
      { id: 3, cards: [{ id: 3, text: "BLEGH", set: "whoa" }] },
    ],
  },
  timer: null,
};

const defaultPlayerView = {
  id: 1,
  hand: [
    { id: 2, text: "Card 1", set: "1ed" },
    { id: 3, text: "Card 2", set: "1ed" },
    { id: 4, text: "Card 3", set: "1ed" },
    { id: 5, text: "Card 4", set: "1ed" },
    { id: 7, text: "Card 6", set: "1ed" },
    { id: 8, text: "Card 7", set: "1ed" },
    { id: 9, text: "Card 8", set: "1ed" },
    { id: 10, text: "Card 9", set: "1ed" },
    { id: 11, text: "Card 10", set: "1ed" },
  ],
  stack: {
    id: 2,
    cards: [{ id: 6, text: "Card 5", set: "1ed" }],
  },
};

export default class GameStore {
  constructor({ dispatcher }, user) {
    dispatcher.onRequest({
      [A.GAME_CREATE]: (action) => {
        dispatcher.succeed(action);
        dispatcher.succeed(A.gameJoin(42));
      },
      [A.GAME_JOIN]: (action) => dispatcher.succeed(action),
      [A.GAME_SET_OPTIONS]: (action) => dispatcher.succeed(action),
      [A.GAME_START]: (action) => dispatcher.succeed(action),
      [A.GAME_SELECT_CARD]: (action) => dispatcher.succeed(action),
      [A.GAME_SELECT_STACK]: (action) => dispatcher.succeed(action),
      [A.GAME_SEND_MESSAGE]: (action) => dispatcher.succeed(action),
    });

    this.view$ = new BehaviorSubject(defaultView);
    this.player$ = new BehaviorSubject(defaultPlayerView);

    const isLoggedIn$ = user.details$.map((d) => d.isLoggedIn);

    this.opCreateGame$ = mapOp$(dispatcher.on$(A.GAME_CREATE), isLoggedIn$);

    this.opJoinGame$ = mapOp$(dispatcher.on$(A.GAME_JOIN));

    this.opSetOptions$ = mapOp$(
      dispatcher.on$(A.GAME_SET_OPTIONS),
      isLoggedIn$
    );

    this.opStart$ = mapOp$(dispatcher.on$(A.GAME_START), isLoggedIn$);

    const playerAndGame$ = Observable.combineLatest(this.view$, this.player$);

    this.opSelectCard$ = mapOp$(
      dispatcher.on$(A.GAME_SELECT_CARD),
      playerAndGame$.map(([game, player]) => {
        const ourPlayer = _.find(game.players, { id: player.id });
        return (
          ourPlayer && game.step == A.STEP_CHOOSE_WHITES && ourPlayer.isPlaying
        );
      })
    );

    this.opSelectStack$ = mapOp$(
      dispatcher.on$(A.GAME_SELECT_STACK),
      playerAndGame$.map(([game, player]) => {
        const ourPlayer = _.find(game.players, { id: player.id });
        return (
          ourPlayer && game.step == A.STEP_JUDGE_STACKS && ourPlayer.isCzar
        );
      })
    );

    this.opSendMessage$ = mapOp$(
      dispatcher.on$(A.GAME_SEND_MESSAGE),
      isLoggedIn$
    );
  }
}
