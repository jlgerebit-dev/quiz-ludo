'use strict';

// The four people who played the seeded match. They are all human players,
// so the results of the hub list them.
module.exports = {
  async up(queryInterface) {
    const now = new Date('2026-10-18T09:00:00Z');

    await queryInterface.bulkInsert(
      'session_players',
      [
        {
          session_player_id: 1,
          session_id: 1,
          user_id: 1,
          nickname: 'Ana Dela Cruz',
          color: 'Red',
          score: 950,
          token_1_pos: 28,
          token_2_pos: 28,
          is_bot: false,
          last_seen: null,
          joined_at: now,
        },
        {
          session_player_id: 2,
          session_id: 1,
          user_id: 2,
          nickname: 'Ben Santos',
          color: 'Green',
          score: 700,
          token_1_pos: 28,
          token_2_pos: 21,
          is_bot: false,
          last_seen: null,
          joined_at: now,
        },
        {
          session_player_id: 3,
          session_id: 1,
          user_id: 3,
          nickname: 'Carla Ramos',
          color: 'Yellow',
          score: 500,
          token_1_pos: 25,
          token_2_pos: 18,
          is_bot: false,
          last_seen: null,
          joined_at: now,
        },
        {
          session_player_id: 4,
          session_id: 1,
          user_id: 4,
          nickname: 'Dan Villanueva',
          color: 'Blue',
          score: 350,
          token_1_pos: 20,
          token_2_pos: 12,
          is_bot: false,
          last_seen: null,
          joined_at: now,
        },
      ],
      { ignoreDuplicates: true }
    );

    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('session_players', 'session_player_id'), COALESCE((SELECT MAX(session_player_id) FROM session_players), 1))`
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('session_players', null, {});
  },
};
