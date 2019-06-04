exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (t) => {
            t.increments('id').unsigned().primary();
            t.string('username').notNull();
            t.string('display_name').notNull();
            t.string('password_hash').notNull();
        }),
        knex.schema.createTable('roles', (t) => {
            t.increments('id').unsigned().primary();
            t.string('name').notNull();
            t.boolean('is_professor').notNull();
            t.boolean('is_student').notNull();
            t.boolean('is_admin').notNull();
        }),
        knex.schema.createTable('users_roles', (t) => {
            t.increments('id').unsigned().primary();
            t.integer('user_id').unsigned().notNull().references('users.id');
            t.integer('role_id').unsigned().notNull().references('roles.id');
        }),
        knex.schema.createTable('fields', (t) => {
            t.increments('id').unsigned().primary();
            t.string('name').notNull();
        }),
        knex.schema.createTable('subjects', (t) => {
            t.increments('id').unsigned().primary();
            t.integer('field_id').unsigned().notNull().references('fields.id');
            t.string('name').notNull();
            t.boolean('mandatory').notNull().defaultTo(false);
        }),
        knex.schema.createTable('students_subjects', (t) => {
            t.increments('id').unsigned().primary();
            t.integer('student_id').unsigned().notNull().references('users.id');
            t.integer('subject_id').unsigned().notNull().references('subjects.id');
            t.integer('grade').unsigned();
        }),
        knex.schema.createTable('professors_subjects', (t) => {
            t.increments('id').unsigned().primary();
            t.integer('professor_id').unsigned().notNull().references('users.id');
            t.integer('subject_id').unsigned().notNull().references('subjects.id');
        }),
        knex.schema.createTable('themes', (t) => {
            t.increments('id').unsigned().primary();
            t.integer('field_id').unsigned().notNull().references('fields.id');
            t.integer('student_id').unsigned().notNull().references('users.id');
            t.integer('professor_id').unsigned().references('users.id');
            t.string('name').notNull();
            t.string('description').notNull();
        }),
    ]);
};



exports.down = function(knex, Promise) {
  
};
