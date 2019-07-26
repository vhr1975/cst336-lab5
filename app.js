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

// creating a “route”
app.get("/", function(req, res){

    /*
    console.log('in the app.get function');    
    console.log('set the var to the web API: var requestURL = ', requestURL);
    */
    var requestURL = "https://api.unsplash.com/photos/random?client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";
    // console.log('after set the var to the web API: var requestURL = ', requestURL);

    request(requestURL, function (error, response, body) 
    {        
        /*
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the API data
        */
       if (!error){
        var parseData = JSON.parse(body);    
        // console.log("image url: ", parseData['urls']['regular']);    
        var imageURL = parseData['urls']['regular'];    
        // console.log("*****imageURL*****: ", imageURL);    

        // res.render("index.html", {"imageURL": imageURL});
        res.render("index", {"imageURL": imageURL});
       } // if
       else{
           // res.render("index.html", {"error": "Unable to access API"});  
           res.render("index", {"error": "Unable to access API"});  
        }
    }); // request
    
}); // root route

// creating a “route”
app.get("/search", function(req, res){

    res.send("hi");
    // res.render("results");

}); // search route

// allow the server to listen for any request
// local server listener
// app.listen("8081", "127.0.0.1", function() {
// heroku server listner
app.listen(process.env.PORT, process.env.IP, function() {

    console.log("Express Server is Running...")

});