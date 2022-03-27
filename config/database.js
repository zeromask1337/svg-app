import 'dotenv/config';
import mysql from "mysql2";

const {DATABASE_USER, DATABASE_PASS, DATABASE} = process.env;

export default mysql.createConnection({
    host: 'localhost',
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE
});