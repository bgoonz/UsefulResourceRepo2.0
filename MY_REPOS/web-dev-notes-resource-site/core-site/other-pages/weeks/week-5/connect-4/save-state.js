export class GameJsonSerializer {
    constructor(game) {
        this.game = game;
    }

    serialize() {
        // let currentIndexes = [
        //     [1, 2, 3, 4, 5],
        //     [1, 2, 3, 4, 5],
        //     [1, 2, 3, 4, 5],
        //     [1, 2, 3, 4, 5],
        //     [1, 2, 3, 4, 5],
        //     [1, 2, 3, 4, 5],
        //     [1, 2, 3, 4, 5]
        // ]
        let currentIndexes = [5, 5, 5, 5, 5, 5, 5];
        let instructions = [];
        let valueToLookFor = 1;
        for (let columnIndex = 0; columnIndex < something; columnIndex++) {
            let rowIndex = currentIndexes[columnIndex];
        }
        // return JSON.stringify(this.game);
    }


}

export class GameJsonDeSerializer {
    constructor(gameStr) {
        this.gameStr = gameStr;
    }

    deSerialize() {
        return JSON.parse(this.gameStr);
    }
}
