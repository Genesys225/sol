//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }
    
    run(mqttManage){
        console.log('RESULTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
 
         var promise = new Promise(function (resolve, reject) {
                resolve({
                    co: mqttManage.getRsults()['openhab/in/co2/state']
                })
            })
            return promise
    }
}

module.exports = coAction