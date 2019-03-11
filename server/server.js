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
            from : 'Admin',
            text : 'Welcome to the chat App',
            createdAt: new Date().getTime()
        });
        
        socket.broadcast.emit('newMessage',{
            from : 'Admin',
            text : 'New User joined',
            createdAt: new Date().getTime()
        });
    
    
    socket.on('createMessage',function(message){
        console.log('createMessage',message);
        
        // io.emit('newMessage',{
        //   from : message.from,
        //   text : message.text,
        //   createdAt: new Date().getTime()
        // });
        
        socket.broadcast.emit('newMessage',{
            from : message.from,
            text : message.text,
            createdAt: new Date().getTime()
        });
        
    });
    
    socket.on('disconnect',function(){
        console.log('User was disconnected');
    });
});

server.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Started");
});



