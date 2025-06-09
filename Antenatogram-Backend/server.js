// import {config} from "dotenv";
// config();
// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from 'cors';
// import path from "path";
// import { mainRouter } from "./router.js";
// const PORT = process.env.PORT || 8008;

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));
// app.use(cookieParser());
// app.use(express.json());
// app.use('/', mainRouter);




// app.listen(PORT, () => console.log(`Server running in port ${PORT} `));  


import {config} from "dotenv";
config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import { mainRouter } from "./router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8008;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the 'uploads' directory
app.use('/', mainRouter);

// Global error handler for catching errors from routes/middleware
app.use((err, req, res, next) => {
    console.error("Global error:", err);
    if (err && err.stack) {
        console.error("Stack trace:", err.stack);
    }
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    if (reason && reason.stack) {
        console.error("Stack trace:", reason.stack);
    }
});

app.listen(PORT, () => console.log(`Server running in port ${PORT} `));
