// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use(express.static('uploads'));

// Route to handle file uploads
app.post('/upload', upload.array('files'), (req, res) => {
  // Log uploaded files
  console.log('Uploaded files:', req.files);
  // Combine files
  const combinedFilePath = path.join(__dirname, 'combined-file.txt');
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ combinedFilePath });
//   const combinedFileStream = fs.createWriteStream(combinedFilePath);

//   req.files.forEach((file) => {
//     const fileStream = fs.createReadStream(file.path);
//     fileStream.pipe(combinedFileStream, { end: false });
//     fileStream.on('end', () => {
//       fs.unlinkSync(file.path); // Delete individual file after merging
//     });
//   });

//   combinedFileStream.on('finish', () => {
//     console.log('Files combined successfully');
//     res.json({ combinedFilePath }); // Send combined file path to the client
//   });
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `./combined-file.txt`; // Update this path with your file path
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      } else {
        console.log('File downloaded successfully');
      }
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
