const express = require('express');
const app = express();
const scraper = require("./routes/scraping");
const getQuote = require("./routes/getQuote");

app.set("port",(process.env.PORT||3000));
app.use("/",scraper);
app.use("/",getQuote);

app.use((req,res)=>{
	res.json({"message" : "Fire Routes"});
})

app.listen(app.get("port"),()=>{
	console.log("Listening...");
})