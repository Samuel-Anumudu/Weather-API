const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  // Get live data using an API
  const query = req.body.cityName;
  const apiKey = "a63b6d1a225a7a81f30f0b620673fd93";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  // Make a http get request to get the data as a JSON format
  https.get(url, (response) => {
    console.log(response);

    response.on("data", (data) => {
      // Parse the request and get specific items you want
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;

      const weatherDesc = weatherData.weather[0].description;

      const icon = weatherData.weather[0].icon;

      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      //   Send the request to the browser using the HTML you want to write

      res.write("<p>The weather in " + query + " is " + weatherDesc + "</p>");

      res.write(
        "<h1>The weather in " + query + " is " + temp + "degrees Celcius.</h1>"
      );

      res.write("<img src=" + imageURL + " />");

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
