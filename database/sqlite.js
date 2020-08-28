var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connect to SQLite Database')

        db.run(`     
                create table user(
                    id integer primary key,
                    name TEXT
                );          
            `,
            (err) => {
                if (err) {
                    console.log("La base de datos ya ha sido creada");
                } else {
                    db.run(`
                    create table operation(
                        id integer primary key,
                        type TEXT,
                        idUser integer,
                        symbol TEXT,
                        shares TEXT,
                        price NUMERIC,
                        timestamp TEXT,
                        foreign key(idUser) references user(id)
                    );`, (err2 => {

                        if (!err2) {
                            console.log("Base de datos creada");
                        }

                    }))


                }
            });
    }
});

db.query = function (sql, params) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.all(sql, params, function (error, rows) {
        if (error)
          reject(error);
        else
          resolve({ rows: rows });
      });
    });
  };


module.exports = db
