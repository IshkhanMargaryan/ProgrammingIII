var weath="winter";
var Grass = require("./modules/grass.js");
var GrassEater = require("./modules/grassEater.js");
var Predator = require("./modules/predator.js");
var Sponge = require("./modules/sponge.js");
var Water = require("./modules/water.js");
var waterBomb = require("./modules/waterBomb.js");


var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

waterArr = [];
grassArr = [];
grassEaterArr = [];
PredatorArr = [];
WaterBombArr = [];
spongeArr = [];
matrix = [];
//CHANGING RANDOM EVERYWHERE
function matrixGenerator(l) {
    for (var i = 0; i < l; i++) {
        matrix[i] = [];
        for (var j = 0; j < l; j++) {
            var rand = Math.floor(Math.random() * (100 - 0) + 0);
            if (rand <= 30) {
                matrix[i][j] = 1;
            } else if (rand > 30 && rand <= 50) {
                matrix[i][j] = 2;
            } else if (rand > 50 && rand <= 60) {
                matrix[i][j] = 3;
            } else if (rand > 60 && rand <= 70) {
                matrix[i][j] = 4;
            } else if (rand > 70 && rand <= 80) {
                matrix[i][j] = 6;
            } else if (rand > 80 && rand <= 90) {
                matrix[i][j] = 7;
            }
            else {
                matrix[i][j] = 0;
            }
        }
    }

}

matrixGenerator(50);


function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                PredatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var wbm = new waterBomb(x, y, 4);
                WaterBombArr.push(wbm);
            }
            else if (matrix[y][x] == 6) {
                var wa = new Water(x, y, 6);
                waterArr.push(wa);
            }
            else if (matrix[y][x] == 7) {
                var sp = new Sponge(x, y, 7);
                spongeArr.push(sp);
            }
            else if (matrix[y][x] == 8) {

            }
        }
    }
}
io.sockets.emit("send matrix", matrix);
function game() {
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
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000);


function kill() {
    waterArr = [];
    grassArr = [];
    grassEaterArr = [];
    PredatorArr = [];
    WaterBombArr = [];
    spongeArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}





io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);

});

var fs= require('fs');
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Predator = PredatorArr.length;
    statistics.water = waterArr.length;
    statistics.waterBomb = WaterBombArr.length;
    statistics.sponge = spongeArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)

