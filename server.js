const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var city = "City";
var temp = "Temperature";
var description = "Description";
app.post("/", function (req, res) {
  var name = req.body.city;
  city = name;
  console.log(name);
  const url1 =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    name +
    "&appid=1fe231302abc885776886d9f9d695588";
  https.get(url1, function (response) {
    response.on("data", function (data) {
      const coordinatesData = JSON.parse(data);
      console.log(coordinatesData);

      const lat = coordinatesData[0].lat;

      const lon = coordinatesData[0].lon;
      //Openweather api url added
      const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=1fe231302abc885776886d9f9d695588&units=metric";
      https.get(url, function (response1) {
        response1.on("data", function (data) {
          const weatherData = JSON.parse(data);
          const Temp = weatherData.main.temp;
          const icon = weatherData.weather[0].icon;
          const Description = weatherData.weather[0].description;
          //Openweather image url added

          const imgURL =
            "https://openweathermap.org/img/wn/" + icon + "@2x.png";
          temp = Temp;
          description = Description;
          res.redirect("/");
        });
      });
    });
  });
});

app.get("/", function (req, res) {
  res.render("index", { City: city, info: description, Temp: temp });
});

app.listen(3000, function () {
  console.log("Server Started");
});
