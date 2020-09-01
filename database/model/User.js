const { Model, DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    class User extends Model { }

    User.init({
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        id: DataTypes.INTEGER,
        name: DataTypes.STRING
    }, { sequelize, createdAt: false, updatedAt: false, modelName: 'user'})

    return User

}