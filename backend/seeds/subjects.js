exports.seed = function(knex, Promise) {
  return knex('students_subjects').del()
    .then(() => knex('professors_subjects').del())
    .then(() => knex('subjects').del())
    .then(() => knex('fields').del())
    .then(() => {
      return knex('fields').insert([
        {id: 1, name: 'Ostalo'},
        {id: 2, name: 'Dizajn'},
        {id: 3, name: 'Programiranje'},
        {id: 4, name: 'Elektrotehnika'},
        {id: 5, name: 'Gradevina'},
        {id: 6, name: 'Multimedia'},
        {id: 7, name: 'Mehatronika'},
      ]);
    })
    .then(() => {
      return knex('subjects').insert([
        {id: 1, name: 'Računalna tipografija', field_id: 2},
        {id: 2, name: 'Uredsko poslovanje', field_id: 1},
        {id: 3, name: 'Matematika I', field_id: 1},
        {id: 4, name: 'Matematika II', field_id: 1},
        {id: 5, name: 'Uvod u (X)HTML i CSS', field_id: 3},
        {id: 6, name: 'Osnove programiranja', field_id: 3},
        {id: 7, name: 'Fizika', field_id: 1},
        {id: 8, name: 'Dizajn i vizualno značenje', field_id: 2},
        {id: 9, name: 'Informacijska pismenost i kritičko razmišljanje', field_id: 1},
        {id: 10, name: 'Programiranje', field_id: 3},
        {id: 11, name: 'Grafičke tehnike', field_id: 2},
        {id: 12, name: 'Grafički programski jezici', field_id: 3},
        {id: 13, name: 'Procesi video produkcije', field_id: 6},
        {id: 14, name: '3D modeliranje', field_id: 2},
        {id: 15, name: 'Teorija i razvoj dizajna', field_id: 2},
        {id: 16, name: 'Engleski jezik za IT', field_id: 1},
        {id: 17, name: 'XML programiranje', field_id: 3},
        {id: 18, name: 'Obrada slike, zvuka i videa', field_id: 6},
        {id: 19, name: 'Produkcija zvuka', field_id: 6},
        {id: 20, name: 'Poslovni engleski jezik za IT', field_id: 1},
        {id: 21, name: 'Programiranje web aplikacija', field_id: 3},
      ]);
    })
    .then(() => {
      return knex('professors_subjects').insert([
        {subject_id: 5, professor_id: 6},
        {subject_id: 6, professor_id: 4},
        {subject_id: 17, professor_id: 5},
      ]);
    })
    .then(() => {
      const studentIds = [2, 3, 7];
      const rows = [];
      studentIds.forEach((studentId) => {
        for (let i = 1; i <= 21; ++i) {
          rows.push({
            subject_id: i,
            student_id: studentId,
            grade: Math.floor(Math.random() * 4 + 2), // 2 to 5 integer
          });
        }
      });
      return knex('students_subjects').insert(rows);
    });
};
