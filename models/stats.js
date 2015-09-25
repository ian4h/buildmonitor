/**
 * Created by Ian on 24/09/2015.
 */

module.exports = function(sequelize, DataTypes){

    var Stat = sequelize.define('Stats', {
        time: DataTypes.DATE,
        version: DataTypes.STRING,
        status: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models){
                Stat.belongsTo(models.Site, {
                    //foreignKey:{
                    //    allowNull: false
                    //}
                })
            }
        }
    })

    return Stat;
};