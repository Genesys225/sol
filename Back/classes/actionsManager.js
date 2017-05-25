 var mqttManager = require('./mqtt.js');
 mqttManage = new mqttManager()

 mqttManage.connectMq()
 class actionsManager {
     constructor() {

     }
     getActions() {
         var mongo = require('./mongo.js');
         return mongo.getActions();
     }
     checkifRunAction(action) {
         var promise = new Promise(function (resolve, reject) {
             var moment = require('moment');
             var thisDateInString = action.runtime;
             var lastRun = moment.unix(action.lastrun);
            //****************RUN EVERY*******************//
             if (thisDateInString.indexOf('every') > -1) {
                 var runMinAgo = ((lastRun.diff(moment()) / 1000) / 60) * -1
                 console.log(runMinAgo > thisDateInString.replace('every ', '').replace('min', ''))

                  console.log("check if run RUNNUNG ", runMinAgo , thisDateInString.replace('every ', '').replace('min', ''))
                  console.log("check if run RUNNUNG ", runMinAgo > thisDateInString.replace('every ', '').replace('min', ''))
                 if (runMinAgo > thisDateInString.replace('every ', '').replace('min', '')) {
                     resolve(true)
                 } else {
                     resolve(false)
                 }
             }
 //****************RUN EVERY*******************//

  //****************RUN OCLOCK*******************//
             if (thisDateInString.indexOf('oclock') > -1) {
                 var currentTime = moment(); // e.g. 11:00 pm
                 var startTime = moment(thisDateInString.replace('oclock ', ''), "HH:mm a");
                 //var endTime = moment('03:38 am', "HH:mm a");
                 console.log(currentTime.hours() == startTime.hours(), currentTime.minutes(), startTime.minutes())
                 if (currentTime.hours() == startTime.hours() && currentTime.minutes() == startTime.minutes()) {
                     resolve(true)
                 } else {

                 }

                 var runMinAgo = ((lastRun.diff(moment()) / 1000) / 60) * -1
                 if (runMinAgo > thisDateInString.replace('oclock ', '')) {
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
         var self = this
try{
         /**ACTIONS */
         var coActions = require('../actoins/coAction.js');
         var coAction = new coActions();

         var tempActions = require('../actoins/tempAction.js');
         var tempAction = new tempActions();

         var huActions = require('../actoins/huAction.js');
         var huAction = new huActions();

         var lightActions = require('../actoins/lightAction.js');
         var lightAction = new lightActions();

         var mqttdemoActions = require('../actoins/switchTimer.js');
         var mqttDemo = new mqttdemoActions();

         var switchOnActions = require('../actoins/switchOn.js');
         var switchOn = new switchOnActions();

         var switchOffActions = require('../actoins/switchOff.js');
         var switchOff = new switchOffActions();
 console.log("ACTION RUNNING:", actions)
 
         var ventTimeActions = require('../actoins/ventTimerAction.js');
         var ventTimeAction = new ventTimeActions();

         var vent2TimeActions = require('../actoins/vent2TimerAction.js');
         var vent2TimeAction = new vent2TimeActions();
         /**ACTIONS */
}catch(e){console.log(e.stack)}

         // coAction.run(mqttManage.getResults())
         var mongo = require('./mongo.js');


 console.log("ACTION RUNNING:", actions)
         for (var action in actions) {

             (function (action) {
 console.log("ACTION RUNNING:", actions[action].name)
                 self.checkifRunAction(actions[action])
                     .then(function (runOrNot) {
                         console.log("ACTION RUNNING:", actions[action].name)
                          console.log('UPDATING LAST RUNNNNNNNNNN',force,runOrNot , force)
                         if (runOrNot || force) {

                             if (force == undefined) {
                                 console.log('UPDATING LAST RUNNNNNNNNNN')
                                 mongo.updateActionLastRun(actions[action]);
                             }

                             var thisaction = eval(actions[action].name);

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