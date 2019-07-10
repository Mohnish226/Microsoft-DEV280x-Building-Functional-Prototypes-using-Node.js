var http = require('http');
var port = 3000

var requestHandler = function (request,response) {
    console.log("New Request from"+request.url);
    response.end("Test");
}

var server = http.createServer(requestHandler);

server.listen(port,function(){
    console.log("Listening on "+ port);
});