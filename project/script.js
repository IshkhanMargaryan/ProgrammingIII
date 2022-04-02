

    var socket = io();
function setup() {
    // matrix = matrixGenerator(20);
    frameRate(15);
    createCanvas(15 * side, 15 * side);
    background('#acacac');

    // socket.on("send data", createObject);
    // socket.on("send data", matrixGenerator);

}

// function seasons(){
//                 if (matrix[y][x] == 1) {
//                 if(weath=="winter"){
//                     fill("#ffffff");
//                 }
//                 else if(weath=="spring"){
//                     fill("#0be039");
//                 }
//                 else if(weath=="summer"){
//                     fill("#157a35");
//                 }
//                 else if(weath=="autumn"){
//                     fill("#e0670b");
//                 }
//                 rect(x * side, y * side, side, side);
//             }
// }



var side = 30;

var weath = 'winter';
socket.on("send matrix", drawn)
socket.on("weather", function (data)
{
    weath = data;
})
function drawn(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weath=="winter"){
                    fill("#ffffff");
                }
                else if(weath=="spring"){
                    fill("#0be039");
                }
                else if(weath=="summer"){
                    fill("#157a35");
                }
                else if(weath=="autumn"){
                    fill("#e0670b");
                }
                rect(x * side, y * side, side, side);
            }

            // if (matrix[y][x] == 1) {
            //     fill("#157a35");
            //     rect(x * side, y * side, side, side);
            // }
            
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                if(weath=="winter"){
                    fill("#fdfa00");
                }
                else if(weath=="spring"){
                    fill("#1a213b");
                }
                else if(weath=="summer"){
                    fill("#1b213b");
                }
                else if(weath=="autumn"){
                    fill("#99a0bd");
                }
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
    
}



// var express = require("express");
// var app = express();

// app.use(express.static("modules"));

// app.get("/", function(req, res){
//    res.redirect("index.html");
// });

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });