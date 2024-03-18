const { DataTypes } = require('sequelize')
const sequelize = require('../dbConnect')

module.exports = sequelize.define('banner', {
    midImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bigImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
