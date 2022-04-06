'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.User, {as: 'user', foreignKey: 'userId'})
      Event.addScope('defaultScope', {
        include: [{
          model: sequelize.models.User,
          as: 'user',
          attributes: {
            exclude: ['password']
          }
        }],
      });
    }
  }
  Event.init({
    title: DataTypes.STRING,
    notes: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Event'
  });
  return Event;
};