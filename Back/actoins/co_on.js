//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }

    run(mqttManage) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {
            mqttManage.publish(addr.co_on, '1')
            resolve({
                co_on: 'ON'
            })
        })
        return promise
    }
}

module.exports = coAction