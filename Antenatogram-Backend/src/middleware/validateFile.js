const validateFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Invalid file type. Only JPEG, PNG, and PDF files are allowed." });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
        return res.status(400).json({ message: "File size exceeds the limit of 5MB." });
    }

    next();
};

export default validateFile;
