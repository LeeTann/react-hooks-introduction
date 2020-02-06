import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

// class App {
//   state = {
//     selectedCharacter: 1,
//     side: 'light',
//     destroyed: false
//   };

//   sideHandler = side => {
//     this.setState({ side: side });
//   };

//   charSelectHandler = event => {
//     const charId = event.target.value;
//     this.setState({ selectedCharacter: charId });
//   };

//   destructionHandler = () => {
//     this.setState({ destroyed: true });
//   };

const App = props => {
  const [character, setCharacter] = useState("1")
  const [side, setSide] = useState('light')
  const [destroyed, setDestroyed] = useState(false)


  const sideHandler = side => {
    setSide(side)
  }

  const charSelectHandler = event => {
    const charId = event.target.value
    setCharacter(charId)
  }

  const destructionHandler = () => {
    setDestroyed(true)
  }

  let content = (
    <React.Fragment>
      <CharPicker
        side={side}
        character={character}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={character} />
      <button onClick={sideHandler.bind(this, 'light')}>
        Light Side
      </button>
      <button onClick={sideHandler.bind(this, 'dark')}>Dark Side</button>
      {side === 'dark' && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
}

export default App;
