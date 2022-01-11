'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user.belongsToMany(models.store, {
      //   through: 'user_store',
      //   foreignKey: 'uuid'
      // });
      user.hasOne(models.user_store, { foreignKey: 'user_uuid', sourceKey: 'uuid', onDelete: 'cascade' });
      user.hasOne(models.review, { foreignKey: 'user_uuid', sourceKey: 'uuid', onDelete: 'cascade' });
    }
  };
  user.init({
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: DataTypes.STRING,
    pw: DataTypes.STRING,
    name: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false,
    freezeTableName: true
  });
  return user;
};