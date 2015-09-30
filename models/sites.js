/**
 * Created by Ian on 24/09/2015.
 */


module.exports = function(sequelize, DataTypes){

    var Sites = sequelize.define('Sites', {
        server: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
            unique: true
        },
        environment: {
            type: DataTypes.STRING
        },
        status : {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(model){
                Sites.hasMany(model.Stats)
            }
        }
    });

    return Sites
}