var path = require("path");
var express = require("express");
var app = express();
var publicPath = path.join(__dirname,"/../public");

app.use(express.static(publicPath));

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is Started");
});



