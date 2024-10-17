
import multer from 'multer';
import path from 'path';

// Configurar Multer para almacenar los archivos en el directorio deseado
const storage = multer.diskStorage({
  destination: './public/uploads', // Carpeta donde guardar los archivos
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s/g, '_');
    cb(null, filename); // Guardar el archivo con el nombre original (sin espacios)
  },
});

const upload = multer({ storage });

// Desactivar el bodyParser de Next.js para manejar multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Función auxiliar para ejecutar middlewares de forma asíncrona
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
      // Ejecutar el middleware de Multer para manejar el archivo
      await runMiddleware(req, res, upload.single('file'));

      if (!req.file) {
        res.status(400).json({ error: 'No se ha recibido ningún archivo.' });
        return;
      }

      // Si la subida es exitosa
      res.status(200).json({
        message: 'Archivo subido con éxito',
        filename: req.file.filename,
      });
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      res.status(500).json({ error: 'Error al subir el archivo.' });
    }
  } else {
    // Si no es un método POST, responder con un 405
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Método ${req.method} no permitido.` });
  }
}