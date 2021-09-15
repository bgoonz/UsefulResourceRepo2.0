const chai = require("chai");
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

const HanoiGame = require("../hanoi/hanoi-game.js");

describe("HanoiGame", () => {
  let game;
  beforeEach("set up a new HanoiGame instance", () => {
    game = new HanoiGame();
  });

  describe("HanoiGame Constructor", () => {
    it('should have a "towers" property', () => {
      expect(game).to.have.property("towers");
    });

    context("initialized with an argument", () => {
      it("should set the towers property to the incoming argument", () => {
        const gameWithSetTowers = new HanoiGame([[], [3, 2, 1], []]);

        expect(gameWithSetTowers.towers).to.eql([[], [3, 2, 1], []]);
      });
    });

    context("initialized without an argument", () => {
      it("should set the towers property to a default game with the three disks in the first tower", () => {
        expect(game.towers).to.eql([[3, 2, 1], [], []]);
      });
    });
  });

  describe("prototype.isValidMove(startTowerIdx, endTowerIdx)", () => {
    context("with a valid move", () => {
      it("should return true if endTowerIdx indicates an empty tower", () => {
        const gameWithEmptyTowers = new HanoiGame([[1, 2, 3], [], []]);
        // Move a block on tower 0 to tower 1
        expect(gameWithEmptyTowers.isValidMove(0, 1)).to.be.true;
        // Move a block on tower 0 to tower 2
        expect(gameWithEmptyTowers.isValidMove(0, 2)).to.be.true;
      });

      it("should ensure that the last disk value in the starting tower is smaller than the last disk value in the ending tower", () => {
        const gameWithFullTowers = new HanoiGame([[1], [2], [3]]);
        // Move a block on tower 0 to tower 1
        expect(gameWithFullTowers.isValidMove(0, 1)).to.be.true;
        // Move a block on tower 0 to tower 2
        expect(gameWithFullTowers.isValidMove(0, 2)).to.be.true;
        // Move a block on tower 1 to tower 2
        expect(gameWithFullTowers.isValidMove(1, 2)).to.be.true;
      });
    });

    context("with a invalid move", () => {
      it("should return false when the start tower and end tower are the same tower", () => {
        // Move a block from tower 0 to tower 0
        expect(game.isValidMove(0, 0)).to.be.false;
        // Move a block from tower 1 to tower 1
        expect(game.isValidMove(1, 1)).to.be.false;
        // Move a block from tower 2 to tower 2
        expect(game.isValidMove(2, 2)).to.be.false;
      });

      it("should return false when the first argument indicates an empty tower", () => {
        const gameWithEmptyTowers = new HanoiGame([[1, 2, 3], [], []]);
        // Move a block from tower 1 to tower 0
        expect(gameWithEmptyTowers.isValidMove(1, 0)).to.be.false;
        // Move a block from tower 2 to tower 0
        expect(gameWithEmptyTowers.isValidMove(2, 0)).to.be.false;
      });

      it("should return false when the second argument indicates a tower that doesn't exist", () => {
        // Move to block from tower 1 to tower 3
        expect(game.isValidMove(1, 3)).to.be.false;
        // Move a block from tower 1 to tower 5
        expect(game.isValidMove(1, 5)).to.be.false;
        // Move a block from tower 1 to tower 1000
        expect(game.isValidMove(1, 1000)).to.be.false;
      });

      it("should return false when the first argument indicates a tower that doesn't exist", () => {
        // Move a block from tower 3 to tower 1
        expect(game.isValidMove(3, 1)).to.be.false;
        // Move a block from tower 3 to tower 1
        expect(game.isValidMove(5, 1)).to.be.false;
        // Move a block from tower 3 to tower 1
        expect(game.isValidMove(1000, 1)).to.be.false;
      });

      it("should be an invalid move when you try to move a larger block on top of a smaller block", () => {
        const gameWithSetTowers = new HanoiGame([[3], [1], [2]]);
        // Move a block from tower 0 to tower 1
        expect(gameWithSetTowers.isValidMove(0, 1)).to.be.false;
        // Move a block from tower 0 to tower 2
        expect(gameWithSetTowers.isValidMove(0, 2)).to.be.false;
        // move a block from tower 2 to tower 1
        expect(gameWithSetTowers.isValidMove(2, 1)).to.be.false;
      });
    });

    describe("prototype.move(startTowerIdx, endTowerIdx)", () => {
      it("calls the prototype.isValidMove method", () => {
        let validMoveSpy = chai.spy.on(game, "isValidMove");
        game.move(0, 1);
        expect(validMoveSpy).to.have.been.called.once;
      });

      context("with a valid move", () => {
        it("should remove the last disk of the starting tower", () => {
          game.move(0, 1);
          expect(game.towers[0]).to.eql([3, 2]);
        });

        it("should remove the last disk of the starting tower and move that disk to be the last value of the ending tower", () => {
          // these are two separate moves but since they happen within the same
          // it block they will be a continuation of moves on the same game
          game.move(0, 1);
          expect(game.towers[0]).to.eql([3, 2]);
          expect(game.towers[1]).to.eql([1]);

          game.move(0, 2);
          expect(game.towers[0]).to.eql([3]);
          expect(game.towers[2]).to.eql([2]);
        });

        it("should return true if the move was successfully made", () => {
          expect(game.move(0, 1)).to.be.true;
        });
      });

      context("with an invalid move", () => {
        it("should return false if the move was not successfully made", () => {
          expect(game.move(0, 0)).to.be.false;
          expect(game.move(0, 3)).to.be.false;
          expect(game.move(1, 2)).to.be.false;
        });
      });
    });
  });

  describe("prototype.isWon", () => {
    context("with a winning game", () => {
      it("should return true if all the disks have been moved into the second tower", () => {
        let gameWinTowerTwo = new HanoiGame([[], [3, 2, 1], []]);
        expect(gameWinTowerTwo.isWon()).to.be.true;
      });

      it("should return true if all the disks have been moved into the third tower", () => {
        let gameWinTowerThree = new HanoiGame([[], [], [3, 2, 1]]);
        expect(gameWinTowerThree.isWon()).to.be.true;
      });
    });

    context("with a game that is not yet won", () => {
      it("should return false if a game is not won", () => {
        let notWin1 = new HanoiGame([[3], [2], [1]]);
        let notWin2 = new HanoiGame([[3], [2, 1], []]);
        let notWin3 = new HanoiGame([[3, 2, 1], [], []]);
        expect(notWin1.isWon()).to.be.false;
        expect(notWin2.isWon()).to.be.false;
        expect(notWin3.isWon()).to.be.false;
      });
    });
  });
});
