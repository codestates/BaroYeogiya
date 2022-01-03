'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  review.init({
    uuid: DataTypes.UUID,
    user_uuid: DataTypes.UUID,
    store_uuid: DataTypes.UUID,
    content: DataTypes.TEXT,
    image: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'review',
    timestamps: false,
    freezeTableName: true,
  });
  return review;
};