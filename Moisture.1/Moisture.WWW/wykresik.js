var express = require ("express");
var mysql = require("mysql");
var https = require("https");
var connection = mysql.createConnection ({
	host : 'localhost',
	user : 'monitor',
	password : 'password',
	database : 'pomiary'
});

var globalResponse;
var app = express();

app.use('/graph', express.static('graph'));
//app.use('/charts', express.static('node_modules/chart.js/src/charts'));
app.use('/charts', express.static('node_modules/chart.js'));

connection.connect(function(err){
if(!err) {
	console.log ("Database is connected ... nn");
} else {
	console.log ("Error connecting database ... nn");
	console.log(err);
}
});

app.get("/", function(req, response){
	fs = require('fs');
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
			//console.log(html.toString('utf-8'));
        		response.end();  
		})
});

app.get('/kwiatek', function(req,res){
	var Client = require('node-rest-client').Client;
	var client = new Client();
	client.get("http://localhost:8000/last100", function (data, response) {
		console.log('Data received through REST');
		console.log('Read: ' + data.length.toString());
		fs = require('fs');	
		fs.readFile('wykresik_data.html', 'utf-8',  function (err, html) 
		{
			var dataString = '[';
			var labelsString = '[';

			for (var i=data.length-1; i>=0; i--)
			{
				if (i<data.length-1)
				{
					dataString = dataString + ",";
					labelsString = labelsString + ",";
				}
				labelsString = labelsString + '\"' + data[i].ttime.toString() + '\"';
				dataString = dataString + '\"' + data[i].moisture.toString() + '\"';
			}
			var dataString = dataString + ']';
			//console.log(dataString);	
			var labelsString = labelsString + ']';
			//console.log(labelsString);

			var dataString2 = "[";
			for (var i=0; i< data.length; i++)
			{
				if (i>0) dataString2 = dataString2 + ",";
				dataString2 = dataString2 + "{ x: " +
					i + ", y: " +
					data[i].moisture + "}";
			
			}
			dataString2 = dataString2 + "]";
			//console.log(dataString2);

			var htmlToSend = html.toString();
			htmlToSend = htmlToSend
				.replace('{{{labels}}}',labelsString)
				.replace('{{{data}}}', dataString)
				.replace('{{{labels2}}}',labelsString)
				.replace('{{{data2}}}', dataString2);
    			if (err) 
			{
        			throw err; 
    			}        
        		res.writeHeader(200, {'Content-Type': 'text/html'});  
        		res.write(htmlToSend);
			if (err != null) console.log(err);
			console.log ('file loaded.');
        		res.end();  
		})	});
});


app.get("/last100", function(req,res){
globalResponse=res;
connection.query('SELECT * from moisture ORDER BY tdate DESC, ttime DESC LIMIT 250', function (err,rows,fields) {
//globalResponse.writeHeader(200, {'Content-Type': 'text/html'});  
if (!err)
{
	//console.log('The solution is: ',rows);
	globalResponse.status(200).json(rows);
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
			//console.log(html.toString('utf-8'));
        		response.end();  
		})
    	}).listen(8000);




*/