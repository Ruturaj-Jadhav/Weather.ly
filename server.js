const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.post('/' , function(req,res){
  var name = req.body.city;
  const url1 = 'https://api.openweathermap.org/geo/1.0/direct?q='+name+'&appid=1fe231302abc885776886d9f9d695588';
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=53.958332&lon=-1.080278&appid=1fe231302abc885776886d9f9d695588&units=metric';
  https.get(url1, function(response){
    response.on("data" , function(data){
      const coordinatesData = JSON.parse(data);

      const lat = coordinatesData[0].lat;

      const lon = coordinatesData[0].lon;
      const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=1fe231302abc885776886d9f9d695588&units=metric';
      //console.log(coordinatesData);
      https.get(url,function(response1){
        response1.on("data" , function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const icon = weatherData.weather[0].icon;
          const description = weatherData.weather[0].description;
          const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write("<h1>Weather check</h1> <br>");
          res.write("City : "+name+"<br>");
          res.write("Description : "+description +"<br>");
          res.write("Current temperature : " + temp + " degree celcius.");
          res.write("<img src=" + imgURL + ">");
          res.send();
        });

      });

    });

  });

});

app.get('/' , function(req , res){
res.sendFile(__dirname+"/index.html");
});

app.listen(3000, function(){
  console.log("Server Started");
});
