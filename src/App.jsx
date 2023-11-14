import React from 'react';
import { AppBar, Typography } from '@mui/material';
import Carlist from './components/Carlist';
import './App.css';

function App() {
  return (
    <>
      <AppBar position="static">
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          Car Shop
        </Typography>
      </AppBar>
      <Carlist />
    </>
  );
}

export default App;
