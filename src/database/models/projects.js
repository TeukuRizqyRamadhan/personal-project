'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    image: DataTypes.STRING,
    content: DataTypes.TEXT,
    node: DataTypes.BOOLEAN,
    react: DataTypes.BOOLEAN,
    golang: DataTypes.BOOLEAN,
    js: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};