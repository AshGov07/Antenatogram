// import { Router } from "express";
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Ensure uploads directory exists
// const uploadsDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

// const uploadRouter = Router();

// // Configure multer for file storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir); // Save to uploads folder
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileExtension = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Custom file name
//     }
// });

// const upload = multer({ storage });

// // POST /api/upload
// uploadRouter.post('/', upload.single('file'), (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const fileDetails = {
//             filename: req.file.filename,
//             filepath: req.file.path,
//             fileType: req.body.fileType || 'unknown',
//             parameters: req.body // additional fields from frontend
//         };

//         console.log('✅ File uploaded successfully:', fileDetails);

//         res.status(200).json({
//             message: 'File uploaded successfully',
//             fileDetails
//         });
//     } catch (error) {
//         console.error('❌ Error uploading file:', error);
//         res.status(500).json({
//             message: 'Failed to upload file',
//             error: error.message
//         });
//     }
// });

// export { uploadRouter };


import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Setup directory path utilities
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const uploadRouter = Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

// POST /api/upload
uploadRouter.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const pythonScript = path.join(__dirname, "../scripts/ocr_and_ner.py");

    execFile("C:\\Program Files\\Python310\\python.exe", [pythonScript, filePath], (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Python NER script error:", stderr);
        return res.status(500).json({ error: "NER processing failed" });
      }

      try {
        const extractedVitals = JSON.parse(stdout);
        console.log("✅ Vitals extracted:", extractedVitals);

        res.status(200).json({
          message: "File uploaded and analyzed successfully",
          vitals: extractedVitals,
          filename: req.file.filename,
        });
      } catch (e) {
        console.error("❌ JSON parse error:", stdout);
        res.status(500).json({ error: "NER returned invalid data" });
      }
    });
  } catch (err) {
    console.error("❌ File upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export { uploadRouter };
