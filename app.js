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
app.get("/", function(req, res) {

    /*
    console.log('in the app.get function');    
    console.log('set the var to the web API: var requestURL = ', requestURL);
    */
    var requestURL = "https://api.unsplash.com/photos/random?client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

    request(requestURL, function(error, response, body) {
        /*
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the API data
        */
        if (!error) {
            var parseData = JSON.parse(body);
            // console.log("image url: ", parseData['urls']['regular']);    
            var imageURL = parseData['urls']['regular'];
            // console.log("*****imageURL*****: ", imageURL);    

            // res.render("index.html", {"imageURL": imageURL});
            res.render("index", {
                "imageURL": imageURL
            });
        } // if
        else {
            // res.render("index.html", {"error": "Unable to access API"});  
            res.render("index", {
                "error": "Unable to access API"
            });
        }
    }); // request

}); // root route

// creating a “route”
app.get("/search", async function(req, res) {

    // keyword enterd by user
    var keyword = req.query.keyword;

    // call web API with promise
    var imageURLs = await getRandomImages_promise(keyword, 9);
    console.log("imageURLs using promises:" + imageURLs);
    
    res.render("results", {
        "imageURLs": imageURLs
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

/*
    Return random image URLs from an API
    @param string keyword - search term
    @param int imageCount - number of random images
    @return array or image URLs
*/ 
function getRandomImages_cb(keyword, imageCount, callback){

        var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";
    
        request(requestURL, function(error, response, body) {
            if (!error) {
                var parseData = JSON.parse(body);
    
                var imageURLs = [];
    
                for (let i = 0; i < 9; i++) {
    
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

}

/*
    Return random image URLs from an API
    @param string keyword - search term
    @param int imageCount - number of random images
    @return array or image URLs
*/ 
function getRandomImages_promise(keyword, imageCount){

    var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

    return new Promise ( function (resolve, reject)
    {
        request(requestURL, function(error, response, body) {
            if (!error) {
                var parseData = JSON.parse(body);

                var imageURLs = [];

                for (let i = 0; i < 9; i++) {

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

    }; // promise

}

// allow the server to listen for any request
// local server listener
// app.listen("8081", "127.0.0.1", function() {
// heroku server listner
app.listen(process.env.PORT, process.env.IP, function() {

    console.log("Express Server is Running...")

});