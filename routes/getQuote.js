const express = require('express');
const app = express();
const mongodb = require("mongodb");

//Route
app.get("/getQuote",(req,res)=>{

	//DB Read
	mongodb.MongoClient.connect("mongodb://<mLab User Name>:<mLab Password>@ds059546.mlab.com:59546/quote",(err,database)=>{
		if(err){
			return console.log(err);
		}

		database.db("quote").collection("quoteOfTheDay").findOne(
			{identifier : 1},
			{author:1, quote:1}
		,(err,result)=>{
			if(err){
				return console.log(err);
			}
			delete result._id;
			delete result.identifier;
			res.json(result);
		});
	})
})

module.exports = app;