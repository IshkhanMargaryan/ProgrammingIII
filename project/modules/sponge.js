var LivingCreature = require("./livingcreature");

module.exports = class Sponge extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 350;        
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
        //SOLVED?
        var emptyCells = this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(6));
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        if (newCell) {
            var newx = newCell[0];
            var newy = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 7;
            this.x = newx;
            this.y = newy;
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
        var emptyCells = this.chooseCell(6);
        var newWater = emptyCells[Math.floor(Math.random()*emptyCells.length)];
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
            }
        }

    }
   
}
