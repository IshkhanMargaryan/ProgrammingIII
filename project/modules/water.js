var LivingCreature = require("./livingcreature");

module.exports = class Water extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
    }

    chooseCell(character) {
        return super.chooseCell(character);
    }
}
