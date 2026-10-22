'use strict';

// Closes the circle between the two tables of the ERD: sessions already
// exists, and now it may point at the player who won the current round.
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('sessions', {
      fields: ['round_winner_id'],
      type: 'foreign key',
      name: 'fk_sessions_round_winner',
      references: { table: 'session_players', field: 'session_player_id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('sessions', 'fk_sessions_round_winner');
  },
};
