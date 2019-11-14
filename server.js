//import the express library
var express = require("express");

//create an app that is an express object
var app = express();

//set port for heroku or local use
const port = process.env.PORT || 5000;

//Static files: don't change dynamically based on server.
//Use: allows the server to access these files.
app.use(express.static("public"));

//Param1: setting locatin of ____ Param2: located in directory ____
app.set("views", "views");
app.set("view engine", "ejs");


//Express get rule for restults page
app.get('/results', function(req, res) {
    console.log('recieved request for /results');
    var weight = '5lb';
    var type = 'letter';
    var params = {weight: weight, type: type};
    res.render("pages/pricing_result", params);
});

//Express get rule for /calculate_price
app.get('/get_price', function(req, res) {
    //Gather Item info
    var type = req.query.type;
    var weight= req.query.weight;
	var price = calculate_rate(type, weight);

	var params = {weight: weight, type: type, price: price};
    res.render("pages/pricing_result", params);
	
});

//Function to calculate the rate
function calculate_rate(type, weight){
	switch (type){
		case 'stamped_letter':
			return calculate_stamped_rate(weight);
		case 'metered_letter':
			return calculate_metered_rate(weight);
		case 'envelope':
			return calculate_envelope_rate(weight);
		case 'package':
			return calculate_package_rate(weight);
	}
}

//Stamped Letter Rates
function calculate_stamped_rate(weight){
	switch (true){
		case weight < 1:
			return '$0.55';
		case weight < 2:
			return '$0.70';
		case weight < 3:
			return '$0.85';
		case weight < Math.pow(3.5, 3):
			return '$1.00';
		default:
			return 'Your item is overweight';
	}
}
//Metered Letter Rates
function calculate_metered_rate(weight){
	switch (true){
		case weight < 1:
			return '$0.50';
		case weight < 2:
			return '$0.65';
		case weight < 3:
			return '$0.80';
		case weight < Math.pow(3.5, 3):
			return '$0.95';
		default:
			return 'Your item is overweight';
	}
}
//Large Envelope Rates
function calculate_envelope_rate(weight){
	switch (true){
		case weight < 1:
			return '$1.00';
		case weight < 2:
			return '$1.15';
		case weight < 3:
			return '$1.30';
		case weight < 4:
			return '$1.45';
		case weight < 5:
			return '$1.60';
		case weight < 6:
			return '$1.75';
		case weight < 7:
			return '$1.90';
		case weight < 8:
			return '$2.05';
		case weight < 9:
			return '$2.20';
		case weight < 10:
			return '$2.35';
		case weight < 11:
			return '$2.50';
		case weight < 12:
			return '$2.65';
		case weight < 13:
			return '$2.80';
		default:
			return 'Your item is overweight';
	}
}
//Package Rates
function calculate_package_rate(weight){
	switch (weight < x){
		case weight < 1: case weight < 2: case weight < 3: case weight < 4:
			return '$3.66';
		case weight < 5: case weight < 6: case weight < 7: case weight < 8:
			return '$4.39';
		case weight < 9: case weight < 10: case weight < 11: case weight < 12:
			return '$5.19';
		case weight < 13:
			return '$5.71';
		default:
			return 'Your item is overweight';
	}
}



//Listening 
app.listen(port, function() {
    console.log('the server is listening');
});