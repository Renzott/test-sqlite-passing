var sqlite3 = require('sqlite3');
var { open } = require('sqlite');

/* Construccion de la base de datos */
sqlite3.verbose();
const DBSOURCE = "db.sqlite"

var database = new sqlite3.Database(DBSOURCE);

database.serialize(()=>{

    var userTable = `
    create table user(
		id integer,
        name TEXT
    )`;

    var operationTable = `
    create table operation(
		id integer primary key,
        type TEXT,
		idUser integer,
		symbol TEXT,
		shares integer,
		price decimal(10,2),
		timestamp TEXT,
		foreign key(idUser) references user(id)
    )`;

    database.run(userTable,(err) => {
        if(err){
            console.log("Ya existe una base de datos");
        }
    })

    database.run(operationTable,(err) => {
        if(!err){
            console.log("Base de datos creada")
        }
    })

})

database.close();

/* SQLite Async */

const openDB = open(DBSOURCE);

module.exports = openDB;


