//jshint esversion:6

const express = require("express");
const https = require("https"); // this is nothing but getting info from external server through API id using one of the method called HTTPS
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req , res){
  res.sendFile(__dirname + "/index.html");

    });




app.post("/", function(req , res){
  console.log("posting sucessfulyy");
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const appKey = "2d2653ab4c77167bdb2b084dbbfb0fae";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + unit  ;
  https.get(url , function(response){
    console.log(response.statusCode);// this will get what is the statusCode whether it is running properly or not
    response.on("data", function(data){ // this response.on will search it through some data in the url that is external server which is weathermap website using "data"
      console.log(data); // hexadecimalformat data
      const weatherdata = JSON.parse(data);
      console.log(weatherdata);//json format data
      const temp = weatherdata.main.temp // actual temperature
      const weatherDescription = weatherdata.weather[0].description // it gives weather discription
      const weatherfeelslike = weatherdata.main.feels_like // it gives weather how it feels like
      const icon = weatherdata.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(temp);
      console.log(weatherDescription);
      console.log(weatherfeelslike);
      res.write(" <p> The weather is currently " + weatherDescription + "</p>");
      res.write( "<h1> The Temperature in " + query + " is " + temp + " degree celsius </h1>");
      res.write("<img src = "+ imageUrl +">");
      res.send()

              })
    });

});







app.listen(5000 , function(req , res){
  console.log("server is running on 5000 port");
})
