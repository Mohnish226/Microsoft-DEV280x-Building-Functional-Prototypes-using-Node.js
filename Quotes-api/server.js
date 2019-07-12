var express = require('express');
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database("quotes.db");
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
    if(request.query.year){
        db.all("SELECT * FROM Quotes WHERE year = ?",request.query.year, function(err, rows){
            if(err){
                response.send(err.message);
            }
            else{
                console.log("Return a list of quotes from the year: " + request.query.year);
                // console.log(request.query.year);
                // console.log(rows);
                response.json(rows);
            }
        });
    }
    else{
        db.all('SELECT * FROM Quotes', function processRows(err, rows){
            if(err){
                response.send(err.message);
            }
            else{
                for( var i = 0; i < rows.length; i++){
                    console.log(rows[i].quote);
                }
                response.json(rows);
            }
        });
    }
});

//Get by ID
app.get('/quotes/:id', function(request,response) {
    console.log("return quote with the ID: " + request.params.id);
    // response.send("Return quote with the ID: " + request.params.id);
    db.get("SELECT * FROM QUOTES WHERE rowid = ?",request.params.id,function(err,rows){
        if(err){
            console.log(err.message);
        }
        else{
            response.json(rows);
        }
    });
});

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Post
app.post('/quotes', function(request, response){
    console.log("Insert a new quote :" + request.body.quote);
    // response.json(request.body);
    db.run('INSERT INTO quotes VALUES (?, ?, ?)', [request.body.quote, request.body.author, request.body.year], function(err){
        if(err){
            console.log(err.message);
        }
        else{
            response.send('Inserted quote with id: ' + this.lastID);
        }
    });
});

//Listener
app.listen(port, function(){
    console.log(port);
});