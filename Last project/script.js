function matrixGenerator(l) {
    var m = [];
    for (var i = 0; i < l; i++) {
        m[i] = [];
        for (var j = 0; j < l; j++) {
            var rand = random(0, 100);
            if (rand <= 30) {
                m[i][j] = 1;    
            } else if (rand > 30 && rand <= 50) {
                m[i][j] = 2;     
            } else if (rand > 50 && rand <= 60) {
                m[i][j] = 3;     
            } else if (rand > 60 && rand <= 70) {
                m[i][j] = 4;     
            } else if (rand > 70 && rand <= 80) {
                m[i][j] = 6;     
            } else if (rand > 80 && rand <= 90) {
                m[i][j] = 7;     
                }
            else {
                m[i][j] = 0;     
            }
        }
    }
    return m;
}

var matrix;

function setup() {
    matrix = matrixGenerator(20);
    frameRate(15);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
                console.log(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                PredatorArr.push(pr);
                console.log(pr);
            }
            else if (matrix[y][x] == 4) {
                var wbm = new waterBomb(x, y, 4);
                WaterBombArr.push(wbm);
                console.log(wbm);
            }
            else if (matrix[y][x] == 6) {
                var wa = new Water(x, y, 6);
                waterArr.push(wa);
                console.log(wa);
            }
            else if (matrix[y][x] == 7) {
                var sp = new Sponge(x, y, 7);
                spongeArr.push(sp);
                console.log(sp);
            }
            else if (matrix[y][x] == 8) {

            }
        }
    }
}









var waterArr=[];
var grassArr = [];
var grassEaterArr = [];
var PredatorArr = [];
var WaterBombArr=[];
var spongeArr=[];
var side = 30;





function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#157a35");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("#fdfa00");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("#b32222");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("#3437eb");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#3446eb");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#15537a");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill("yellowgreen");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in PredatorArr) {
        PredatorArr[i].eat();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in WaterBombArr) {
        WaterBombArr[i].move();
    }
      for (var i in spongeArr) {
        spongeArr[i].spongeEat();
    }

}
