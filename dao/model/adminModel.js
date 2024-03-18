// loginid loginpwd name
const { DataTypes } = require('sequelize')
const sequelize = require('../dbConnect')

module.exports = sequelize.define('admin', {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
