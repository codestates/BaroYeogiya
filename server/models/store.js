'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // store.belongsToMany(models.user, {
      //   through: 'user_store',
      //   foreignKey: 'uuid'
      // });
      store.hasOne(models.user_store, { foreignKey: 'store_uuid', sourceKey: 'uuid', onDelete: 'cascade' });
      store.hasOne(models.review, { foreignKey: 'store_uuid', sourceKey: 'uuid', onDelete: 'cascade' });
    }
  };
  store.init({
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    address: DataTypes.STRING,
    image: DataTypes.TEXT,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'store',
    timestamps: false,
    freezeTableName: true
  });
  return store;
};