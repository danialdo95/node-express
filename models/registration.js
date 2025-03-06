const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Registration = sequelize.define('registration', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    studentID: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    teacherID: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Registration;