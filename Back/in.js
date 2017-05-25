var actionsmanager = require('./classes/actionsManager.js')
var am = new actionsmanager
console.log(am)
var mongo = require('./classes/mongo.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.post('/runAction', function (req, res) {
    var action = req.body
    am.runActions([action], true)  
    res.send('OK');
})


app.get('/getAllLog', function (req, res) {
    mongo.getAllLog().then(function (result) {
       // console.log(result)
        res.send(result);
    })
})


app.get('/getActions', function (req, res) {
    mongo.getActions().then(function (result) {
       // console.log(result)
        res.send(result);
    })
})




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