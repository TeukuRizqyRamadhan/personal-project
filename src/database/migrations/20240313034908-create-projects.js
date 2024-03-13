'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      end_date: {
        type: Sequelize.DATE,
        validate: {
          isDate: true,
        },
      },
      image: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      node: {
        type: Sequelize.BOOLEAN
      },
      react: {
        type: Sequelize.BOOLEAN
      },
      golang: {
        type: Sequelize.BOOLEAN
      },
      js: {
        type: Sequelize.BOOLEAN
      },
      diff_date: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};