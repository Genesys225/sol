//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }

    run(mqttManage) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {

            mqttManage.publish(addr.water2_on, '1')
            resolve({
                water2_on: 'ON'
            })
        })
        return promise
    }
}

module.exports = coAction