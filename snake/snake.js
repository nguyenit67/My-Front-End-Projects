const Game = {
    WALL: -1,
    BLANK: 0,
    SNAKE: 1,
    COIN: 2,
};

function get2Darr(w, h) {
    return Array(HEIGHT).fill()
        .map(() => Array(WIDTH).fill(0));
}

class Snake {
    constructor() {
        this.parts = [
            { x: 1, y: 1 },
            // { x: 2, y: 1 },
            // { x: 3, y: 1 },
            // { x: 4, y: 1 },
            // { x: 5, y: 1 },
            // { x: 6, y: 1 },
            // { x: 7, y: 1 },
            // { x: 8, y: 1 },
            // { x: 9, y: 1 },
        ]; // .reverse();

        this.direction = null;
        this.matrix = null;
        this.targetedCoin = null;
        this.renderedCoin = null;

        this.show();
        this.makeACoin();
    }
    makeACoin() {
        let cp = Coin.nextRandom(this);
        this.targetedCoin = cp;
        this.renderedCoin = new Coin(cp);
    }

    move() {
        if (this.direction == null) {
            return;
        }
        const head = this.parts[0];
        const move = MOTIVEC_DIRS[this.direction];
        let xNext = head.x + move.x;
        let yNext = head.y + move.y;
        let newPos = { x: xNext, y: yNext };
        // if (true) {
        if (this.matrix[yNext][xNext] !== Game.COIN) {
            this.parts.pop();
        } else {
            beep();
            this.makeACoin();
        }
        this.parts.unshift(newPos);
    }

    show() {
        fill("red");
        this.matrix = get2Darr(WIDTH, HEIGHT);
        let cp = this.targetedCoin;
        if (cp) {
            this.matrix[cp.y][cp.x] = Game.COIN;
        }
        for (const pos of this.parts) {
            rect(pos.x * SCALE, pos.y * SCALE, SCALE);
            this.matrix[pos.y][pos.x] = Game.SNAKE;
        }
        // console.log(
        //     this.parts
        //         .map(p => JSON.stringify(p))
        //         .toString()
        // );
    }
}