'use strict';

// One finished match, so the Library Game Hub has something to read.
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'sessions',
      [
        {
          session_id: 1,
          code: '482913',
          host_id: 1,
          question_set_id: 1,
          status: 'ended',
          current_question_index: 5,
          q_started_at: null,
          round_winner_id: null,
          roll_pending: false,
          roll_deadline: null,
          last_event: 'Ana Dela Cruz brought both tokens home and wins the match!',
          last_die: 4,
          winner_nickname: 'Ana Dela Cruz',
          started_at: new Date('2026-10-18T09:00:00Z'),
          ended_at: new Date('2026-10-18T09:24:00Z'),
          created_at: new Date('2026-10-18T08:55:00Z'),
        },
      ],
      { ignoreDuplicates: true }
    );

    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('sessions', 'session_id'), COALESCE((SELECT MAX(session_id) FROM sessions), 1))`
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sessions', null, {});
  },
};
