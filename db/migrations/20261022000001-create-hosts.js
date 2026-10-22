'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('hosts', {
      host_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      username: { type: DataTypes.STRING(50), allowNull: false },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('hosts', {
      fields: ['username'],
      type: 'unique',
      name: 'uq_hosts_username',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('hosts');
  },
};
