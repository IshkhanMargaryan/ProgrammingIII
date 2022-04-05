var LivingCreature = require("./livingcreature");

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 30;
        
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
        return super.chooseCell(character);
    }

    move() {
        //SOLVED
        var emptyCells=this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2));
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
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




        }

    }
    eat() {
        var emptyCells = this.chooseCell(2)
        var newGrassEater = emptyCells[Math.floor(Math.random()*emptyCells.length)];
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
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        if (this.multiply >= 15 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;

        }
    }

}












