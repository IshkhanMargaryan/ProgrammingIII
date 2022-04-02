var LivingCreature = require("./livingcreature");

module.exports = class Grass extends LivingCreature {
   
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        if (this.multiply >= 10 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }


}



