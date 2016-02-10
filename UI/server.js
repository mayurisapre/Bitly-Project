var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.post('/longURL', function (req, res) {

	request.post({
		url: 'http://cpserver.elasticbeanstalk.com/shorten',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"longURL": req.body.longURL,
			"customFlag" : req.body.customFlag,
			"customURL" : req.body.customURL
		})
	}, function(error, response, body){
		if(error) {
	        console.log('Error happened: '+ error);
	    } else if(response.statusCode == 200) {
	        res.send(body);
	    } else {
	    	console.log(body);
	    }
	});
});

app.get('/analytics', function (req, res) {

	request.post({
		url: 'http://ec2-52-32-215-254.us-west-2.compute.amazonaws.com:5000/getAnalyticsData',
		headers: {
			'Content-Type': 'application/json'
		}
	}, function(error, response, body){
		if(error) {
	        console.log('Error happened: '+ error);
	    } else if(response.statusCode == 200) {
	        res.send(body);
	    } else {
	    	console.log(body);
	    }
	});
});

app.post('/analyticsByURL', function (req, res) {

	request.post({
		url: 'http://ec2-52-32-215-254.us-west-2.compute.amazonaws.com:5000/getAnalyticsDataByURL',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"shortURL": req.body.shortURL
		})
	}, function(error, response, body){
		if(error) {
	        console.log('Error happened: '+ error);
	    } else if(response.statusCode == 200) {
	        res.send(body);
	    } else {
	    	console.log(body);
	    }
	});
});

app.listen(process.env.PORT || 5000);
console.log("Server running on port 5000");
