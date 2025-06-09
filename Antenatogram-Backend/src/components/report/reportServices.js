import multer from 'multer';
import path from 'path';
import { DBError } from '../../utils/Errors.js';
import { pool } from '../../../database/db.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../uploads')); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

export const uploadReport = async (req, res, next) => {
  let connection;
  try {
    console.log('File Type:', req.body.fileType);
    console.log('Uploaded File:', req.file); // req.file will contain the uploaded file
    console.log('Entered Parameters:', req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileType = req.body.fileType;
    const patientID = req.body.patientID; // Assuming you have patientID in the request

    // Save file path and other details to the database
    connection = await pool.getConnection();
    const query = 'INSERT INTO reports (patient_id, file_path, file_type) VALUES (UUID_TO_BIN(?), ?, ?)';
    const [results] = await connection.query(query, [patientID, filePath, fileType]);

    if (results.affectedRows !== 1) {
      throw new DBError('Failed to save report details to the database');
    }

    res.status(200).json({ message: 'Report uploaded successfully', filePath: filePath });
  } catch (error) {
    console.error('Error uploading report:', error);
    next(error); // Pass the error to the error handler
  } finally {
    if (connection) connection.release();
  }
};
