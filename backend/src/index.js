import express from 'express';
const morgan = require('morgan'); // Stupid defaults
import cookieSession from 'cookie-session';
import cors from 'cors';
import db from './db';
import * as dbFunc from './dbFunctions'; 
import bcrypt from 'bcrypt';

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:8086',
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

app.get('/authStatus', async (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
        res.status(401).json({loggedIn: false});
        return;
    }

    const [ user, roles ] = await Promise.all([
        dbFunc.userById(userID),
        dbFunc.rolesForUser(userID)
    ]);
    delete user.password_hash; // Don't send password hash to anyone
    user.roles = roles;
    res.json({
        loggedIn: true,
        user
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json('Missing username or password');
        return;
    }

    dbFunc.userByName(username).then(userRow => {
        if (!userRow) {
            res.status(403).json({error: 'no_user'});
            return;
        }

        bcrypt.compare(password, userRow.password_hash, async (err, passwordsMatch) => {
            if (err) {
                res.sendStatus(500);
                return;
            }

            if (passwordsMatch) {
                delete userRow.password_hash;
                const roles = await dbFunc.rolesForUser(userRow.id);
                userRow.roles = roles;
                req.session.user_id = userRow.id;
                req.session.user_username = userRow.username;
                req.session.save();
                res.json({
                    user: userRow,
                    loggedIn: true
                });
            } else {
                res.status(403).json({error: 'auth_fail', loggedIn: false});
            }
        });
    });
});

app.post('/logout', (req, res) => {
    req.session = null;
    res.sendStatus(200);
});

app.get('/fields', async (req, res) => {
    res.json(await db('fields'));
});

app.get('/fields/:fieldID/professors', async (req, res) => {
    res.json(await dbFunc.professorsForField(req.params.fieldID));
});

app.get('/theme', async (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
        res.status(401).json({loggedIn: false});
        return;
    }

    const theme = await dbFunc.getTheme(userID);
    res.json(theme);
});

app.post('/theme', async (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
        res.status(401).json({loggedIn: false});
        return;
    }

    await dbFunc.setTheme(userID, req.body);

    res.sendStatus(201);
});

app.get('/professorThemes', async (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
        res.status(401).json({loggedIn: false});
        return;
    }

    const themes = await dbFunc.getThemesForProfessor(userID);
    res.json(themes);
});

app.put('/professorThemes/:themeID/accept', async (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
        res.status(401).json({loggedIn: false});
        return;
    }

    await dbFunc.acceptTheme(userID, req.params.themeID);
    res.sendStatus(200);
});

app.delete('/professorThemes/:themeID/accept', async (req, res) => {
    const userID = req.session.user_id;
    if (!userID) {
        res.status(401).json({loggedIn: false});
        return;
    }

    await dbFunc.unacceptTheme(userID, req.params.themeID);
    res.sendStatus(200);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
