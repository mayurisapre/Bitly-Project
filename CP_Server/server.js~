var express  = require('express'),
	bodyParser = require('body-parser'),
	request = require('request');
var app      = express();
var aws      = require('aws-sdk');
var queueUrl = "https://sqs.us-west-2.amazonaws.com/060340690398/Team8_Db_Worker";
var receipt  = "";

aws.config.loadFromPath(__dirname + '/config.json');

app.use(bodyParser.json());
// Instantiate SQS.
var sqs = new aws.SQS();
app.post('/shorten', function shorten(req,res)
{
        console.log(req.body);
	console.log(req.body.longURL);
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
        }
        console.log("Inside shortening");
        console.log(randomstring);
	var shortURL = "http://nanourl.elasticbeanstalk.com/" + randomstring;

	var messageBody = {
	longURL : req.body.longURL,
	shortURL: randomstring	
	};
        //Code to send req.body and randomstring to SQS
        //send shorten url to 
        var params = {
        MessageBody: JSON.stringify(messageBody),
        QueueUrl: queueUrl,
        DelaySeconds: 0
    	};

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            res.send(err);
        }
        else {
            //res.send(data);
        }
    });
    res.send(shortURL);
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
