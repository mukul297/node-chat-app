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
    
    socket.emit('newMessage',{
        from : 'John',
        text : 'Well See you then.',
        createdAt: 123123
    });
    
    socket.on('createMessage',function(message){
        console.log('createMessage',message);
    });
    
    socket.on('disconnect',function(){
        console.log('User was disconnected');
    });
});

server.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Started");
});



