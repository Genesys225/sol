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
                    light: mqttManage.getRsults()['openhab/in/senn01/SoilH02']
                })
            })
            return promise
    }
}

module.exports = coAction