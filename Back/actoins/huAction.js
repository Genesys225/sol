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
                    hu: mqttManage.getRsults()['openhab/in/senn01/airhum01']
                })
            })
            return promise
    }
}

module.exports = coAction