// // 📁 routes/vitalsRouter.js
// import express from "express";
// import db from "../config/db.js"; // adjust path if needed

// const router = express.Router();

// // Save extracted vitals to MySQL
// router.post("/", async (req, res) => {
//   const { vitals } = req.body;
//   const today = new Date().toISOString().slice(0, 10);

//   try {
//     const insertPromises = Object.entries(vitals).map(([key, value]) =>
//       db.execute("INSERT INTO vitals (label, value, date) VALUES (?, ?, ?)", [key, value, today])
//     );
//     await Promise.all(insertPromises);

//     res.status(201).json({ message: "Vitals saved to MySQL." });
//   } catch (err) {
//     console.error("❌ Failed to insert vitals:", err);
//     res.status(500).json({ error: "Failed to store vitals in DB." });
//   }
// });

// // Fetch latest vitals for today
// router.get("/latest", async (req, res) => {
//   try {
//     const [rows] = await db.execute("SELECT label, value FROM vitals WHERE date = CURDATE()");
//     const latest = {};
//     rows.forEach(row => latest[row.label] = row.value);
//     res.json(latest);
//   } catch (err) {
//     console.error("❌ Failed to fetch latest vitals:", err);
//     res.status(500).json({ error: "Could not fetch vitals." });
//   }
// });

// export default router;

// 📁 routes/vitalsRouter.js
// import express from "express";
// import { pool } from "../database/db.js"; // ✅ adjust import path

// const router = express.Router();

// // Save vitals
// router.post("/", async (req, res) => {
//   const { vitals } = req.body;
//   const today = new Date().toISOString().split("T")[0];

//   try {
//     const insertPromises = Object.entries(vitals).map(([label, value]) =>
//       pool.execute(
//         "INSERT INTO vitals (label, value, date) VALUES (?, ?, ?)",
//         [label, value, today]
//       )
//     );
//     await Promise.all(insertPromises);
//     res.status(201).json({ message: "Vitals saved successfully." });
//   } catch (err) {
//     console.error("❌ Error inserting vitals:", err);
//     res.status(500).json({ error: "Failed to save vitals." });
//   }
// });

// // Fetch latest vitals
// router.get("/latest", async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       "SELECT label, value FROM vitals WHERE date = CURDATE()"
//     );
//     const latest = {};
//     rows.forEach(row => latest[row.label] = row.value);
//     res.json(latest);
//   } catch (err) {
//     console.error("❌ Error fetching vitals:", err);
//     res.status(500).json({ error: "Failed to fetch vitals." });
//   }
// });

// export default router;




// working code
// routes/vitalsRouter.js
// import express from "express";
// import { pool } from "../database/db.js";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { vitals, pregnancy_id } = req.body;
//   const today = new Date().toISOString().slice(0, 10);

//   if (!pregnancy_id) {
//     return res.status(400).json({ error: "pregnancy_id is required" });
//   }

//   try {
//     const insertPromises = Object.entries(vitals).map(([label, value]) =>
//       pool.execute(
//         "INSERT INTO vitals (label, value, date, pregnancy_id) VALUES (?, ?, ?, UUID_TO_BIN(?, 1))",
//         [label, value, today, pregnancy_id]
//       )
//     );
//     await Promise.all(insertPromises);
//     res.status(201).json({ message: "Vitals saved with pregnancy ID" });
//   } catch (err) {
//     console.error("❌ Error saving vitals:", err);
//     res.status(500).json({ error: "Failed to save vitals" });
//   }
// });

// // newly added block
// // router.get("/", async (req, res) => {
// //   const { pregnancy_id } = req.query;
// //   if (!pregnancy_id) return res.status(400).json({ error: "pregnancy_id is required" });

// //   try {
// //     const [rows] = await pool.execute(
// //       `SELECT label, value, date FROM vitals
// //        WHERE pregnancy_id = UUID_TO_BIN(?, 1)
// //        AND label IN ('LMP', 'EDD', 'GA_NOW')
// //        ORDER BY date DESC`,
// //       [pregnancy_id]
// //     );

// //     const latestVitals = {};
// //     for (const row of rows) {
// //       if (!latestVitals[row.label]) {
// //         latestVitals[row.label] = row.value;
// //       }
// //     }

// //     res.json({ vitals: latestVitals });
// //   } catch (err) {
// //     console.error("❌ Error fetching vitals:", err);
// //     res.status(500).json({ error: "Failed to fetch vitals" });
// //   }
// // });

// export default router;



import express from "express";
import { pool } from "../database/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { vitals, pregnancy_id } = req.body;
  const today = new Date().toISOString().slice(0, 10);

  if (!pregnancy_id) {
    return res.status(400).json({ error: "pregnancy_id is required" });
  }

  try {
    const insertPromises = Object.entries(vitals).map(([label, value]) =>
      pool.execute(
        "INSERT INTO vitals (label, value, date, pregnancy_id) VALUES (?, ?, ?, UUID_TO_BIN(?, 1))",
        [label, value, today, pregnancy_id]
      )
    );
    await Promise.all(insertPromises);
    res.status(201).json({ message: "Vitals saved with pregnancy ID" });
  } catch (err) {
    console.error("❌ Error saving vitals:", err);
    res.status(500).json({ error: "Failed to save vitals" });
  }
});

router.get("/", async (req, res) => {
  const { pregnancy_id } = req.query;

  if (!pregnancy_id) {
    return res.status(400).json({ error: "pregnancy_id is required" });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT label, value 
       FROM vitals 
       WHERE pregnancy_id = UUID_TO_BIN(?, 1)
       ORDER BY date DESC`,
      [pregnancy_id]
    );

    const latestVitals = {};
    for (const row of rows) {
      const label = row.label.toUpperCase();
      if (!latestVitals[label]) {
        latestVitals[label] = row.value;
      }
    }

    res.json({ vitals: latestVitals });
  } catch (err) {
    console.error("❌ Error fetching vitals:", err);
    res.status(500).json({ error: "Failed to fetch vitals" });
  }
});

export default router;
