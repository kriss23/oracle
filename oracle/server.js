var express = require('express')
var bodyParser = require('body-parser')

var timecode = 0
var is_timeout_running = false


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var timeoutMethod = function () {
    timecode += 1
    setTimeout(timeoutMethod, 1000);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var app = express()

app.use(bodyParser.json())

app.get('*', function(req, res, next){
    next();
});

app.get('/', function(req, res) {
    res.sendfile('app/index.html')
})

app.get('/getLastMessage/', function(req, res) {
    var fs = require('fs');
    var timecodes_json = JSON.parse(fs.readFileSync('timecodes.json', 'utf8'));
    var last_message = {}

    for (var i = 0; i < timecodes_json.msg.length; i++) {
        if (timecodes_json.msg[i].timecode <= timecode){
            last_message = timecodes_json.msg[i]
        }
    }

    res.json({
        'result': 'success',
        'timecode': timecode,
        'msg': {
            'data':  last_message
        }
    });
    res.end()
})

app.get('/start/', function(req, res) {
    /*
    var fs = require('fs');
    var json_response = JSON.parse(fs.readFileSync('demo_data/broadcasters.json', 'utf8'));
    */

    if (!is_timeout_running){
        is_timeout_running = true
        setTimeout(timeoutMethod, 1000);
    }

    var json_response = {
        "state": "started",
        "data": "restarted from " + timecode
    }
    timecode = 0

    res.json(json_response);
    res.end()

})

app.get("/*",function(req,res){
    console.log("Requesting: " + req.path)
  res.sendfile('./'+req.path);
});


app.listen(3000, function(){
    console.log('Server listening on', 3000)
});
