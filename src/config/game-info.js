// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: check that every value below is your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'quiz-ludo',          // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Quiz Ludo',          // the name players will see
  team: 'Group 10 (3-1)',     // your group's name and section, for example Bookworms (3-1)
  developer: 'jlgerebit-dev', // YOUR GitHub username: this build is yours
  description: 'A multiplayer quiz and dice board game for classrooms and libraries: answer first, roll the dice, and race your tokens home.',
  min_players: 1,             // change to the limits your game is designed for
  max_players: 4,
  version: pkg.version,       // read from package.json, do not edit here
};
