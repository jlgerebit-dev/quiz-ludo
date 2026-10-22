'use strict';

// The demo host account that is seeded on the first run:
//   username: teacher
//   password: password
// Change the password before you use the game in a real room.
const crypto = require('crypto');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'hosts',
      [
        {
          host_id: 1,
          username: 'teacher',
          password_hash: hashPassword('password'),
          created_at: new Date('2026-10-18T08:00:00Z'),
        },
      ],
      { ignoreDuplicates: true }
    );

    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('hosts', 'host_id'), COALESCE((SELECT MAX(host_id) FROM hosts), 1))`
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('hosts', null, {});
  },
};
