
const { Sequelize, Model, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize({ dialect: 'sqlite', storage: './banca.db',logging: false})

const User = require('./model/User')(sequelize);
const Operation = require('./model/Operation')(sequelize);

Operation.hasOne(User, { foreignKey: 'operation_id' });
//User.belongsTo(Operation,{foreignKey: 'operation_id'});

/* var obj = {"id": 1002494, "type": "buy", "user": {"id": 4737919, "name": "Danny"}, "symbol": "POR", "shares": 60, "price": 154.76, "timestamp": "2014-12-28 14:06:13"};

(async () => {
    await sequelize.sync();
    var operation = await Operation.create(obj).catch(console.log)
    var user = await User.create(obj.user).catch(console.log)
    await operation.setUser(user);
    var operation = await Operation.findAll({include:[{model:User,attributes:{exclude:['operation_id']}}],raw:true,nest:true}).catch(console.log)

    console.log(operation)
})(); */

(async () => {
    await sequelize.sync();
})();

module.exports = { User, Operation, sequelize }


/*var sqlite3 = require('sqlite3');
var { open } = require('sqlite');

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


const openDB = open(DBSOURCE);

module.exports = openDB;*/




