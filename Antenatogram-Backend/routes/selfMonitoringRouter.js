// import express from 'express';
// import db from '../database/db.js'; // assuming your MySQL connection is exported from here

// const router = express.Router();

// // Fetch parameters for a specific user (replace with real user auth)
// router.get('/', async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM self_monitoring WHERE user_id = ?", [req.user.id]);
//     const grouped = rows.reduce((acc, row) => {
//       if (!acc[row.parameter]) {
//         acc[row.parameter] = {
//           id: row.parameter,
//           threshold: row.threshold,
//           data: [],
//         };
//       }
//       acc[row.parameter].data.push({ date: row.date, value: row.value });
//       return acc;
//     }, {});
//     res.json(Object.values(grouped));
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching parameters' });
//   }
// });

// // Save/Update parameters for a specific user
// router.post('/', async (req, res) => {
//   const { parameters } = req.body;

//   try {
//     await db.query("DELETE FROM self_monitoring WHERE user_id = ?", [req.user.id]);

//     for (const param of parameters) {
//       for (const entry of param.data) {
//         await db.query(
//           "INSERT INTO self_monitoring (user_id, parameter, date, value, threshold) VALUES (?, ?, ?, ?, ?)",
//           [req.user.id, param.id, entry.date, entry.value, param.threshold]
//         );
//       }
//     }

//     res.json({ message: 'Parameters saved' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error saving parameters' });
//   }
// });

// export default router;

import express from 'express';
import { pool } from '../database/db.js'; // ✅ Correct named import

const router = express.Router();

// Middleware placeholder for real authentication (replace with real auth logic)
router.use((req, res, next) => {
  // Temporary mock user for testing until real auth is connected
  req.user = { id: 1 }; // Replace with real `req.user` from auth middleware
  next();
});

// ✅ GET route to fetch self-monitoring parameters for the logged-in user
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM self_monitoring WHERE user_id = ?",
      [req.user.id]
    );

    const grouped = rows.reduce((acc, row) => {
      if (!acc[row.parameter]) {
        acc[row.parameter] = {
          id: row.parameter,
          threshold: row.threshold,
          data: [],
        };
      }
      acc[row.parameter].data.push({ date: row.date, value: row.value });
      return acc;
    }, {});

    res.json(Object.values(grouped));
  } catch (err) {
    console.error("Error fetching self-monitoring data:", err);
    res.status(500).json({ message: 'Error fetching parameters' });
  }
});

// ✅ POST route to update self-monitoring parameters for the logged-in user
router.post('/', async (req, res) => {
  const { parameters } = req.body;

  try {
    await pool.query("DELETE FROM self_monitoring WHERE user_id = ?", [req.user.id]);

    for (const param of parameters) {
      for (const entry of param.data) {
        await pool.query(
          "INSERT INTO self_monitoring (user_id, parameter, date, value, threshold) VALUES (?, ?, ?, ?, ?)",
          [req.user.id, param.id, entry.date, entry.value, param.threshold]
        );
      }
    }

    res.json({ message: 'Parameters saved successfully' });
  } catch (err) {
    console.error("Error saving self-monitoring data:", err);
    res.status(500).json({ message: 'Error saving parameters' });
  }
});

export default router;
