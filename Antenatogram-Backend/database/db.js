// import mysql from "mysql2/promise";
// import { initRelations } from "./init.js";

// export const pool = await mysql.createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "root",
//     database: "antenatogram",
//     waitForConnections: true,
//     queueLimit: 0,
//     connectionLimit: 10
// })

// initRelations();

import mysql from "mysql2/promise";
import { initRelations } from "./init.js";
import dotenv from "dotenv";
dotenv.config();

export const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0,
    connectionLimit: 10
});

initRelations();