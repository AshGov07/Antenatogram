import { Router } from 'express';
import { pool } from '../database/db.js';

const router = Router();

router.get('/:linkId', async (req, res) => {
  const { linkId } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();
    
    // Check if link exists and hasn't expired
    const [links] = await connection.query(
      `SELECT BIN_TO_UUID(patient_id) as patient_id 
       FROM shared_links 
       WHERE link = ? AND expiry_date > NOW()`,
      [linkId]
    );

    if (links.length === 0) {
      return res.status(404).json({ message: 'Link not found or expired' });
    }

    const patientId = links[0].patient_id;

    // Fetch patient data including name and email
    const [patients] = await connection.query(
      `SELECT name, email FROM patient WHERE patient_id = UUID_TO_BIN(?)`,
      [patientId]
    );

    if (patients.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const patient = patients[0];

    // Fetch measurements for graphs
    const [measurements] = await connection.query(
      `SELECT type, date, value, value2 
       FROM measurement 
       WHERE pregnancy_id IN (
         SELECT pregnancy_id 
         FROM pregnancy 
         WHERE patient_id = UUID_TO_BIN(?)
       )
       ORDER BY date`,
      [patientId]
    );

    // Format the response data
    const responseData = {
      patientInfo: {
        name: patient?.name || 'Unknown Patient',  // Ensure name is correctly pulled
        email: patient?.email || 'No Email'
      },
      measurements: {
        selfMonitoring: {
          weight: measurements.filter(m => m.type === 'weight').map(m => ({ date: m.date, value: Number(m.value) })),
          bloodPressure: measurements.filter(m => m.type === 'bloodpressure').map(m => ({ date: m.date, value: Number(m.value), value2: Number(m.value2) })),
          bloodSugar: measurements.filter(m => m.type === 'bloodsugar').map(m => ({ date: m.date, value: Number(m.value) })),
          temperature: measurements.filter(m => m.type === 'temperature').map(m => ({ date: m.date, value: Number(m.value) }))
        },
        foetalMeasurements: {
          headCircumference: measurements.filter(m => m.type === 'hc').map(m => ({ date: m.date, value: Number(m.value) })),
          abdominalCircumference: measurements.filter(m => m.type === 'ac').map(m => ({ date: m.date, value: Number(m.value) })),
          femurLength: measurements.filter(m => m.type === 'fl').map(m => ({ date: m.date, value: Number(m.value) })),
          biparietalDiameter: measurements.filter(m => m.type === 'bpd').map(m => ({ date: m.date, value: Number(m.value) }))
        },
        markedParameters: {
          hemoglobin: measurements.filter(m => m.type === 'hemoglobin').map(m => ({ date: m.date, value: Number(m.value) })),
          glucoseTolerance: measurements.filter(m => m.type === 'glucosetolerance').map(m => ({ date: m.date, value: Number(m.value) }))
        }
      }
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) connection.release();
  }
});

export { router as sharedRouter };
