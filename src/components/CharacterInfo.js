import React from 'react';
import { useSelector } from 'react-redux';

const CharacterInfo = () => {
  const characterInfo = useSelector((state) => state.characters.characterInfo)
  console.log(characterInfo)
  
  return (
    <div>
      {characterInfo.map(character => (
        <div className="CharacterInfo">
          <img src="https://static.wikia.nocookie.net/starwars/images/6/6f/Malgus-Disorder.jpg/revision/latest?cb=20220318164212" alt="Darth Malgus" />
          <h2>{character.name}</h2>
          <h3>{character.class}</h3>
          <p>Level: {character.level}</p>
          <p>Faction: {character.faction}</p>
        </div>
    ) )}
  </div>  
  );
};

export default CharacterInfo;
