const express = require('express');
const React = require('react');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('tablestats.json');

const app = express();

//write Headers
//writeStream.write('1,2,3')

request('https://fbref.com/de/fussballspieler/d6862409/Florian-Niederlechner', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // const allStats = $('#stats');
        // const statsRow = allStats.find('td').each((index, element) => {
        //     //console.log(index);
        //     console.log($(element).text());
        // });
        // $('#stats').each((i,e) => { //DAS HIER BENUTZEN
        //    const statsRrow = $(e).text();
        //     // const attri = $(e).attr('data-stat'); //-> nochmal anschauen
        //     // console.log(statsRrow);
        // });
    
        //console.log(statsRow.html());
        //console.log(allStats.text());
        //console.log(statsRow);

        $('#stats > td').each((i, el) => {
            const row = $(el).text().replace(/\s\s+/g, '');
            //write rows to CSV
            writeStream.write(`${row}`);
        });
        console.log("scraping done");
    }
})

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", function(req, res){
    res.render("landingpage.html.ejs")
});


app.listen(1234);