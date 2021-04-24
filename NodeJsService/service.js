const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'astmsqqa1201',
    user     : 'runningman',
    password : 'Cherry55',
    database : 'testdb'
    });
    
    connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
    });
});


