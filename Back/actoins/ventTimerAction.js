//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }
    // Switch Relay4cha02   {mqtt=">[mosquitto:openhab/out/4chR0/2:command:ON:ON],>[mosquitto:openhab/out/4chR0/2:command:OFF:OFF]"}
    //Switch Relay4cha03   {mqtt=">[mosquitto:openhab/out/4chR0/3:command:ON:ON],>[mosquitto:openhab/out/4chR0/3:command:OFF:OFF]"}
    run(mqttManage, params) {

       var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {

            mqttManage.publish(addr.vent1_on, 1)
    
            setTimeout(function () {

                mqttManage.publish(addr.vent1_off, 0)
                resolve({
                    autovent: 'Timer Stopped'
                })
            }, params.timeToRun);


        })
        return promise
    }
}

module.exports = coAction