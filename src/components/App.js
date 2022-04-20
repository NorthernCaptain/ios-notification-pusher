import React from 'react'
import '../assets/css/App.css'
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
      <CssBaseline />
      <div>
        <h1>Hello, Electron!</h1>
        <Button variant="contained">Hello World</Button>
        <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
      </div>
    </>
  );
}

