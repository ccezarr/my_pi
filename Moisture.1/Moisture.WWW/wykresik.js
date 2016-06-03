var http = require('http'),
	chart = require('chart.js'),
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


