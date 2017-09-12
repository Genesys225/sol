//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }

    run(mqttManage) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {
            mqttManage.publish(addr.co_off, '0')
            resolve({
                co_off: 'OFF'
            })
        })
        return promise
    }
}

module.exports = coAction