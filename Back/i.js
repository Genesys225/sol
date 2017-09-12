var mqtt = require('mqtt')
//var dbQuerys = require('./classes/dbQuerys.js')

var express = require('express');
var app = express();
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});




//************************ROUTS**********************//
var routes = [{
    subscribe: 'openhab/in/co2/state',
    routUrl: '/getco'
}];

var mqttAdress = 'mqtt://10.0.0.7';
var sub = ['openhab/in/#']
//************************ROUTS**********************//


var client = mqtt.connect(mqttAdress)

var mqttResult = {};

client.on('connect', function () {
    client.subscribe(sub)
})



client.on('message', function (topic, message) {
    mqttResult[topic] = message.toString()
    // message is Buffer 
    // callback(message.toString())
    console.log(mqttResult)
    // client.end()
})


app.get('/getco', function (req, res) {
    console.log(mqttResult)
    res.send(mqttResult);

})

app.get('/getAll', function (req, res) {
    res.send(mqttResult);
})

app.listen(3000);



//************************MQUU API**********************//
function getSimpleReq(co2ApiAdress, callback) {




}






//************************MQUU API**********************//