import React, { useState } from 'react';
import PopupDialog from './PopupDialog';
import './App.css';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="App">
      <button onClick={openDialog}>Open Dialog</button>
      {isDialogOpen && <PopupDialog onClose={closeDialog} />}
    </div>
  );
}

export default App;
