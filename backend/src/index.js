import express from 'express';
const morgan = require('morgan'); // Stupid defaults
import cookieSession from 'cookie-session';
import cors from 'cors';
import db from './db';
import bcrypt from 'bcrypt';

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['NecesRazbojniceMasonski42'],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(morgan('combined'));

app.get('/', (req, res) => {
    console.log('Ses: ', req.session);
    if (req.session.user_id) {
        res.send('Wilkomen sie bitte ja!');
    } else {
        res.status(401).send('Neces, razbojnice');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json('Missing username or password');
        return;
    }

    db('users').where({ username }).first().then(userRow => {
        if (!userRow) {
            res.status(403).json({error: 'no_user'});
            return;
        }

        console.log('Gotten sie user row: ', userRow);
        bcrypt.compare(password, userRow.password_hash, async (err, passwordsMatch) => {
            if (err) {
                res.sendStatus(500);
                return;
            }

            if (passwordsMatch) {
                delete userRow.password_hash;
                const roles = await db('users_roles')
                    .join('roles', 'roles.id', 'users_roles.role_id')
                    .where({user_id: userRow.id});
                userRow.roles = roles;
                req.session.user_id = userRow.id;
                req.session.user_username = userRow.username;
                req.session.save();
                res.json(userRow);
            } else {
                res.status(403).json({error: 'auth_fail'});
            }
        });
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));