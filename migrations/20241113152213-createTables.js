"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      plu: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.createTable("Shops", {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.createTable("Stocks", {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      shopUid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Shops",
          key: "uuid",
        },
        onDelete: "CASCADE",
      },
      productUid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Products",
          key: "uuid",
        },
        onDelete: "CASCADE",
      },
      quantityShelf: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      quantityOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Stocks");
    await queryInterface.dropTable("Shops");
    await queryInterface.dropTable("Products");
  },
};
