class waterBomb {
    constructor(x, y, index) {
        this.timeToWater = 50;
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 200;
        this.index = index;
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
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newx = newCell[0];
            var newy = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 4;
            this.x = newx;
            this.y = newy;
            console.log("bomb")



        }
        this.energy--;
        if (this.energy < 1) {
            this.detonate()
        }
    }






    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2)));
        if (this.multiply >= 1 && newCell) {
            var newWater = new Water(newCell[0], newCell[1], this.index);
            waterArr.push(newWater);
            matrix[newCell[1]][newCell[0]] = 6;
            this.multiply = 0;
        }
    }






    detonate() {
        this.timeToWater--;
        var newGrass = random(this.chooseCell(0).concat(this.chooseCell(1)).concat(this.chooseCell(2)).concat(this.chooseCell(3)).concat(this.chooseCell(6)));
        if (newGrass) {
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









