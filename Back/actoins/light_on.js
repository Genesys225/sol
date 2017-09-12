//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction {
    constructor() {
        super()
    }

    run(mqttManage) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {
console.log('PUBLISHINGGGGGGGGG',addr.light_on)
            mqttManage.publish(addr.light_on, '1')
            resolve({
                light_on: 'ON'
            })
        })
        return promise
    }
}

module.exports = coAction