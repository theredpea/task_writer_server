var express = require('express');
var cors = require('cors');
var fs = require('fs');

var task_writer_server = express();

// This line decides the "port" where our web-server will be listening;
// We send requests to a specific port using the URL
var task_writer_server_port = 3000;

// This line supports "CORS" or Cross-Origin Resource Sharing
// It means our Qlik Sense extension might be running from a different URL than our web-server; 
// This makes our code more flexible 
task_writer_server.use(cors());
task_writer_server.use(express.json());

task_writer_server.get('/task_writer_server', function (req, res) {
    console.log('received GET request');
});

task_writer_server.post('/task_writer_server', function (req, res) {
    console.log('received POST request');

    // instead of using JSON.stringify, which converts a Javascript object to a JSON format suitable to write to file;
    // we'll create our own csv_stringify function, which converts a Javascript object to *CSV* format suitable to write to file
    csv_stringify = function (task_selected_by_id) {
        // task_selected_by_id could look like this, with key-value pairs:
        // its keys are strings corrseponding to some unique ID column in your original Qlik Sense data set; i.e. "2"|"3"
        //  - later our variable will be called: `key__id_val`
        // and its values are booleans; true/false to reflect whether the task is selected; i.e. had its box "checked". 
        //  - later our variable will be called: `value__is_selected_val`
        // {"2":true,"3":false,"4":false}

        //comma-separated column headers;
        var col_headers = 'ID,Selected';

        var rows = '';

        //Loop through each ID value; "2", then "3"...
        for (var key__id_val in task_selected_by_id) {

            var value__is_selected_val = task_selected_by_id[key__id_val];
            //Join the key "2" together with the value "true"; the value will become the CSV row : '2,true'
            rows = rows + key__id_val + ',' + value__is_selected_val;
            //\n represents a line break
            rows = rows + '\n';
        }

        //Join the headers and rows; separated by a line break
        var csv_file_contents =  col_headers + '\n' + rows;

        return csv_file_contents;

    }

    //Change file extension to .csv
    fs.writeFile("./task_selected_by_id.csv", csv_stringify(req.body), function (err) {

    });
});

// This line "starts" our web-server, so that it's listening for requests
// The web-server must remain running to listen to requests; run it from your console (i.e. Windows command prompt? Linux bash) 
// change directories to the place this file is located; in our tutorial that location is:
//  > cd /c/task_writer_server 
// then run node, telling node the "entry point" to execute is this file server.js
// > node server.js
task_writer_server.listen(task_writer_server_port, function () {
    console.log('task_writer_server listening on port ' + task_writer_server_port);
});
