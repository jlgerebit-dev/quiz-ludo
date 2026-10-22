'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('questions', {
      question_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      question_set_id: { type: DataTypes.INTEGER, allowNull: false },
      question_text: { type: DataTypes.TEXT, allowNull: false },
      // JSON array of 2 to 4 choice strings
      choices_json: { type: DataTypes.TEXT, allowNull: false },
      // 0 based index of the correct choice, never sent to a player
      correct_index: { type: DataTypes.INTEGER, allowNull: false },
      time_limit_sec: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 15 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('questions', {
      fields: ['question_set_id'],
      type: 'foreign key',
      name: 'fk_questions_question_set',
      references: { table: 'question_sets', field: 'question_set_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('questions', {
      fields: ['time_limit_sec'],
      type: 'check',
      name: 'ck_questions_time_limit_sec',
      where: { time_limit_sec: { [require('sequelize').Op.between]: [5, 60] } },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('questions');
  },
};
