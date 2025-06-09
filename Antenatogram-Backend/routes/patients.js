import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/db.js';

const router = Router();

// Generate a shareable link for a patient (MySQL version)
router.post('/:patientId/share', async (req, res) => {
  let connection;
  try {
    const patientId = req.params.patientId;
    const expiryDate = new Date(req.body.expiryDate); // Expecting expiryDate in the request body

    if (!expiryDate || isNaN(expiryDate.getTime())) {
      return res.status(400).json({ message: 'Invalid expiry date' });
    }

    connection = await pool.getConnection();

    // Check if patient exists
    const [patients] = await connection.query(
      "SELECT 1 FROM patient WHERE patient_id = UUID_TO_BIN(?)",
      [patientId]
    );
    if (patients.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Generate a unique link
    const link = uuidv4();

    // Insert into shared_links table
    await connection.query(
      "INSERT INTO shared_links (patient_id, link, expiry_date) VALUES (UUID_TO_BIN(?), ?, ?)",
      [patientId, link, expiryDate]
    );

    // Return only the link
    return res.status(201).json({ link });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) connection.release();
  }
});

export { router as patientsRouter };  // Change the export to be named