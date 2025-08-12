// import { DBError } from "../../src/utils/Errors.js";
// import { pool } from "../db.js";

// export async function getCurrentPregnancy(patientID) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     try {
//       let query;
//       query =
//         "SELECT *, BIN_TO_UUID(pregnancy_id) AS pregnancyID  FROM pregnancy WHERE patient_id = UUID_TO_BIN(?) AND deliverydate IS NULL ORDER BY lmp DESC LIMIT 1;";
//       const [results] = await connection.query(query, [patientID]);
//       if (results.length > 0) return results[0];
//       return false;
//     } catch (error) {
//       console.log(error);
//       return new DBError("Could not fetch pregnancyid", error);
//     }
//   } catch (error) {
//     return new DBError("Could not connect to DB", error);
//   } finally {
//     connection.release();
//   }
// }

// export async function newPregnancy(patientID) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     try {
//       let query;
//       query = "INSERT INTO pregnancy (patient_id) values (UUID_TO_BIN(?)); ";
//       const [results] = await connection.query(query, [patientID]);
//       if (results.affectedRows === 1) return await getCurrentPregnancy(patientID);
//       return false;
//     } catch (error) {
//       console.log(error);
//       return new DBError("Could not add pregnancy", error);
//     }

//   } catch (error) {
//     return new DBError("Could not connect to DB", error);
//   } finally {
//     connection.release();
//   }
// }



// import { DBError } from "../../src/utils/Errors.js";
// import { pool } from "../db.js";

// /**
//  * Returns the latest active pregnancy (undelivered) for a patient
//  * @param {string} patientID - UUID string of patient
//  * @returns {Object} { pregnancy_id: "uuid-string" } or false if not found
//  */
// export async function getCurrentPregnancy(patientID) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     console.log("🔎 Fetching pregnancy for patientID:", patientID);

//     const query = `
//       SELECT BIN_TO_UUID(pregnancy_id, 1) AS pregnancy_id
//       FROM pregnancy
//       WHERE patient_id = UUID_TO_BIN(?, 1)
//         AND deliverydate IS NULL
//       ORDER BY lmp DESC
//       LIMIT 1;
//     `;
//     const [results] = await connection.query(query, [patientID]);
//     console.log("📦 SQL results:", results);

//     if (results.length > 0) {
//       return { pregnancyID: results[0].pregnancy_id };
//     }

//     return false; // No live pregnancy
//   } catch (error) {
//     console.error("❌ getCurrentPregnancy() error:", error);
//     return new DBError("Could not fetch pregnancy ID", error);
//   } finally {
//     if (connection) connection.release();
//   }
// }


// /**
//  * Creates a new pregnancy record for a given patient ID
//  * @param {string} patientID - UUID string of patient
//  * @returns {Object} { pregnancy_id: "uuid-string" } or false
//  */
// export async function newPregnancy(patientID) {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     try {
//       const query = `
//         INSERT INTO pregnancy (patient_id)
//         VALUES (UUID_TO_BIN(?, 1))
//       `;
//       const [results] = await connection.query(query, [patientID]);

//       if (results.affectedRows === 1) {
//         return await getCurrentPregnancy(patientID);
//       }
//       return false;
//     } catch (error) {
//       console.error("❌ Insert error:", error);
//       return new DBError("Could not add pregnancy", error);
//     }
//   } catch (error) {
//     return new DBError("Could not connect to DB", error);
//   } finally {
//     if (connection) connection.release();
//   }
// }



import { DBError } from "../../src/utils/Errors.js";
import { pool } from "../db.js";

export async function getCurrentPregnancy(patientID) {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("📥 Inside getCurrentPregnancy() for:", patientID);

    const query = `
      SELECT BIN_TO_UUID(pregnancy_id, 1) AS pregnancy_id
      FROM pregnancy
      WHERE patient_id = UUID_TO_BIN(?, 1) AND deliverydate IS NULL
      ORDER BY lmp DESC
      LIMIT 1
    `;

    const [results] = await connection.query(query, [patientID]);
    console.log("📦 SQL results:", results);

    if (results.length > 0) {
      console.log("🧬 Returning pregnancy_id:", results[0].pregnancy_id);
      return { pregnancy_id: results[0].pregnancy_id };
    }

    console.warn("❌ No live pregnancy found for patientID:", patientID);
    return false;
  } catch (error) {
    console.error("❌ Query or DB connection error in getCurrentPregnancy:", error);
    return new DBError("Could not fetch pregnancy ID", error);
  } finally {
    if (connection) connection.release();
  }
}


export async function newPregnancy(patientID) {
  let connection;
  try {
    connection = await pool.getConnection();
    try {
      // const query = "INSERT INTO pregnancy (patient_id) VALUES (UUID_TO_BIN(?));";
      const query = "INSERT INTO pregnancy (patient_id) VALUES (UUID_TO_BIN(?, 1));";
      const [results] = await connection.query(query, [patientID]);
      if (results.affectedRows === 1) {
        return await getCurrentPregnancy(patientID);
      }
      return false;
    } catch (error) {
      console.error("❌ Insert error:", error);
      return new DBError("Could not add pregnancy", error);
    }
  } catch (error) {
    return new DBError("Could not connect to DB", error);
  } finally {
    if (connection) connection.release();
  }
}
