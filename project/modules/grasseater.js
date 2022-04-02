var LivingCreature = require("./livingcreature");

module.exports = class GrassEater extends LivingCreature {
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
        //ERROR
        var emptyCells = this.chooseCell(0).concat(this.chooseCell(1))
        // var emptyCells1=this.chooseCell(1);
        // var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)].concat.emptyCells1[Math.floor(Math.random()*emptyCells1.length)];
        // var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)].concat(emptyCells1[Math.floor(Math.random()*emptyCells1.length)]);
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
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
        var emptyCells = this.chooseCell(1)
        var newGrass = emptyCells[Math.floor(Math.random()*emptyCells.length)];
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
            // this.mul();
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
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        if (this.multiply >= 25 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;

        }
    }

}


