import db from './db';

export function userById(userID) {
    return db('users').where({
        id: userID
    }).first();
}

export function userByName(username) {
    return db('users').where({
        username
    }).first();
}

export function rolesForUser(userID) {
    return db('users_roles')
        .join('roles', 'roles.id', 'users_roles.role_id')
        .where({
            user_id: userID
        });
}

export function fields() {
    return db('fields');
}

export async function professorsForField(fieldID) {
    return db
        .select('id', 'username', 'display_name')
        .from('users')
        .whereIn('id', (q) => {
            return q
                .select('professors_subjects.professor_id')
                .from('professors_subjects')
                .join('subjects', 'subjects.id', 'professors_subjects.subject_id')
                .where({
                    field_id: fieldID
                });
        });
}

export async function getTheme(userID) {
    const theme = await db.select(
            'themes.id',
            'themes.field_id',
            'themes.name',
            'themes.description',
            'themes.professor_id',
            'professor.username as professor_name',
        )
        .from('themes')
        .leftJoin('users as professor', 'professor.id', 'themes.professor_id')
        .where({
            student_id: userID
        }).first();
    if (!theme) {
        return null;
    }

    const professors = await db
        .select('professor_id')
        .from('themes_professors')
        .where({
            theme_id: theme.id
        });
    return {
        field: theme.field_id,
        title: theme.name,
        description: theme.description,
        professorID: theme.professor_id,
        professorName: theme.professor_name,
        professors: professors.map(professor => professor.professor_id),
    };
}

export async function setTheme(userID, themeData) {
    let theme = await db('themes').where({
        student_id: userID
    }).first();
    if (theme) {
        await db('themes')
            .where({
                student_id: userID
            })
            .update({
                field_id: themeData.field,
                name: themeData.title,
                description: themeData.description,
            });
    } else {
        await db('themes')
            .insert({
                student_id: userID,
                field_id: themeData.field,
                name: themeData.title,
                description: themeData.description,
            });
        theme = await db('themes').where({
            student_id: userID
        }).first();
    }
    await db('themes_professors')
        .where('theme_id', theme.id)
        .del();

    const newRows = themeData.professors.map((professorID) => {
        return {
            professor_id: professorID,
            theme_id: theme.id,
        };
    })
    await db('themes_professors').insert(newRows);
}

export function getThemesForProfessor(professorID) {
    return db.select(
            'themes.*',
            'users.username',
            'users.display_name',
        )
        .from('themes')
        .join('themes_professors', 'themes_professors.theme_id', 'themes.id')
        .join('users', 'themes.student_id', 'users.id')
        .where({
            'themes_professors.professor_id': professorID
        })
        .where(q => q.whereNull('themes.professor_id').orWhere({
            'themes.professor_id': professorID
        }))
        .orWhere({
            'themes.professor_id': professorID
        });
    // .orderByRaw(`
    //     (
    //         ((
    //             SELECT AVG(grade)
    //             FROM students_subjects
    //             WHERE students_subjects.student_id = themes.student_id
    //         ) / 5.0) * 0.7
    //         +
    //         (CAST(
    //             EXISTS(
    //                 SELECT 1
    //                 FROM students_subjects
    //                 INNER JOIN subjects ON subjects.id = students_subjects.subject_id
    //                 WHERE students_subjects.student_id = themes.student_id
    //                 AND subjects.field_id = themes.field_id
    //                 AND students_subjects.professor_id = ?
    //             ) AS FLOAT)) * 0.1
    //         +
    //         ((
    //             SELECT AVG(grade)
    //             FROM students_subjects
    //             INNER JOIN subjects ON subjects.id = students_subjects.subject_id
    //             WHERE students_subjects.student_id = themes.student_id
    //               AND subjects.field_id = themes.field_id
    //         ) / 5.0) * 0.3
    //     )
    //     DESC
    // `, [professorID]);
}

export async function acceptTheme(professorID, themeID) {
    return db('themes')
        .where({
            id: themeID
        })
        .update({
            professor_id: professorID
        });
}

export async function unacceptTheme(professorID, themeID) {
    return db('themes')
        .where({
            professor_id: professorID,
            id: themeID,
        })
        .update({
            professor_id: null
        });
}