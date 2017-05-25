class mqttManager {
    constructor() {

    }
    getRsults() {
        return this.mqttResuls
    }
    setResults(results) {
        this.mqttResuls = results
    }

    getMq() {
        return this.mqtt
    }
    setMq(mqtt) {
        this.mqtt = mqtt
    }








    connectMq() {
        var self = this
       var mqtt = require('mqtt')
        //var dbQuerys = require('./classes/dbQuerys.js')
        //************************ROUTS**********************//
        var mqttAdress = 'mqtt://10.0.0.7';
        var sub = ['openhab/in/#']
        //************************ROUTS**********************//
        console.log(self)
        self.client = mqtt.connect(mqttAdress)
        //var client = mqtt(mqttAdress)

         self.client.on('connect', function () {
             self.client.subscribe(sub)
        })


        var mqttResult = {}
         self.client.on('message', function (topic, message) {
             
            mqttResult[topic] = message.toString()
            //console.log(mqttResult)
            self.setResults(mqttResult)
        })
    }


    publish(topic, message){
         this.client.publish(topic, message)
    }
    subscribe() {

    }

}


module.exports = mqttManager