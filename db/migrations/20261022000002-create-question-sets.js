'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('question_sets', {
      question_set_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      // null means the shared sample set that every host may use
      host_id: { type: DataTypes.INTEGER, allowNull: true },
      title: { type: DataTypes.STRING(160), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      category: { type: DataTypes.STRING(60), allowNull: false, defaultValue: 'General' },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('question_sets', {
      fields: ['host_id'],
      type: 'foreign key',
      name: 'fk_question_sets_host',
      references: { table: 'hosts', field: 'host_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('question_sets');
  },
};
