# mentor-picker

## Setup
1. Clone repo
2. Go to backend and frontend directories and run npm install in both
3. Set up mysql (settings in knexfile.js of backend)
4. Install knex tool globally: sudo npm i -g knex
5. Run knex migrations to create db schema: knex migrate:latest
6. Seed the database (populate with default data): knex seed:run

## Running
1. Open 2 terminals/tabs/tmux.
2. Go to backend dir in first terminal and run npm run dev
3. Go to frontend dir in second terminal and run npm run serve
4. Open localhost:8080 browser
