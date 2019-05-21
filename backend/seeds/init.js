
exports.seed = function(knex, Promise) {
  return knex('roles').del().then(() => {
    return knex('roles').insert([
      {
        id: 1,
        name: 'student',
        is_professor: false,
        is_student: true,
        is_admin: false
      },
      {
        id: 2,
        name: 'professor',
        is_professor: true,
        is_student: false,
        is_admin: false
      },
      {
        id: 3,
        name: 'admin',
        is_professor: false,
        is_student: false,
        is_admin: true
      }
    ])
  }).then(() => {
    return knex('users').insert({
      id: 1,
      username: 'korijen',
      display_name: 'Glavni',
      password_hash: '$2b$10$UwQ8c0pYPo2MqrA48XGwFOI6bEp9qRLnzU54pEOk.jYEBXpj39XLC' // NecesRazbojnice
    });
  }).then(() => {
    return knex('users_roles').insert({
      user_id: 1,
      role_id: 3
    });
  });
};
