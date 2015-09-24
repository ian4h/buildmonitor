/**
 * Created by Ian on 24/09/2015.
 */

module.exports = function(sequelize, DataTypes){

    var Stat = sequelize.define('Stats', {
        time: DataTypes.DATE,
        server: DataTypes.STRING,
        url: DataTypes.STRING,
        version: DataTypes.STRING,
    },{
        classMethods: {
            associate: function(models){
                Stat.belongsTo(models.Site, {
                    onDelete: "CASCADE",
                    foreignKey:{
                        allowNull: false
                    }
                })
            }
        }
    })

    return Stat;
};