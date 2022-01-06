'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_store.init({
    user_uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    store_uuid: {
      primaryKey: true,
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'user_store',
  });
  return user_store;
};