var express = require("express");
var app = express();
var port = 3000;

app.get('/', function(request,response){
    response.send("GET");
});

app.listen(port, function(){
    console.log("Express at port :"+port);
});