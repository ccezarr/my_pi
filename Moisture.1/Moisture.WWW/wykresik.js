var express = require ("express");
var mysql = require("mysql");
var connection = mysql.createConnection ({
	host : 'localhost',
	user : 'monitor',
	password : 'password',
	database : 'pomiary'
});

var globalResponse;
var app = express();

connection.connect(function(err){
if(!err) {
	console.log ("Database is connected ... nn");
} else {
	console.log ("Error connecting database ... nn");
	console.log(err);
}
});

app.get("/", function(req,res){
globalResponse=res;
connection.query('SELECT * from moisture LIMIT 100', function (err,rows,fields) {
globalResponse.writeHeader(200, {'Content-Type': 'text/html'});  
if (!err)
{
	console.log('The solution is: ',rows);
	globalResponse.write('The solution is:' + '<br/>');
	for (var i = 0; i< rows.length; i++)
	{
		var row = rows[i];
		globalResponse.write(row.tdate.toString());
		globalResponse.write(row.ttime.toString());
		globalResponse.write(row.moisture.toString());

		globalResponse.write('<br/>');
	}
}
else
{
	console.log('Error while performing query.');
}
globalResponse.end(); 
});
});

app.listen(8000);


/*

var http = require('http'),
//	window = require('chart.js'),
    fs = require('fs');

    http.createServer(
	function(request, response) 
	{ 
		fs.readFile('wykresik.html', 'utf-8',  function (err, html) 
		{
    			if (err) 
			{
        			throw err; 
    			}        
        		response.writeHeader(200, {'Content-Type': 'text/html'});  
        		response.write(html);
			console.log(err);
			console.log ('file loaded.');
			console.log(html.toString('utf-8'));
        		response.end();  
		})
    	}).listen(8000);




*/