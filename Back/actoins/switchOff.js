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
                    switch: 'ON'
                })
            
            mqttManage.publish('mqtt/demo', 'OFF')
                resolve({
                    switch: 'OFF'
                })
            })
            return promise
    }
}

module.exports = coAction