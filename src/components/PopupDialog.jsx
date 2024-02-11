import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './PopupDialog.css';

function PopupDialog({ onClose }) {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleDrop1 = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile1(droppedFile);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile2(droppedFile);
  };

  const handleInputChange1 = (e) => {
    const selectedFile = e.target.files[0];
    setFile1(selectedFile);
  };

  const handleInputChange2 = (e) => {
    const selectedFile = e.target.files[0];
    setFile2(selectedFile);
  };

  const canCloseDialog = () => {
    return file1 && file2;
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      // Write content into a file
      downloadFile(content, file.name, 'text/plain');
    };
    reader.readAsText(file); // Read the file as text
  };
  
  const downloadFile = (content, fileName, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
  
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  
    URL.revokeObjectURL(a.href);
  };

  const handleSubmit = () =>{
    processFile(file2)
  }
  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append('files', file1);
  //   formData.append('files', file2);

  //   try {
  //     const response = await fetch('http://localhost:3001/upload', {
  //       method: 'POST',
  //       body: formData
  //     });

  //     console.log("hello");
  //     if (response.ok) {
  //       // Extract filename from response header
  //       // const filename = response.headers.get('Content-Disposition').split('filename=')[1];
  //       // Download the file using the filename
  //       window.location.href = `http://localhost:3001/download/combined-file.txt`;
  //       console.log(window.location.href);
  //       console.log('File downloaded successfully');
  //     } else {
  //       console.error('Failed to download file');
  //     }
  //   } catch (error) {
  //     console.error('Error downloading file:', error);
  //   }
  // };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="drop-box-container">
          <Box
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop1}
          >
            <Typography variant="body1" gutterBottom>
              Drag & Drop a file here or click to select a file
            </Typography>
            <input
              type="file"
              id="file-input-1"
              onChange={handleInputChange1}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input-1">
              <Button variant="contained" component="span">
                Browse File
              </Button>
            </label>
            {file1 && (
              <p style={{ color: 'blue', marginTop: '5px' }}>{file1.name}</p>
            )}
          </Box>
          <Box
            className="drop-zone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop2}
          >
            <Typography variant="body1" gutterBottom>
              Drag & Drop a file here or click to select a file
            </Typography>
            <input
              type="file"
              id="file-input-2"
              onChange={handleInputChange2}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-input-2">
              <Button variant="contained" component="span">
                Browse File
              </Button>
            </label>
            {file2 && (
              <p style={{ color: 'green', marginTop: '5px' }}>{file2.name}</p>
            )}
          </Box>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button variant="contained" disabled={!canCloseDialog()} onClick={handleSubmit} style={{ marginRight: '10px' }}>
            Submit
          </Button>

          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopupDialog;
