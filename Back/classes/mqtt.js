class mqttManager {
    constructor() {

    }
    map() {
        var config = {


            //SENSOR


            //*****************co widget*****************
            //status
            co_status: 'sol/in/co2',
            //controlls
            co_on: 'sol/out/4chR0/3',
            co_off: 'sol/out/4chR0/3',
            //*****************co widget*****************


            //*****************light widget*****************
            //status
            light_status: 'sol/in/light',
            light_on: 'sol/out/4chR0/1', //on off
            //controlls
            light_off: 'sol/out/4chR0/1', //on off
            //*****************light widget*****************


            //*****************humidity widget*****************
            //status
            hum_status: 'sol/in/humidity',
            //controlls
            hum_on: 'sol/out/4chR0/2', //on off
            hum_off: 'sol/out/4chR0/2', //on off
            //*****************humidity widget*****************

            //*****************temperature widget*****************
            //status
            temp_status: 'sol/in/temp', //outout
            //*****************temperature widget*****************



            //*****************Vent widget*****************
            vent1_status: 'TBD',
            vent1_on: 'sol/out/4chR0/4', //on off
            vent1_off: 'sol/out/4chR0/4', //on off
            vent2_on: 'sol/out/4chR1/1', //on off
            vent2_off: 'sol/out/4chR1/1', //on off
            vent3_on: 'sol/out/4chR1/2', //on off
            vent3_off: 'sol/out/4chR1/2', //on off
            //*****************Vent widget*****************


            //*****************Water widget*****************
            water1_status: 'TBD-water-level',
            water1_on: 'sol/out/4chR1/3', //on off
            water1_off: 'sol/out/4chR1/3', //on off
            water2_on: 'sol/out/4chR1/4', //on off
            water2_off: 'sol/out/4chR1/4' //on off
            //*****************Water widget*****************

        }
        return config
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

    config() {
        return
    }






    connectMq() {
        var self = this
        var mqtt = require('mqtt')
        //var dbQuerys = require('./classes/dbQuerys.js')
        //************************ROUTS**********************//
        var mqttAdress = 'mqtt://10.0.0.7';
        var sub = ['sol/in/#']
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


    publish(topic, message) {
        this.client.publish(topic, message)
    }
    subscribe() {

    }

}


module.exports = mqttManager