/**
 * Class: CST-336
 * Lab 5: Express, Embedded JavaScript (EJS), Request, and MySQl
 * Authors:
 * - Victor Ramirez
 **/
// import lib
const request = require('request');

module.exports = {
	/*
	    Return random image URLs from an API
	    @param string keyword - search term
	    @param int imageCount - number of random images
	    @return array or image URLs
	*/
	getRandomImages_cb: function (keyword, imageCount, callback) {

		var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

		request(requestURL, function (error, response, body) {
			if (!error) {
				var parseData = JSON.parse(body);

				var imageURLs = [];

				for (let i = 0; i < imageCount; i++) {

					imageURLs.push(parseData[i].urls.regular);
				} // for

				//console.log(imageURLs);

				// return imageURLs;    
				callback(imageURLs);

			} // if
			else {
				console.log("error", error);

			} // else

		}); // request

	}, // function

	/*
	Return random image URLs from an API
	@param string keyword - search term
	@param int imageCount - number of random images
	@return array or image URLs
	*/
	getRandomImages: function (keyword, imageCount) {

		var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

		return new Promise(function (resolve, reject) {
			request(requestURL, function (error, response, body) {
				if (!error) {
					var parseData = JSON.parse(body);

					var imageURLs = [];

					for (let i = 0; i < imageCount; i++) {
						imageURLs.push(parseData[i].urls.regular);
					} // for

					//console.log(imageURLs);
					// return imageURLs;    
					// resolve promise
					resolve(imageURLs);

				} // if
				else {
					console.log("error", error);
				} // else

			}); // request

		}); // promise

	},  // function

	/*
		creates a database connection
		@return db connection
	*/
	createConnection: function(){

		// create a connection to the database
		var conn = mysql.createConnection({
			host: "us-cdbr-iron-east-02.cleardb.net",
			user: "be8e95da520e46",
			password: "301442a3",
			database: "heroku_5bfe18de006138f"
		});

		return conn;

	} // function

} // module