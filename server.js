var express = require('express');
var cors = require('cors');

var task_writer_server = express();

// This line decides the "port" where our web-server will be listening;
// We send requests to a specific port using the URL
var task_writer_server_port = 3000;

// This line supports "CORS" or Cross-Origin Resource Sharing
// It means our Qlik Sense extension might be running from a different URL than our web-server; 
// This makes our code more flexible 
task_writer_server.use(cors());

// This line "starts" our web-server, so that it's listening for requests
// The web-server must remain running to listen to requests; run it from your console (i.e. Windows command prompt? Linux bash) 
// change directories to the place this file is located; in our tutorial that location is:
//  > cd /c/task_writer_server 
// then run node, telling node the "entry point" to execute is this file server.js
// > node server.js
task_writer_server.listen(task_writer_server_port, function(){
    console.log('task_writer_server listening on port ' + task_writer_server_port);
});
