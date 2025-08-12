// import {getCurrentPregnancy, newPregnancy} from "../../../database/pregnancy/pregnancyMethods.js";

// async function getLivePregnancy(req,res,next) {
//     const userID = req.body.userID;
//     const pregnancy = await getCurrentPregnancy(userID);
//     if(!pregnancy) return res.json({"error" : "no pregnancy found" });
//     return res.json({pregnancy});
// }

// async function addPregnancy(req,res,next) {
//     const existing = await getCurrentPregnancy(req.body.userID);
//     if(existing) return res.json({"error" : "user already has a live pregnancy"});

//     const adding = await newPregnancy(req.body.userID);
//     if(!adding) return res.json({"error" : "could not add pregnancy"});
//     else return res.json({newPregnancy: adding});


// }

// export const pregnancyServices = {getLivePregnancy, addPregnancy};


import { getCurrentPregnancy, newPregnancy } from "../../../database/pregnancy/pregnancyMethods.js";
import { pool } from "../../../database/db.js";


async function getLivePregnancy(req, res) {
  const userID = req.body.userID;
  const pregnancy = await getCurrentPregnancy(userID);
  if (!pregnancy) return res.json({ "error": "no pregnancy found" });
  return res.json({ pregnancy });
}

async function addPregnancy(req, res) {
  console.log("🚨 req.body received:", req.body);

  const existing = await getCurrentPregnancy(req.body.userID);
  if (existing) return res.json({ "error": "user already has a live pregnancy" });

  const adding = await newPregnancy(req.body.userID);
  if (!adding) return res.json({ "error": "could not add pregnancy" });
  return res.json({ newPregnancy: adding });
}

async function getPregnancyIdByPatient(req, res) {
  const { patientId } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT BIN_TO_UUID(pregnancy_id, 1) AS pregnancy_id FROM pregnancy WHERE patient_id = UUID_TO_BIN(?, 1)",
      [patientId]
    );
    if (!rows.length) return res.status(404).json({ message: "No pregnancy found" });
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching pregnancy ID:", err);
    res.status(500).json({ error: "Database error" });
  }
}

export const pregnancyServices = {
  getLivePregnancy,
  addPregnancy,
  getPregnancyIdByPatient, // ✅ export the new function
};
