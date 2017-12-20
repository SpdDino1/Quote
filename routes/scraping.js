const express = require('express');
const app = express();
const superagent = require('superagent');
const cheerio = require("cheerio");
const mongodb = require("mongodb");

const url = "http://www.eduro.com/";

//Route 
app.get("/scrape",(req,res)=>{
	let urlHtml,quotation,quoteBy;

	//HTTPS request
	superagent.get(url)
	.end((err,urlRes)=>{
		if(err){
			console.log(err);
			res.send("SuperAgent Error");
		}
		else{
			urlHtml = urlRes.text;
			startScraping();
		}
	})

	//Scraping
	function startScraping(){
		$ = cheerio.load(urlHtml);

		$('dailyquote').each((i,element)=>{
			quotation=element.children[1].children[1].children[0].data;
			quoteBy = element.children[1].children[3].children[0].data.trim();
			return false;
		})
		writeToDB();
	}

	//dbWriter
	function writeToDB(){
		//db connection
		mongodb.MongoClient.connect("mongodb://<mLab User Name>:<mLab Password>@ds059546.mlab.com:59546/quote",(err,database)=>{
			if(err){
				return console.log(err);
			}

			database.db("quote").collection('quoteOfTheDay').update(
				{identifier : 1},
				{author : quoteBy,quote : quotation, identifier : 1},
				(err,docs)=>{
					if(err){
						return console.log("Updation Error");
					}
					res.json({"message" : "Updated DB!"});
				}
			);
		})
	}
})

module.exports = app;