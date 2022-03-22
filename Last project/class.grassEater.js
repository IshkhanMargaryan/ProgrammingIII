class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 30;
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
        var newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            var newx = newCell[0];
            var newy = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 2;
            this.x = newx;
            this.y = newy;
            console.log(this.multiply);
        }

    }
    eat() {
        var newGrass = random(this.chooseCell(1));
        if (newGrass) {
            var newx = newGrass[0];
            var newy = newGrass[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 2;
            this.x = newx;
            this.y = newy;
            for (var i in grassArr) {
                if (newx == grassArr[i].x && newy == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.mul();
            this.move();
            this.energy--;
            if (this.energy < 1) {
                this.die()
            }


        }

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;

            }
        }
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 25 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;

        }
    }

}


