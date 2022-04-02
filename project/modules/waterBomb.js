var LivingCreature = require("./livingcreature");
let Water = require('./water')
module.exports = class waterBomb extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.timeToWater = 50;
        this.energy = 200;
        this.directions = [];
        this.multiply = 0;
        this.health = 280;
        
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
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        if (newCell) {
            var newx = newCell[0];
            var newy = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 4;
            this.x = newx;
            this.y = newy;
        }
        this.energy--;
        if (this.energy < 1) {
            this.detonate()
        }
    }


    mul() {
        this.multiply++;
        //SOLVED?
        var emptyCells=this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2));
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];        
        if (this.multiply >= 1 && newCell) {
            var newWater = new Water(newCell[0], newCell[1], this.index);
            waterArr.push(newWater);
            matrix[newCell[1]][newCell[0]] = 6;
            this.multiply = 0;
        }
    }






    detonate() {
        this.timeToWater--;
        //SOLVED?
        var emptyCells=this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(6));
        var newGrass = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        if (newGrass) {
            console.log("everything is fine");
            var newx = newGrass[0];
            var newy = newGrass[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 5;
            this.x = newx;
            this.y = newy;

        }
        if (this.timeToWater <= 0) {
            this.mul();
            console.log("Water")
            matrix[newy][newx] = 6;
        }
        if (this.health <= 1) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in WaterBombArr) {
            if (this.x == WaterBombArr[i].x && this.y == WaterBombArr[i].y) {
                WaterBombArr.splice(i, 1);
                break;

            }
        }
    }
}









