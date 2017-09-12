//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }
    
    run(mqttManage){
        console.log('RESULTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
 var addr = mqttManage.map();
         var promise = new Promise(function (resolve, reject) {
                resolve({
                    light_status: mqttManage.getRsults()[addr.light_status]
                })
            })
            return promise
    }
}

module.exports = coAction