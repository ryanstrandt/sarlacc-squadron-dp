// import logo from './logo.svg';
import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import './App.css';


import CharacterInfo from './components/CharacterInfo';
// import DatapadFunctions from './components/DatapadFunctions';
import MainNavigation from './components/MainNavigation';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box component={<>
      <MainNavigation />
      <CharacterInfo /></>} />
  );
};

export default App;