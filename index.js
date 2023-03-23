const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apikey = "0f8a96031807b006169462dec32456e0";
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+ apikey +"&units="+ units;
  https.get(url, function(response){

    response.on("data", function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const icon = weatherdata.weather[0].icon
      const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      const weatherdescription = weatherdata.weather[0].description
      console.log(temp);
      console.log(weatherdescription);
      res.write("<p> The weather is currently " + weatherdescription + "</p>");
      res.write("<h1> The temperature in "+ query +" is "+ temp + " degree Celcius </h1>");
      res.write("<img src =" + imageurl + ">");
      res.send()
    })

  })
});

app.listen(3000, function(){
  console.log("Running");
});
