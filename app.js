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

app.set('view engine', '@ejs');
app.use(express.static('public'));

// import request library
const request = require('request');
// import mysql library
const mysql = require('mysql');

// creating a “route”
app.get("/", function(req, res){

    res.render("index.html");

});

// allow the server to listen for any request
// local server listener
// app.listen("8081", "127.0.0.1", function() {
// heroku server listner
app.listen(process.env.PORT, process.env.IP, function() {

    console.log("Express Server is Running...")

});