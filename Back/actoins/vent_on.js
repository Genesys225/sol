//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }

    run(mqttManage) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {

            mqttManage.publish(addr.vent1_on, 1)
            resolve({
                vent1: 'ON'
            })
        })
        return promise
    }
}

module.exports = coAction