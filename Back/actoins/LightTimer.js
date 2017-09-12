//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }

    run(mqttManage, params) {
        var addr = mqttManage.map();
        var promise = new Promise(function (resolve, reject) {
            mqttManage.publish(addr.light_on, '1')
             setTimeout(function() {
                  mqttManage.publish(addr.light_on, '0')
                  console.log('OFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
                   resolve({
                    switch: 'Timer Stopped'
                })
             },  params.timeToRun);
        })
        return promise
    }
}

module.exports = coAction



