'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('answers', {
      answer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      question_id: { type: DataTypes.INTEGER, allowNull: false },
      // the index of the question inside the session, so a player may answer
      // each question of the set only once
      q_index: { type: DataTypes.INTEGER, allowNull: false },
      session_player_id: { type: DataTypes.INTEGER, allowNull: false },
      choice_index: { type: DataTypes.INTEGER, allowNull: false },
      is_correct: { type: DataTypes.BOOLEAN, allowNull: false },
      // milliseconds from the moment the question appeared
      response_time_ms: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('answers', {
      fields: ['session_id'],
      type: 'foreign key',
      name: 'fk_answers_session',
      references: { table: 'sessions', field: 'session_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('answers', {
      fields: ['question_id'],
      type: 'foreign key',
      name: 'fk_answers_question',
      references: { table: 'questions', field: 'question_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('answers', {
      fields: ['session_player_id'],
      type: 'foreign key',
      name: 'fk_answers_session_player',
      references: { table: 'session_players', field: 'session_player_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('answers', {
      fields: ['session_id', 'q_index', 'session_player_id'],
      type: 'unique',
      name: 'uq_answers_session_question_player',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('answers');
  },
};
