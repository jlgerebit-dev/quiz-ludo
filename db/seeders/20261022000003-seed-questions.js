'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date('2026-10-18T08:10:00Z');
    const choices = (list) => JSON.stringify(list);

    await queryInterface.bulkInsert(
      'questions',
      [
        {
          question_id: 1,
          question_set_id: 1,
          question_text: 'Who wrote the novel Noli Me Tangere?',
          choices_json: choices(['Jose Rizal', 'Juan Luna', 'Francisco Balagtas', 'Pedro Paterno']),
          correct_index: 0,
          time_limit_sec: 15,
          created_at: now,
        },
        {
          question_id: 2,
          question_set_id: 1,
          question_text: 'What is the capital of the Philippines?',
          choices_json: choices(['Cebu City', 'Davao City', 'Manila', 'Quezon City']),
          correct_index: 2,
          time_limit_sec: 10,
          created_at: now,
        },
        {
          question_id: 3,
          question_set_id: 1,
          question_text: 'How many sides does a hexagon have?',
          choices_json: choices(['Five', 'Six', 'Seven', 'Eight']),
          correct_index: 1,
          time_limit_sec: 10,
          created_at: now,
        },
        {
          question_id: 4,
          question_set_id: 1,
          question_text: 'Which planet is known as the Red Planet?',
          choices_json: choices(['Venus', 'Jupiter', 'Mercury', 'Mars']),
          correct_index: 3,
          time_limit_sec: 12,
          created_at: now,
        },
        {
          question_id: 5,
          question_set_id: 1,
          question_text: 'What is the chemical symbol of gold?',
          choices_json: choices(['Ag', 'Au', 'Gd', 'Go']),
          correct_index: 1,
          time_limit_sec: 20,
          created_at: now,
        },
        {
          question_id: 6,
          question_set_id: 1,
          question_text: 'Which organ pumps blood through the body?',
          choices_json: choices(['Liver', 'Lung', 'Heart', 'Kidney']),
          correct_index: 2,
          time_limit_sec: 15,
          created_at: now,
        },
        {
          question_id: 7,
          question_set_id: 2,
          question_text: 'In which year did the Philippines gain independence?',
          choices_json: choices(['1898', '1918', '1946', '1956']),
          correct_index: 2,
          time_limit_sec: 15,
          created_at: now,
        },
        {
          question_id: 8,
          question_set_id: 2,
          question_text: 'Who was the first president of the Philippines?',
          choices_json: choices(['Ferdinand Marcos', 'Emilio Aguinaldo', 'Sergio Osmena', 'Manuel Roxas']),
          correct_index: 1,
          time_limit_sec: 15,
          created_at: now,
        },
        {
          question_id: 9,
          question_set_id: 2,
          question_text: 'What is the largest island in the Philippines?',
          choices_json: choices(['Luzon', 'Mindanao', 'Negros', 'Panay']),
          correct_index: 1,
          time_limit_sec: 15,
          created_at: now,
        },
        {
          question_id: 10,
          question_set_id: 2,
          question_text: 'The Maria Clara River is in which city?',
          choices_json: choices(['Legazpi City', 'Naga City', 'Sorsogon City', 'Iriga City']),
          correct_index: 1,
          time_limit_sec: 20,
          created_at: now,
        },
      ],
      { ignoreDuplicates: true }
    );

    await queryInterface.sequelize.query(
      `SELECT setval(pg_get_serial_sequence('questions', 'question_id'), COALESCE((SELECT MAX(question_id) FROM questions), 1))`
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('questions', null, {});
  },
};
