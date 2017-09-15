var actionsmanager = require('./classes/actionsManager.js')
var am = new actionsmanager
console.log(am)
var mongo = require('./classes/mongo.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())





var currentEnv = process.env.ENV || 'dev';


if(currentEnv=='dev'){

}
app.use(express.static("../Front/app"))
app.use('/bower_components',express.static("../Front/bower_components"))


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/getCurrentResults', function (req, res) {
    res.send(am.getCurrentResults());
})

app.post('/runAction', function (req, res) {
    var action = req.body
    am.runActions([action], true)  
    res.send('OK');
})


app.get('/getActions', function (req, res) {
    mongo.getActions().then(function (result) {
       // console.log(result)
        res.send(result);
    })
})




app.post('/getactionsnames', function (req, res) {
    
  var requireDir = require('require-dir');
 var actionsDir = requireDir('./actoins/');
 var actionsArray = []
 for(key in actionsDir){
     actionsArray.push(key)
 }
  console.log(actionsArray,977777)
    res.send(actionsArray);

})  



app.get('/getAllLog', function (req, res) {
    mongo.getAllLog().then(function (result) {
       // console.log(result)
       
        res.send(result);
    })
})

//*************************DASHBOARD API****************************//




app.post('/getServerLog', function (req, res) {
    var from = req.body.from
    var to = req.body.to
    //create this action*****************************************************
    mongo.getServerLog()
    .then(function (result) {
        
        res.send(result);
    })
})


app.post('/getlogdata', function (req, res) {
    var from = req.body.from
    var to = req.body.to
    //create this action*****************************************************
    mongo.getLogResults(from,to)
    .then(function (result) {
        
        res.send(result);
    })
})

app.get('/runActionManual', function (req, res) {
    var actionName = req.body.actionName
    var params = req.body.params
    //create this action*****************************************************
    runAction(actionName,params)
    .then(function (result) {
       // console.log(result)
        res.send(result);
    })
})
//*************************DASHBOARD API****************************//



app.post('/setActions', function (req, res) {
  //  console.log(req.body,res.body,11212121212)
    var allActions = req.body

    insertOne(allActions, 0)

    function insertOne(oneActions, count) {
        var promise = new Promise(function (resolve, reject) {
            if (count <= oneActions.length -1) {
                mongo.addAction(allActions[count], function (result) {
                     count = count + 1
                      insertOne(oneActions, count)
                    console.log(result)
                   
                   
                })
            } else {
                res.send('ok');
                resolve('ok')
            }


        })

        return promise
    }

    for (var action in allActions) {
        (function (action) {


        })(action)
    }

})



app.get('/getAll', function (req, res) {
    res.send();
})

app.listen(3000);






setInterval(function () {
    am.getActions()
        .then(function (actions) {
            return am.runActions(actions)
        })
        /*
        .then(function (res) {
            console.log('Writing to Log', res)
            mongo.writeToLog(res)
        })
*/
        .catch(function (e) {
            console.log(e.stacke)
        })
}, 20000)






/*

setInterval(function () {

            am.getActions()
            .then(function (actions) {
                am.runActions(actions)    
            })

}, 10000)
*/