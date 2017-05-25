//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }
    
    run(mqttManage, params){
      
         var promise = new Promise(function (resolve, reject) {
             mqttManage.publish('mqtt/demo', 'ON')
             setTimeout(function() {
                  mqttManage.publish('mqtt/demo', 'OFF')
                 resolve({
                    switch: 'Timer Stopped'
                })
             },  params.timeToRun);

                
            })
            return promise
    }
}

module.exports = coAction