const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', function (req, res) {

    const query = req.body.cityName;
    const apiKey = "ab9d6ca265e3201dac5fbc111290a94a";
    const unit = "metric";
    const lang = "fr"

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey +
        "&q=" + query + "&lang=" + lang + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response);

        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>City name : " + city + "</h1>");
            res.write("<p>The temperature is currently " + temp + " degrees</p>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        })
    })

})



app.listen(3000, function () {
    console.log('Server is running on port 3000');
});