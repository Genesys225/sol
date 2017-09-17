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




    createMqttServer() {

        var mosca = require('mosca');
        var ascoltatore = {
            //using ascoltatore
            //  json:true,
            //     return_buffers: true,
            type: 'mongo',
            url: 'mongodb://test:test12345@ds137281.mlab.com:37281/green324',
            pubsubCollection: 'ascoltatori',
            mongo: {}
        };

        var settings = {
            port: 1883,
            backend: ascoltatore
        };

        var server = new mosca.Server(settings);

        server.on('clientConnected', function (client) {
            console.log('client connected', client.id);
        });

        // fired when a message is received
        server.on('published', function (packet, client) {

            function b64DecodeUnicode(str) {
                // Going backwards: from bytestream, to percent-encoding, to original string.
                return decodeURIComponent(atob(str).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
            }

            if (typeof (packet.payload) === 'object') {
                console.log("IS PAYLOAD", packet)
                var stringBuf = packet.payload.toString('utf-8');
                //  var obj = JSON.parse(stringBuf);
                console.log('STATUS MQTT ROW: ', packet.topic, ":", stringBuf);
            } else {
               // console.log("NOT PAYLOAD", packet)
                //console.log('Published', (packet.payload), typeof(packet.payload));
            }


        });

        server.on('ready', setup);

        // fired when the mqtt server is ready
        function setup() {
            console.log('Mosca server is up and running');
        }
    }

    connectMq() {
        this.createMqttServer()
        var self = this
        var mqtt = require('mqtt')
        //var dbQuerys = require('./classes/dbQuerys.js')
        //************************ROUTS**********************//
        var mqttAdress = 'mqtt://localhost';
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