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