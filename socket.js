var socketio = require('socket.io');
var five = require("johnny-five");
var myBoard, led1, led2, led3;

myBoard = new five.Board();
myBoard.on("ready", function() {

  led1 = new five.Led(2);
  led2 = new five.Led(3);
  led3 = new five.Led(4);

  // try "on", "off", "toggle", "strobe", "stop" (stops strobing)
});

var socket = function (server) {
    var io = socketio.listen(server);
	
    io.on('connection', function (socket) {

        socket.on('led1', function (data) {
			if (data == 'on') {
				led1.on();
				console.log("led1 on");
			} else {
				led1.off();
				console.log("led1 off");
			}
        });
        socket.on('led2', function (data) {
			if (data == 'on') {
				led2.on();
				console.log("led2 on");
			} else {
				led2.off();
				console.log("led2 off");
			}
        });
		socket.on('led3', function (data) {
			if (data == 'on') {
				led3.on();
				console.log("led3 on");
			} else {
				led3.off();
				console.log("led3 off");
			}
        });
		socket.on('disconnect', function () {
            console.log('disconnect');
        });
    });
}

module.exports = socket;