import './App.css';
import { Button } from '@mui/material';
import { Router,Route, Routes } from 'react-router-dom';
import UserProvider from './context/context'
import RootRoute from './routes/RootRoute';

function App() {
  return (
    <UserProvider>
      <RootRoute/>
    </UserProvider>
  );
}

export default App;
