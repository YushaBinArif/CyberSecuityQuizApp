var express = require('express');
var bodyParser = require('body-parser')
var port = 3000;
var mysql = require('mysql');
    var connection = mysql.createConnection({
    host     : 'astmsqqa1201',
    user     : 'runningman',
    password : 'Cherry55',
    database : 'testdb'
    });

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

/*app.get('/endpoint', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';
	
	console.log('params: ' + JSON.stringify(req.params));
	console.log('body: ' + JSON.stringify(req.body));
	console.log('query: ' + JSON.stringify(req.query));
	
	res.header('Content-type','application/json');
	res.header('Charset','utf8');
	res.send(req.query.callback + '('+ JSON.stringify(obj) + ');');
});*/

app.post('/endpoint', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';	
    console.log('body: ' + JSON.stringify(req.body));
    connection.query(`SELECT UserId, UserName FROM testdb.usertable where UserName = '${req.body.email}' and UserPass  = '${req.body.password}';`, function (err, result, fields) {
        if (err) throw err;
        console.log('body: ' + JSON.stringify(result));
        res.setHeader('Access-Control-Allow-Origin', '*');	
        res.send(JSON.stringify(result));
        
    });
         
});

app.post('/login', function(req, res){
	var obj = {};
	obj.title = 'title';
	obj.data = 'data';	
    console.log('body: ' + JSON.stringify(req.body));
    connection.query(`SELECT UserId, UserName FROM testdb.usertable where UserName = '${req.body.email}' and UserPass  = '${req.body.password}';`, function (err, result, fields) {
        if (err) throw err;
        console.log('body: ' + JSON.stringify(result));
        res.setHeader('Access-Control-Allow-Origin', '*');	
        res.send(JSON.stringify(result));
        
    });
    
     
});


app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);

    
    connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
    });
});



// const express = require('express')
// const app = express()
// var bodyParser = require('body-parser')
// const port = 3000

// app.use(bodyParser.urlencoded({ extended: true }));



// //when positing the login page
// app.post('/login', function (req, response) {
//     console.log(req.body);
//     var userName = req.body.email;
//     var password = req.body.password;
  
//     var data = { result : "default"};
//     //Validate 
//         if( userName == ""|| password == ""){
//             response.statusCode = 404;
//             data = { result : "empty values : failed"};
//             console.log("empty values failed"); 
//             response.send(data)
//         }
//         else {
//             response.statusCode = 200;
//             response.send("success")
//         }            
       
  
//   });


