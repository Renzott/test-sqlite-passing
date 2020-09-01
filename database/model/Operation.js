const { Model, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    class Operation extends Model { }

    Operation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        type: DataTypes.STRING(4),
        symbol: DataTypes.STRING(3),
        shares: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
        timestamp: DataTypes.TEXT
    }, { sequelize, createdAt: false, updatedAt: false, modelName: 'operation'})

    return Operation

}
