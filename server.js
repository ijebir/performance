// server connection:
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var http = require('http');
var app = require('./app.js');

var server = http.createServer(app);
var io = require('socket.io').listen(server);

// mongolab database:
var mongoose = require('mongoose');
var dbuser = 'testuser';
var dbpass = 'testpassword';
mongoose.connect('mongodb://'+dbuser+':'+dbpass+'@ds061731.mongolab.com:61731/test-ijebir');
var db = mongoose.connection;

// client connects:
io.sockets.on('connection', function(socket){
  var socketID = socket.id;
});

server.listen(port, ipaddress, function(){
    console.log((new Date()) + ' Server is listening on port 3000');
});
console.log("Listening to " + ipaddress + ":" + port + "...");