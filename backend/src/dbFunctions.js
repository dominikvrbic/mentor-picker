import db from './db';

export function userById(userID) {
    return db('users').where({ id: userID }).first();
}

export function userByName(username) {
    return db('users').where({ username }).first();
}

export function rolesForUser(userID) {
    return db('users_roles')
        .join('roles', 'roles.id', 'users_roles.role_id')
        .where({user_id: userID});
}

export function fields() {
    return db('fields');
}

export async function getTheme(userID) {
    const theme = await db('themes').where({student_id: userID}).first();
    return {
        field: theme.sfield_id,
        title: theme.sname,
        description: theme.sdescription
    };
}

export async function setTheme(userID, themeData) {
    const existing = await db('themes').where({student_id: userID}).first();
    if (existing) {
        await db('themes')
            .where({student_id: userID})
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
    }
}

export function getThemesForProfessor(professorID) {
    return db.select(
            'themes.*',
            'users.username',
            'users.display_name',
        )
        .from('themes')
        .join('users', 'themes.student_id', 'users.id')
        .whereIn('field_id', function () {
            this.select('field_id').from('professors_subjects').where({professor_id: professorID});
        })
        .whereNull('professor_id')
        .orWhere({professor_id: professorID})
        .orderByRaw(`
            (
                (
                    SELECT AVG(grade)
                    FROM students_subjects
                    WHERE students_subjects.student_id = themes.student_id
                ) / 0.7
                +
                ((
                    SELECT AVG(grade)
                    FROM students_subjects
                    INNER JOIN subjects ON subjects.id = students_subjects.subject_id
                    WHERE students_subjects.student_id = themes.student_id
                      AND subjects.field_id = themes.field_id
                ) / 5.0) * 0.3
            )
            DESC
        `);
}

export async function acceptTheme(professorID, themeID) {
    return db('themes')
        .where({id: themeID})
        .update({professor_id: professorID});
}

export async function unacceptTheme(professorID, themeID) {
    return db('themes')
        .where({
            professor_id: professorID,
            id: themeID,
        })
        .update({professor_id: null});
}