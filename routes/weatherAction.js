'use strict';
let express = require('express'),
    http = require('http'),
    request = require("request"),
    router = express.Router(),
    Cities = require('../models/Cities.js'),
    path = require('path'),
    fs = require('fs');

router.post('/addDefault', (req, res)=>{
    Cities.find({}, function(err, data){
        if(data.length == 0){
            let cityList = [{ title: 'Moscow' }, {title:'Petersburg'}];
            for(let key in cityList){
                let city = new Cities(cityList[key]);
                city.save(function (err, cities) {
                    if (err) return err;
                });
            }
        }
        res.send(data);
    });
});

router.get('/weather/:town', (req, res)=>{
    console.log(req.params.town);
        request({
            uri: 'http://api.openweathermap.org/data/2.5/weather?q=' + req.params.town + '&mode=JSON&lang=ru&APPID=772f561ff416a16cc96120c1c43edd70',
            method: 'GET'
        }, function(error, response, body) {
            let obj = JSON.parse(body),
                townWeather = [];
            let monthList = [
                'Января', 'Февраля', 'Марта', 'Апреля',
                'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
            let date = new Date(obj.dt*1000),
                month = date.getMonth(),
                day = date.getDate(),
                year = date.getFullYear(),
                monthString = '',
                finalDate = '';
            for(let key in monthList){
                if(key == month){
                    monthString = monthList[month];
                }
            }
            finalDate = day + ' ' + monthString + ' ' + year;
            townWeather.push(
                {date: finalDate},
                {name: obj.name},
                {minTemp: parseInt(obj['main']['temp_min']) - 273},
                {maxTemp: parseInt(obj['main']['temp_max']) - 273},
                {clouds: obj.weather[0].description}
            );
            res.send(townWeather);
        });
});

router.get('/jsonfile', function(req,res){
    request({
        url: 'http://localhost:4000/description/about.json',
        method: 'GET'
    }, function(error, response, body) {
        let obj = JSON.parse(body);
        res.send(obj);
    });
});

router.get('/getCities',function(req, res){
        Cities.find({}, function(err, data){
            res.send(data);
        });
});
router.post('/saveCity',function(req, res){
    let city = new Cities({ title: req.body.title });
    city.save(function (err, cities) {
        if (err) return err;
        Cities.find({}, function(err, data){
            res.send(data);
        });
    });

});
router.post('/delCity',function(req, res){
    Cities.remove({_id:req.body.id}, function(err, cities){
    });
    Cities.find({}, function(err, data){
        res.send(data);
    });
});

module.exports = router;
