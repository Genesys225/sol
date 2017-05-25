//require("../classes/acttionsManager.js")
var baseAction = require('../classes/baseAction.js')
class coAction extends baseAction{
    constructor(){
        super()
    }
    
    run(mqttManage){
        console.log('TEMPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPnvb vb')
 
         var promise = new Promise(function (resolve, reject) {
                resolve({
                    temp: mqttManage.getRsults()['openhab/in/senn01/airtmp01']
                })
            })
            return promise
    }
}

module.exports = coAction