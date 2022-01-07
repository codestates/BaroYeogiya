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
  });
  return store;
};