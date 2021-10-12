const request = require('request');

const apiKey = '8ba39a0233e43c14b54b3c7a1bdfda84';

const express = require('express')

const https = require("https")
const app = express()

app.set('view engine','ejs');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(express.static('images'))

app.get('/', function (req, res) {
  res.render('index.ejs',{weather:'', error: ''})
})


app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weat = JSON.parse(body)
      console.log(weat)
      if(weat.main == undefined){
        console.log("error");
        res.render('index', {weather: "not null", error: 'Error, please try again'});
      } else {
         let weatherText = `${weat.main.temp}`;
         let min=`${weat.main.temp_min}`;
         let max=`${weat.main.temp_max}`;
         let stat=`${weat.weather[0].main}`;
         let loc=`${weat.name}`;
         let con=`${weat.sys.country}`;
         console.log(weatherText);
        res.render('index', {weather: weatherText, weathermin: min, weathermax: max, weatherStat: stat, weatherloc: loc,weathercon: con,  error: null});
      }
      }
    
  });
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!')
})

