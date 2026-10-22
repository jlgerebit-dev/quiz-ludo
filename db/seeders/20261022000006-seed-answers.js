'use strict';

// The answers of the seeded match. The first correct answer of every round is
// the one that earned the round, so the rows tell the story of the match on
// their own.
module.exports = {
  async up(queryInterface) {
    const now = new Date('2026-10-18T09:05:00Z');
    const rows = [];

    const rounds = [
      { question: 1, index: 0, winner: 2, right: [2, 3, 4], wrong: [1] },
      { question: 2, index: 1, winner: 1, right: [1, 3], wrong: [2, 4] },
      { question: 3, index: 2, winner: 4, right: [4, 2], wrong: [1, 3] },
      { question: 4, index: 3, winner: 3, right: [3], wrong: [1, 2, 4] },
      { question: 5, index: 4, winner: 2, right: [2], wrong: [1, 3, 4] },
      { question: 6, index: 5, winner: 1, right: [1, 3], wrong: [2, 4] },
    ];

    for (const round of rounds) {
      round.right.forEach((seat, order) => {
        rows.push({
          session_id: 1,
          question_id: round.question,
          q_index: round.index,
          session_player_id: seat,
          choice_index: 0,
          is_correct: true,
          response_time_ms: 1500 + order * 1200 + (round.winner === seat ? 0 : 400),
          created_at: now,
        });
      });
      round.wrong.forEach((seat, order) => {
        rows.push({
          session_id: 1,
          question_id: round.question,
          q_index: round.index,
          session_player_id: seat,
          choice_index: 1,
          is_correct: false,
          response_time_ms: 3000 + order * 1500,
          created_at: now,
        });
      });
    }

    await queryInterface.bulkInsert('answers', rows, { ignoreDuplicates: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('answers', null, {});
  },
};
