'use strict';

// The shared sample set (host_id is null, every host may use it) and one set
// that belongs to the demo host.
module.exports = {
  async up(queryInterface) {
    const now = new Date('2026-10-18T08:10:00Z');

    await queryInterface.bulkInsert(
      'question_sets',
      [
        {
          question_set_id: 1,
          host_id: null,
          title: 'Sample Mixed Bag',
          description: 'A short sample set so a host can start a room in one minute.',
          category: 'General',
          created_at: now,
        },
        {
          question_set_id: 2,
          host_id: 1,
          title: 'Philippine History',
          description: 'Questions written by the demo host for the class.',
          category: 'History',
          created_at: now,
        },
      ],
      { ignoreDuplicates: true }
    );

    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('question_sets', 'question_set_id'), COALESCE((SELECT MAX(question_set_id) FROM question_sets), 1))`
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('question_sets', null, {});
  },
};
