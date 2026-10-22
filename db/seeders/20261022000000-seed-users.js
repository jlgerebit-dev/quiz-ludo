'use strict';

// The library people the results of a match are reported for.
module.exports = {
  async up(queryInterface) {
    const now = new Date('2026-10-18T08:00:00Z');

    await queryInterface.bulkInsert(
      'users',
      [
        {
          user_id: 1,
          school_id: 'SU-2024-0001',
          full_name: 'Ana Dela Cruz',
          email: 'ana.delacruz@sorsogonstate.edu',
          role: 'player',
          created_at: now,
        },
        {
          user_id: 2,
          school_id: 'SU-2024-0002',
          full_name: 'Ben Santos',
          email: 'ben.santos@sorsogonstate.edu',
          role: 'player',
          created_at: now,
        },
        {
          user_id: 3,
          school_id: 'SU-2024-0003',
          full_name: 'Carla Ramos',
          email: 'carla.ramos@sorsogonstate.edu',
          role: 'player',
          created_at: now,
        },
        {
          user_id: 4,
          school_id: 'SU-2024-0004',
          full_name: 'Dan Villanueva',
          email: 'dan.villanueva@sorsogonstate.edu',
          role: 'player',
          created_at: now,
        },
      ],
      { ignoreDuplicates: true }
    );

    // The seed rows carry their own numbers, so the counter of the table has
    // to go back to the front of the rows.
    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('users', 'user_id'), COALESCE((SELECT MAX(user_id) FROM users), 1))`
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
