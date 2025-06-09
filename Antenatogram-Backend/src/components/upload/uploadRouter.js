import { Router } from "express";
import multer from 'multer';
import path from 'path';

const uploadRouter = Router();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Rename the file
    }
});

const upload = multer({ storage: storage });

// Create the /api/upload endpoint
uploadRouter.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // File details
        const fileDetails = {
            filename: req.file.filename,
            filepath: req.file.path,
            fileType: req.body.fileType,
            parameters: req.body // Other parameters
        };

        console.log('File uploaded successfully:', fileDetails);

        // Send a JSON response indicating success
        res.status(200).json({ message: 'File uploaded successfully', fileDetails });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Failed to upload file', error: error.message });
    }
});

export { uploadRouter };
