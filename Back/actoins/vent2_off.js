//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }

    run(mqttManage) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {

            mqttManage.publish(addr.vent2_off, '0')
            resolve({
                vent2_on: 'OFF'
            })
        })
        return promise
    }
}

module.exports = coAction