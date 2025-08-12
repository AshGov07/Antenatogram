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
import { mainRouter } from "./router.js";
const PORT = process.env.PORT || 8008;
import vitalsRouter from "./routes/vitalsRouter.js";
import { pregnancyRouter } from "./src/components/pregnancy/pregnancyRouter.js"; // ✅ import router



const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use("/api/pregnancy", pregnancyRouter); // ✅ mount router at the right path
app.use(cookieParser());
app.use(express.json());
app.use('/', mainRouter);
app.use("/api/vitals", vitalsRouter);

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
