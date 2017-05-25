// Declaring the modules dependencies 
var MongoPortable = require("mongo-portable"),
    FileSystemStore = require("file-system-store");
 
// Instantiates a new ddbb object by passing a ddbb name 
var db =  MongoPortable("TEST");
 
// Tells MongoPortable to use this store to persist the data 
db.addStore(new FileSystemStore({
    // The path where the database will be stored 
    ddbb_path: "MY_PHISICAL_DDBB_PATH",
    // Whether the persistance will be asynchronous or not 
    sync: true
}));
 
// Creates a new collection named "users"  
//      (if it's already created, it will just return it instead) 
var users = db.collection("users");
 
// Inserts a new document into the collection 
var document = users.insert({ name: "John", lastName: "Abruzzi" });
console.log(document);  // -> { name: "John", lastName: "Abruzzi" } 
 
// Creates a cursor with the query information, ready to be fetched 
var cursor = users.find({ name: "John" });
 
// Iterates over the cursor, obtaining each document that matchs the query 
cursor.forEach(function(doc) {
    console.log(doc);  // -> { name: "John", lastName: "Abruzzi" } 
});


/*
class dbQuerys{
    constructor()
    insertActions(){
        return this.plan
    }
    getActions(plan)
    {
        this.plan = plan
    }
}*/