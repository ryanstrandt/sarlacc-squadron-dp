// import logo from './logo.svg';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';


import CharacterInfo from './components/CharacterInfo';
import DatapadFunctions from './components/DatapadFunctions';
import MainNavigation from './components/MainNavigation';

function App() {
  // const [characterInfo] = useState({
  //   name: 'Darth Malgus',
  //   class: 'Sith Warrior',
  //   level: 50,
  //   faction: 'Empire',
  // });
  return (
    <div className="App">
      <MainNavigation />
      <Routes>
        <Route path="/character" element={<CharacterInfo />} />
        <Route path="/functions" element={<DatapadFunctions />} />
        <Route path="/" element={<CharacterInfo />} />
      </Routes>
    </div>
  );
};
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

export default App;

// import React, { useState } from 'react';
// import { Route, Switch } from 'react-router-dom';

// import CharacterInfo from './components/CharacterInfo';
// import DatapadFunctions from './components/DatapadFunctions';
// import MainNavigation from './components/MainNavigation';

// const App = () => {
//   const [characterInfo, setCharacterInfo] = useState({
//     name: 'Darth Malgus',
//     class: 'Sith Warrior',
//     level: 50,
//     faction: 'Empire',
//   });

//   return (
//     <div className="App">
//       <MainNavigation />
//       <Switch>
//         <Route path="/character">
//           <CharacterInfo characterInfo={characterInfo} />
//         </Route>
//         <Route path="/functions">
//           <DatapadFunctions />
//         </Route>
//         <Route path="/">
//           <CharacterInfo characterInfo={characterInfo} />
//         </Route>
//       </Switch>
//     </div>
//   );
// };

// export default App;
