// Hub Contract rule 7. YOUR WORK (Lab Step 9): the query for YOUR tables.
//
// One row per player per FINISHED game (a game whose status is 'ended'),
// with exactly these names:
//
//   session_code   the six-digit join code of the game
//   started_at     when the game started (may be null)
//   ended_at       when the game ended
//   school_id      the player's school ID, from your users table
//   nickname       the nickname the player used in that game
//   score          the player's final score
//   completed      true or false: did this player complete the game?
//                  YOUR game decides what "completed" means. Write the rule
//                  in your README, for example "answered every question".
//
// If "since" is given, return only games that ended after it.
//
// A player of Quiz Ludo completed the game when they answered at least one
// question of the match and were still in the room when it ended. The bots
// are not people, so they stay out of the results.
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT s.code AS session_code,
           s.started_at,
           s.ended_at,
           u.school_id,
           p.nickname,
           p.score,
           (p.is_bot = FALSE AND EXISTS (
              SELECT 1 FROM answers a
               WHERE a.session_id = p.session_id
                 AND a.session_player_id = p.session_player_id
           )) AS completed
      FROM sessions s
      JOIN session_players p ON p.session_id = s.session_id
      JOIN users u ON u.user_id = p.user_id
     WHERE s.status = 'ended'
       AND s.ended_at IS NOT NULL
       AND p.is_bot = FALSE
       AND (CAST(:since AS timestamptz) IS NULL OR s.ended_at > CAST(:since AS timestamptz))
     ORDER BY s.ended_at, p.score DESC
  `;

  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { since: since ? since.toISOString() : null },
  });
}

module.exports = { findFinishedGamePlayers };
