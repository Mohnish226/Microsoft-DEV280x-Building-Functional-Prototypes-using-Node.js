var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

var quotes = [
    {
        id: 1,
        quote: "The best is yet to come",
        author: "Unknown",
        year: 2000
    },
    {
        id: 2,
        quote: "This is a quote",
        author: "First Last",
        year: 1930
    },
    {
        id: 3,
        quote: "This is another quote",
        author: "First2 Last2",
        year: 1910
    }
    ];

    
app.get('/',function(request,response){
    response.send("Get request received at '/'")
});

//Get quotes
app.get('/quotes', function(request, response){
    console.log("Get a list of all quotes as json");
    if(request.query.year){
        response.send("Quotes from year "+request.query.year);

    }
    else{
        response.json(quotes);
    }
});

//Get by ID
app.get('/quotes/:id', function(request,response) {
    console.log("return quote with the ID: " + request.params.id);
    response.send("Return quote with the ID: " + request.params.id);
});

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Post
app.post('/quotes', function(request, response){
    console.log("Insert a new quote :" + request.body.quote);
    response.json(request.body);
});

//Listener
app.listen(port, function(){
    console.log(port);
});