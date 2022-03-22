class Sponge {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 350;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var newCell = random(this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(6)));
        if (newCell) {
            var newx = newCell[0];
            var newy = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 7;
            this.x = newx;
            this.y = newy;
            console.log("sponge")
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in spongeArr) {
            if (this.x == spongeArr[i].x && this.y == spongeArr[i].y) {
                spongeArr.splice(i, 1);
                break;

            }
        }
    }
    spongeEat() {
        var newWater = random(this.chooseCell(6));
        if (newWater) {
            var newx = newWater[0];
            var newy = newWater[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 7;
            this.x = newx;
            this.y = newy;
            for (var i in waterArr) {
                if (newx == waterArr[i].x && newy == waterArr[i].y) {
                    waterArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 1) {
                this.die();
                console.log("death");
            }
        }

    }
   
}
