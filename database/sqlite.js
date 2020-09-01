const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({ dialect: 'sqlite', storage: './banca.db',logging: false})

const User = require('./model/User')(sequelize);
const Operation = require('./model/Operation')(sequelize);

Operation.hasOne(User, { foreignKey: 'operation_id' });

(async () => {
    await sequelize.sync();
})();

module.exports = { User, Operation, sequelize }