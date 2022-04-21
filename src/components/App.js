import React from 'react'
import '../assets/css/App.css'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import MainPage from "./MainPage";
import {LocalizationProvider} from "@mui/x-date-pickers";

export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MainPage/>
      </LocalizationProvider>
    </>
  );
}

