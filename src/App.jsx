import React from 'react';
import Table from './Table.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './App.css'
function App () {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Table />
    </LocalizationProvider>
  )
}

export default App;