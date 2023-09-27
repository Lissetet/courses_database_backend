'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title is required'
        },
        notEmpty: {
          msg: 'Please provide a title'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A description is required'
        },
        notEmpty: {
          msg: 'Please provide a description'
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Please provide an estimated time'
        },
      },
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Please provide materials needed'
        },
      },
    },
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A user ID is required'
          },
        },
      },
    });
  };

  return Course;
};