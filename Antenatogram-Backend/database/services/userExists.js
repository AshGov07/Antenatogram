// import { AuthenticationError, DBError } from "../../src/utils/Errors.js";
// import {pool} from "../db.js"
// export async function userExists(userRole, email) {
//     const role = userRole.toLowerCase();
//     let connection;
//     try{
//          connection = await pool.getConnection();
//          try{
//             let query;
//             if(role ==="patient") query = `SELECT BIN_TO_UUID(patient_id) AS patient_id, passwordhash FROM patient WHERE email=(?);`;
//             else if(role ==="doctor") query = `SELECT BIN_TO_UUID(doctor_id) AS doctor_id, passwordhash FROM doctor WHERE email=(?);`;
//             else return new AuthenticationError("invalid role");
//             const [rows] = await connection.query(query,[email]);
//             if(rows.length > 0) return rows[0];
//             return false;
//          }
//          catch(error){
//             console.log(error);
//             return new DBError("Could not query to DB", error);
//          }
//     }
//     catch(error){
//         return new DBError("Could not connect to DB", error);
//     }
//     finally{
//         if(connection) connection.release();
//     }
// }


import { AuthenticationError, DBError } from "../../src/utils/Errors.js";
import { pool } from "../db.js";

export async function userExists(userRole, email) {
  const role = userRole.toLowerCase();
  let connection;

  try {
    connection = await pool.getConnection();

    try {
      let query;
      if (role === "patient") {
        query = `SELECT patient_id, passwordhash FROM patient WHERE email = ?`;
      } else if (role === "doctor") {
        query = `SELECT doctor_id, passwordhash FROM doctor WHERE email = ?`;
      } else {
        return new AuthenticationError("Invalid role");
      }

      const [rows] = await connection.query(query, [email]);

      if (rows.length > 0) {
        // ✅ Confirm it's returning buffer
        console.log("✅ Raw user object from DB:", rows[0]);
        return rows[0];
      }

      return false;
    } catch (error) {
      console.error("❌ Query error:", error);
      return new DBError("Could not query to DB", error);
    }
  } catch (error) {
    return new DBError("Could not connect to DB", error);
  } finally {
    if (connection) connection.release();
  }
}
