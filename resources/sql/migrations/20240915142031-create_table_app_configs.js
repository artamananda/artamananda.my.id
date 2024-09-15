"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("app_configs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      key: {
        type: Sequelize.DataTypes.STRING,
      },
      value: {
        type: Sequelize.DataTypes.STRING,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("app_configs");
  },
};
