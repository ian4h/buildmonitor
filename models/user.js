/**
 * Created by Ian on 24/09/2015.
 */

var sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes){

    var User = sequelize.define('User', {
        userName: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return User;
}