class Predator {
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
        var newCell = random(this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2)));
        if (newCell) {
            var newx = newCell[0];
            var newy = newCell[1];

            if (matrix[newy][newx] == 1) {
                matrix[this.y][this.x] = 1;

            } else {
                matrix[this.y][this.x] = 0;

            }
            matrix[newy][newx] = 3;
            this.x = newx;
            this.y = newy;
            console.log(this.multiply);




        }

    }
    eat() {
        var newGrassEater = random(this.chooseCell(2));
        if (newGrassEater) {
            var newx = newGrassEater[0];
            var newy = newGrassEater[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 3;
            this.x = newx;
            this.y = newy;
            for (var i in grassEaterArr) {
                if (newx == grassEaterArr[i].x && newy == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
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
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;

            }
        }
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 15 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;

        }
    }

}












