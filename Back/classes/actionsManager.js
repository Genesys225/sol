 var mqttManager = require('./mqtt.js');
 mqttManage = new mqttManager()


 var requireDir = require('require-dir');
 var actionsDir = requireDir('../actoins/');


 mqttManage.connectMq()
 class actionsManager {
     constructor() {

     }
     getActions() {
         var mongo = require('./mongo.js');
         return mongo.getActions();
     }
     checkifRunAction(action,force) {
         var promise = new Promise(function (resolve, reject) {
             var moment = require('moment');
             var thisDateInString = action.runtime;
             var lastRun = moment.unix(action.lastrun);



             console.log('RUNTIME:',action.runtime,'SEQUENCE:',action.runseq)
             //****************RUN EVERY*******************//
           //  if (thisDateInString.indexOf('every') > -1) {
                 if (action.runseq =='every') {
var lastRun = new Date(action.lastrun * 1000);
var runTime = new Date(action.runtime * 1000);
var runSeq = action.runseq

            console.log('NEXT RUNNNNN:', myDiff, 'DATE1', lastRun, 'DATE2', new Date, (runTime.getHours() * 60) + runTime.getMinutes())
            var a = moment(new Date); //now
            var b = moment(new Date(lastRun));
            console.log('RUN EVERY in min:', (runTime.getHours() * 60) + runTime.getMinutes())
            console.log('LAST RUN:', lastRun)
            console.log('DIFF IN MIN:', a.diff(b, 'minutes'))
            console.log('RUN:', a.diff(b, 'minutes') > (runTime.getHours() * 60) + runTime.getMinutes())
            var myDiff = a.diff(b, 'minutes')
            console.log() // 44700
            console.log(a.diff(b, 'hours')) // 745
            console.log(a.diff(b, 'days')) // 31
            console.log(a.diff(b, 'seconds')) // 4



if( a.diff(b, 'minutes') > (runTime.getHours() * 60) + runTime.getMinutes()){
resolve(true)
}else{
    resolve(false)
}

 //




/*


                     var dateNow = new Date();
                     var runEvery = dateNow.setMinutes()





                 var runMinAgo = ((lastRun.diff(moment()) / 1000) / 60) * -1
                 
                 console.log(runMinAgo > thisDateInString.replace('every ', '').replace('min', ''))

                 console.log("check if run RUNNUNG ", runMinAgo, thisDateInString.replace('every ', '').replace('min', ''))
                 console.log("check if run RUNNUNG ", runMinAgo > thisDateInString.replace('every ', '').replace('min', ''))
                 
                 var expectedTimeToRunInMin = (new Date(action.runtime).getHours()*60)+(new Date(action.runtime).getMinutes())
                 console.log("EXPECTED::::::::::::::::XXXXXXXX"+action.name,new Date(action.runtime).getHours(),expectedTimeToRunInMin, (new Date(action.runtime).getHours()*60),(new Date(action.runtime).getMinutes()))
                 if (runMinAgo > expectedTimeToRunInMin) {
                     resolve(true)
                 } else {
                     resolve(false)
                 }
                 */
             }
             //****************RUN EVERY*******************//

             //****************RUN OCLOCK*******************//
             if (action.runseq =='in') {
                 var currentTime = moment(); // e.g. 11:00 pm
                 var startTime = moment.unix(action.runtime);
                 //var endTime = moment('03:38 am', "HH:mm a");
                 console.log('OCLOCKKKKKKKKKKKKKKKS')
                 console.log(currentTime.hours() == startTime.hours(), currentTime.minutes(), startTime.minutes())
                 if (currentTime.hours() == startTime.hours() && currentTime.minutes() == startTime.minutes()) {
                     resolve(true)
                 } else {
resolve(false)
                 }

  
             }
             //****************RUN OCLOCK*******************//



         })
         return promise
     }

     runActions(actions, force) {
 console.log("RUNNING ACTION:",actions)
         var self = this
            
         try {



              /**ACTIONS */
             var allReqActions = {}
             for (var singleAction in actionsDir) {
                 self[singleAction] = new actionsDir[singleAction]
                 
             }
             /**ACTIONS */


            // console.log(self,888888888)
            
         } catch (e) {
             console.log(e.stack)
         }

         // coAction.run(mqttManage.getResults())
         var mongo = require('./mongo.js');


         console.log("ACTION RUNNING:", actions)
         for (var action in actions) {

             (function (action) {
                // console.log("ACTION RUNNING:", actions[action].name)
                 self.checkifRunAction(actions[action])
                     .then(function (runOrNot) {
                         console.log("ACTION RUNNING:", actions[action].name)
                       //  console.log('UPDATING LAST RUNNNNNNNNNN', force, runOrNot, force)
                         if (runOrNot || force) {

                             if (force == undefined) {
                                 console.log('UPDATING LAST RUNNNNNNNNNN')
                                 mongo.updateActionLastRun(actions[action]);
                             }

                             var thisaction = self[actions[action].name];

                             var result = self.rrrR

                             thisaction.run(mqttManage, actions[action].params)
                                 .then(function (res) {
                                     console.log("ACTION RESPONCE:", res)
                                     mongo.writeToLog(res)
                                 })



                         } else {

                         }
                     }).catch(function (e) {
                         console.log(e)
                     })
             })(action)
         }







     }
 }




 module.exports = actionsManager