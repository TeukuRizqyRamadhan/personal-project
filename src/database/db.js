// db.js
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'batch53',
    password: '112233aa',
    port: 5432,
});

client.connect()
    .then(() => console.log("Connected!"))
    .catch(err => console.error('Error connecting to database', err));

export default client;
