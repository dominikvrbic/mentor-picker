
exports.seed = function (knex, Promise) {
  return knex('users_roles').del()
    .then(() => knex('users').del())
    .then(() => knex('roles').del())
    .then(() => {
      return knex('roles').insert([
        {
          id: 1,
          name: 'admin',
          is_professor: false,
          is_student: false,
          is_admin: true
        },
        {
          id: 2,
          name: 'student',
          is_professor: false,
          is_student: true,
          is_admin: false
        },
        {
          id: 3,
          name: 'professor',
          is_professor: true,
          is_student: false,
          is_admin: false
        },
      ]);
    })
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          username: 'korijen',
          display_name: 'Glavni',
          password_hash: '$2b$10$UwQ8c0pYPo2MqrA48XGwFOI6bEp9qRLnzU54pEOk.jYEBXpj39XLC' // NecesRazbojnice
        },
        {
          id: 2,
          username: 'ivica',
          display_name: 'Student Ivica',
          password_hash: '$2b$10$bgoCXvzRhbt5Ab8JszJKMejEuEa.gwTTrYteNa.WmF0AspnWvgOvu' // test
        },
        {
          id: 3,
          username: 'francek',
          display_name: 'Student Francek',
          password_hash: '$2b$10$bgoCXvzRhbt5Ab8JszJKMejEuEa.gwTTrYteNa.WmF0AspnWvgOvu' // test
        },
        {
          id: 4,
          username: 'zlatko',
          display_name: 'Profesor Zlatko',
          password_hash: '$2b$10$bgoCXvzRhbt5Ab8JszJKMejEuEa.gwTTrYteNa.WmF0AspnWvgOvu' // test
        },
        {
          id: 5,
          username: 'vesna',
          display_name: 'Profesorica Vesna',
          password_hash: '$2b$10$bgoCXvzRhbt5Ab8JszJKMejEuEa.gwTTrYteNa.WmF0AspnWvgOvu' // test
        },
        {
          id: 6,
          username: 'chicha',
          display_name: 'Drug Chicha',
          password_hash: '$2b$10$bgoCXvzRhbt5Ab8JszJKMejEuEa.gwTTrYteNa.WmF0AspnWvgOvu' // test
        },
        {
          id: 7,
          username: 'gordan',
          display_name: 'Student Gordan Bez Zemlje',
          password_hash: '$2b$10$bgoCXvzRhbt5Ab8JszJKMejEuEa.gwTTrYteNa.WmF0AspnWvgOvu' // test
        },
      ]);
    })
    .then(() => {
      return knex('users_roles').insert([
        {
          user_id: 1,
          role_id: 1,
        },
        {
          user_id: 2,
          role_id: 2,
        },
        {
          user_id: 3,
          role_id: 2,
        },
        {
          user_id: 4,
          role_id: 3,
        },
        {
          user_id: 5,
          role_id: 3
        },
        {
          user_id: 6,
          role_id: 3
        },
        {
          user_id: 7,
          role_id: 2
        },
      ]);
    });
};
