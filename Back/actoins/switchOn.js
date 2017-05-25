//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }
    
    run(mqttManage){
        console.log('RESULTSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
 
         var promise = new Promise(function (resolve, reject) {
             mqttManage.publish('mqtt/demo', 'ON')
                resolve({
                    switch: 'ON'
                })
            })
            return promise
    }
}

module.exports = coAction