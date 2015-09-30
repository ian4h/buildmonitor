/**
 * Created by Ian on 24/09/2015.
 */

module.exports = function(sequelize, DataTypes){

    var Stat = sequelize.define('Stats', {
        time: DataTypes.DATE,
        version: DataTypes.STRING,
        status: DataTypes.STRING,
        sourceBuildNumber: DataTypes.STRING,
        buildNumber: DataTypes.STRING,
        buildID: DataTypes.STRING,
        buildTag: DataTypes.STRING,
        gitCommit: DataTypes.STRING,
        gitBranch: DataTypes.STRING,
        buildTime: DataTypes.DATE,
        environment: DataTypes.STRING,
        appVersion: DataTypes.STRING,
        javaVersion: DataTypes.STRING
    },{
        classMethods: {
            associate: function(models){
                Stat.belongsTo(models.Sites, {
                    //foreignKey:{
                    //    allowNull: false
                    //}
                })
            }
        }
    })

    return Stat;
};