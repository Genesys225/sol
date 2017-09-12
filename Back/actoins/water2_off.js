//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }

    run(mqttManage) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {

            mqttManage.publish(addr.water2_on, '0')
            resolve({
                water_off: 'OFF'
            })
        })
        return promise
    }
}

module.exports = coAction