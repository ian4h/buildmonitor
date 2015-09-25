/**
 * Created by Ian on 24/09/2015.
 */


module.exports = function(sequelize, DataTypes){

    var Site = sequelize.define('Site', {
        server: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
        },
        version: {
            type: DataTypes.STRING
        },
        environment: {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(model){
                Site.hasMany(model.Stats)
            }
        }
    });

    return Site
}