var path = require("path");
var http = require('http');
var express = require("express");
var socketIO = require('socket.io');



var publicPath = path.join(__dirname,"/../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log("New User Connected");
    
    socket.on('disconnect',function(){
        console.log('User was disconnected');
    });
});

server.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Started");
});



