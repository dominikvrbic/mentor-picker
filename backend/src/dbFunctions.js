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

export async function setTheme(userID, themeData) {
    const existing = await db('theme').where({student_id: userID}).first();
    if (existing) {
        await db('theme')
            .where({student_id: userID})
            .update({
                field_id: themeData.field,
                name: themeData.title,
                description: themeData.description,
            });
    } else {
        await db('theme')
            .insert({
                student_id: userID,
                field_id: themeData.field,
                name: themeData.title,
                description: themeData.description,
            });
    }
}