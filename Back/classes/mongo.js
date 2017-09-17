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

function getServerLog() {
    var promise = new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection("ascoltatori");
            collection.find().sort({_id: -1}).limit(10).toArray(function (err, docs) {

                var dateFromObjectId = function (objectId) {
                    
                    var linuxTime = parseInt(objectId.substring(0, 8), 16)
                  //  console.log(linuxTime,new Date(linuxTime*1000))
                    return new Date(linuxTime * 1000);
                };
                    
                for(var doc in docs) {
                    var stringObjectID = ObjectID(docs[doc]._id).toString();
                    var dateObject = dateFromObjectId(stringObjectID)
                    docs[doc].timestamp = dateObject
                //    console.log(dateObject)
                }


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
            console.log("UPDATE ACTTION", action)
            var collection = db.collection("actions");
            action._id = new ObjectID(action._id)
            action.lastrun = (new Date).getTime() / 1000
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
mongo.getServerLog =getServerLog
mongo.getAllLog = getAllLog
mongo.getActions = getAllAction
mongo.writeToLog = writeToLog
mongo.addAction = addAction
mongo.updateActionLastRun = updateActionLastRun
module.exports = mongo