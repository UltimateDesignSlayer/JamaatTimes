/**
 * Fire up Node server.
 * We're matching up the URL to the html file name. Not using Express at all,
 * just keeping it simple.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var events = require('events');
var ee = new events.EventEmitter();

var port = 1234;

http.createServer(function(request, response){
  var urlPath = url.parse(request.url).pathname;

  console.log('Path requested :: ' + urlPath);

  if(urlPath === '/'){
		urlPath = '/index.html';
	}

  fs.readFile(urlPath.substr(1), function(error, fileData){
    if (error){
      console.log('File not found :: ', error.stack);
    }
    else{
      response.writeHead(200); //Repond with OK
      response.write(fileData.toString());
    }

    response.end();

  });

}).listen(port);

ee.on('activitySelect', function(event, data){
  alert("HERE");
});
