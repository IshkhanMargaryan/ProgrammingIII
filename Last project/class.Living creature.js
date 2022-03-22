class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;

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
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 10 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }


}





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












class Water {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;

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
}




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






