class Coin {
    constructor({ x, y }) {
        this.r = 0.5;
        this.x = x + this.r / 2;
        this.y = y + this.r / 2;
    }

    show() {
        fill("gold");
        rect(this.x * SCALE, this.y * SCALE, this.r * SCALE);
    }

    static nextRandom(snake) {
        let y, x;
        do {
            y = Math.random() * HEIGHT;
            x = Math.random() * WIDTH;

            y = Math.floor(y);
            x = Math.floor(x);
            // debugger;
        } while (snake.matrix[y][x] !== Game.BLANK);

        return { y, x };
    }
}