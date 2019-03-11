var path = require("path");
var http = require('http');
var express = require("express");
var socketIO = require('socket.io');
var {generateMessage,generateLocationMessage} = require("./utils/message.js");


var publicPath = path.join(__dirname,"/../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log("New User Connected");
    
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
    
    
    socket.on('createMessage',function(message,callback){
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from the server.');
        // socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
    });
    
    socket.on('createLocationMessage',function(coords){
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
    
    socket.on('disconnect',function(){
        console.log('User was disconnected');
    });
});

server.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Started");
});



