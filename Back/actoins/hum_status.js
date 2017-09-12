//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }
    
    run(mqttManage){
        var addr = mqttManage.map();
            var promise = new Promise(function (resolve, reject) {
                resolve({
                    hum_status: mqttManage.getRsults()[addr.hum_status]
                })
            })
            return promise
    }
}

module.exports = coAction