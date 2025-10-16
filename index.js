// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
	res.json({ greeting: 'hello API' });
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
	const { date: dateParam } = req.params;

	let date;

	if (!dateParam) {
		// No param → current time
		date = new Date();
	} else if (/^\d+$/.test(dateParam)) {
		// All digits → treat as UNIX timestamp
		// Handle both seconds and milliseconds
		let ts = Number(dateParam);
		if (dateParam.length <= 10) ts *= 1000; // seconds → ms
		date = new Date(ts);
	} else {
		// Date string
		date = new Date(dateParam);
	}

	// Invalid date handling
	if (isNaN(date.getTime())) {
		return res.json({ error: "Invalid Date" });
	}

	// Success
	res.json({
		unix: date.getTime(),
		utc: date.toUTCString()
	});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
