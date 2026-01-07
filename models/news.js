const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const News = sequelize.define('news', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    }
}, {
    tableName: 'api_news',
    timestamps: true
});

module.exports = News;