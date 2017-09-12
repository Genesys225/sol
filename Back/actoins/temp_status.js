//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }
    
    run(mqttManage){
        console.log('TEMPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPnvb vb')
        var addr = mqttManage.map();
         var promise = new Promise(function (resolve, reject) {
                resolve({
                    temp_status: mqttManage.getRsults()[addr.temp_status]
                })
            })
            return promise
    }
}

module.exports = coAction