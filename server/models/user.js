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
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false,
    freezeTableName: true,
  });
  return user;
};