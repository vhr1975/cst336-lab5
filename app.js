/**
 * Class: CST-336
 * Lab 5: Express, Embedded JavaScript (EJS), Request, and MySQl
 * Authors:
 * - Victor Ramirez
 **/

// import Express library
const express = require("express");
// variable to access the methods
// exposes a top-level function
const app = express();
// render HTML
// app.engine('html', require('ejs').renderFile);
// set view engine
app.set('view engine', 'ejs');
// add static files folder 
app.use(express.static("public"));

// import request library
const request = require('request');
// import mysql library
const mysql = require('mysql');
// import custom tools file
const tools = require('./tools');

// creating a “route”
app.get("/", async function (req, res) {

	/*
	console.log('in the app.get function');    
	console.log('set the var to the web API: var requestURL = ', requestURL);
	*/
	var requestURL = "https://api.unsplash.com/photos/random?client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

	// call web API with promise
	var imageURLs = await tools.getRandomImages("", 1);

	res.render("index", {
		"imageURLs": imageURLs
	});


}); // root route

// creating a “route”
app.get("/search", async function (req, res) {

	// keyword enterd by user
	var keyword = req.query.keyword;

	// call web API with promise, keyword and image count
	var imageURLs = await tools.getRandomImages(keyword, 9);
	console.log("imageURLs using Promises:" + imageURLs);

	res.render("results", {
		"imageURLs": imageURLs,
		"keyword": keyword
	});

	// call web API with callback
	/*
	getRandomImages_cb(keyword, 9, function(imageURLs){

	    console.log("imageURLs:" + imageURLs);

	    res.render("results", {
	        "imageURLs": imageURLs
	    });
	    
	})
	*/

}); // search route

// creating a “route”
app.get("/api/updateFavorites", function (req, res) {

    // call tools function to create a connection to the database
    var conn = tools.createConnection();	
	var sql;
	var sqlParams;

	// logic to determine if we need to add to the db or delete from the db
	if (req.query.action == "add") {
		sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
		sqlParams = [req.query.imageURL, req.query.keyword];
	} else {
		sql = "DELETE FROM favorites WHERE imageURL = ?";
		sqlParams = [req.query.imageURL];
	}

	conn.connect(function (err) {

		if (err) throw err;

		conn.query(sql, sqlParams, function (err, result) {

			if (err) throw err;

		}); // query

	}); // connect

    res.send("it works");
    
}); // api route

// creating a “route”
app.get("/displayKeyword", async function (req, res)
{
	// res.send("in /displayword");
	
	// call web API with promise
	var imageURLs = await tools.getRandomImages("", 1);
    
    // call tools function to create a connection to the database
    var conn = tools.createConnection();	
    var sql = "SELECT DISTINCT keyword FROM heroku_5bfe18de006138f.favorites ORDER BY keyword";
    
    conn.connect( function(err){

        if (err) throw err;

        conn.query(sql, function (err, result) {

            if (err) throw err;

            res.render("favorites", 
            {
				"rows": result,
				"imageURLs": imageURLs
            
            }); // render

        }); // query

    }) // connect
    
}); // displayKeyword route

// creating a “route”
app.get("/api/displayFavorites", function (req, res)
{
	// call tools function to create a connection to the database
    var conn = tools.createConnection();	
	var sql = "SELECT imageURL FROM heroku_5bfe18de006138f.favorites WHERE keyword = ?";
	var sqlParams = [req.query.keyword];

	conn.connect( function(err){

        if (err) throw err;

        conn.query(sql, sqlParams, function (err, results) {

			if (err) throw err;
			
            res.send(results)

        }); // query

    }) // connect
    
    

}); // displayFavorites

// allow the server to listen for any request
// local server listener
// app.listen("8081", "127.0.0.1", function() {
// heroku server listner
app.listen(process.env.PORT, process.env.IP, function () {

	console.log("Express Server is Running...")

});