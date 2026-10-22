'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('sessions', {
      session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      // the six digit join code, 100000 to 999999
      code: { type: DataTypes.STRING(6), allowNull: false },
      host_id: { type: DataTypes.INTEGER, allowNull: false },
      question_set_id: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'waiting' },
      current_question_index: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      q_started_at: { type: DataTypes.DOUBLE, allowNull: true },
      // session_players.session_player_id of the player who won the round
      round_winner_id: { type: DataTypes.INTEGER, allowNull: true },
      roll_pending: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      roll_deadline: { type: DataTypes.DOUBLE, allowNull: true },
      last_event: { type: DataTypes.STRING(255), allowNull: true },
      last_die: { type: DataTypes.INTEGER, allowNull: true },
      winner_nickname: { type: DataTypes.STRING(40), allowNull: true },
      started_at: { type: DataTypes.DATE, allowNull: true },
      ended_at: { type: DataTypes.DATE, allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('sessions', {
      fields: ['code'],
      type: 'unique',
      name: 'uq_sessions_code',
    });
    await queryInterface.addConstraint('sessions', {
      fields: ['host_id'],
      type: 'foreign key',
      name: 'fk_sessions_host',
      references: { table: 'hosts', field: 'host_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('sessions', {
      fields: ['question_set_id'],
      type: 'foreign key',
      name: 'fk_sessions_question_set',
      references: { table: 'question_sets', field: 'question_set_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('sessions', {
      fields: ['status'],
      type: 'check',
      name: 'ck_sessions_status',
      where: { status: ['waiting', 'playing', 'ended'] },
    });
    // round_winner_id gets its foreign key in a later migration, because
    // session_players does not exist yet and the two tables point at each other.
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sessions');
  },
};
