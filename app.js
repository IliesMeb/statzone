var express = require("express");
var React = require('react');

var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", function(req, res){
    res.render("landingpage.html.ejs")
});


app.listen(1234);