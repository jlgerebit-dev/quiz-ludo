'use strict';

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('session_players', {
      session_player_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      session_id: { type: DataTypes.INTEGER, allowNull: false },
      // the library person behind the seat, null for a bot
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      nickname: { type: DataTypes.STRING(40), allowNull: false },
      color: { type: DataTypes.STRING(10), allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      // 0 = base, 1 to 27 = on the ring, 28 = home
      token_1_pos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      token_2_pos: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      is_bot: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      last_seen: { type: DataTypes.DOUBLE, allowNull: true },
      joined_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('session_players', {
      fields: ['session_id'],
      type: 'foreign key',
      name: 'fk_session_players_session',
      references: { table: 'sessions', field: 'session_id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_session_players_user',
      references: { table: 'users', field: 'user_id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    // one seat per account per game
    await queryInterface.addConstraint('session_players', {
      fields: ['session_id', 'user_id'],
      type: 'unique',
      name: 'uq_session_players_session_user',
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['session_id', 'nickname'],
      type: 'unique',
      name: 'uq_session_players_session_nickname',
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['color'],
      type: 'check',
      name: 'ck_session_players_color',
      where: { color: ['Red', 'Green', 'Yellow', 'Blue'] },
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['token_1_pos'],
      type: 'check',
      name: 'ck_session_players_token_1_pos',
      where: { token_1_pos: { [require('sequelize').Op.between]: [0, 28] } },
    });
    await queryInterface.addConstraint('session_players', {
      fields: ['token_2_pos'],
      type: 'check',
      name: 'ck_session_players_token_2_pos',
      where: { token_2_pos: { [require('sequelize').Op.between]: [0, 28] } },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('session_players');
  },
};
