var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

// Connection URL 
var url = 'mongodb://test:test12345@ds137281.mlab.com:37281/green324';
// Use connect method to connect to the Server 

/*
var newAction = {
    name: 'blabla',
    status: 'active'
}
addAction(newAction,function(){
        getAllAction(function(res){
            console.log(res)
        })
})
*/







function addAction(newAction, callback) {

    MongoClient.connect(url, function (err, db) {

        console.log(newAction, 88898989898)
        if (newAction != undefined) {
            if (newAction._id != undefined) {
                newAction._id = new ObjectID(newAction._id)
            } else {
                newAction._id = new ObjectID()
            }
        }
        var collection = db.collection("actions");
        collection.save(newAction, function (res) {
            callback(res)
        });

        db.close();
    });


}

function writeToLog(data) {
    var promise = new Promise(function (resolve, reject) {
        console.log('WWWWWWWWWWWWWWWWWWWWWWWWW', data)
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection("log");
            data.timestamp = (new Date).getTime() / 1000
            collection.save(data, function (res) {
                resolve(res)
            });

            db.close();
        });
    })


    return promise

}


function getAllAction() {
    var promise = new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection("actions");
            collection.find({}).toArray(function (err, docs) {
                resolve(docs)
            });
            db.close();
        });
    })
    return promise
}


function getLogResults(from, to) {
    var promise = new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection("log");
            collection.find({
                timestamp: {
                
                        $gte: from,
                        $lt: to
                    
                }
            }).toArray(function (err, docs) {
                // console.log(docs);
                resolve(docs)
                db.close();
            });
            // db.close();
        });
    })
    return promise
}


function getAllLog() {
    var promise = new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection("log");
            collection.find().toArray(function (err, docs) {
                // console.log(docs);
                resolve(docs)
                db.close();
            });
            // db.close();
        });
    })
    return promise
}



function updateActionLastRun(action) {
    var promise = new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            console.log(action, "ACTIONNNNNNNNN")
            var collection = db.collection("actions");
            action._id = new ObjectID(action._id)
            action.lastrun = (new Date).getTime() / 1000
            console.log(action, new ObjectID(action._id), 11111111111111111111111111111111)
            collection.save(action).then(function (res) {
                resolve(res)
            })
            db.close();
        });
    })
    return promise
}






var mongo = {}
mongo.getLogResults =getLogResults
mongo.getAllLog = getAllLog
mongo.getActions = getAllAction
mongo.writeToLog = writeToLog
mongo.addAction = addAction
mongo.updateActionLastRun = updateActionLastRun
module.exports = mongo