import multer from 'multer';
import path from 'path';

// Configure Multer to store files in the desired directory
const storage = multer.diskStorage({
  destination: './public/uploads', // Folder to store files
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s/g, '_');
    cb(null, filename); // Save the file with the original name (no spaces)
  },
});

// File filter to only allow JSON and XML files
function fileFilter(req, file, cb) {
  const allowedTypes = ['application/json', 'application/xml', 'text/xml'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JSON and XML files are allowed.'), false); // Reject the file
  }
}

const upload = multer({
  storage,
  fileFilter, // Add the fileFilter option
});
// Disable Next.js bodyParser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to run middleware asynchronously
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Run Multer middleware to handle the file
      await runMiddleware(req, res, upload.single('file'));

      if (!req.file) {
        res.status(400).json({ error: 'No file received.' });
        return;
      }

      // If the upload is successful
      res.status(200).json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Error uploading file.' });
    }
  } else {
    // If it's not a POST method, respond with a 405
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
