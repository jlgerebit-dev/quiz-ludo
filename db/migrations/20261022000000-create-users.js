'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('users', {
      user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      school_id: { type: DataTypes.STRING(32), allowNull: false },
      full_name: { type: DataTypes.STRING(120), allowNull: false },
      email: { type: DataTypes.STRING(160), allowNull: false },
      role: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'player' },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('users', {
      fields: ['school_id'],
      type: 'unique',
      name: 'uq_users_school_id',
    });
    await queryInterface.addConstraint('users', {
      fields: ['email'],
      type: 'unique',
      name: 'uq_users_email',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
