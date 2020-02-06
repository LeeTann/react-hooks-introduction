import React, { useState, useEffect } from 'react';

import Summary from './Summary';

const Character = props => {

  const [loadedCharacter, setLoadedCharacter] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  console.log("rendering...... ")

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== loadedCharacter.id ||
  //     nextState.isLoading !== isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }
  
  // componentDidMount() {
  //   this.fetchData();
  // }

  useEffect(() => {
    fetchData()
    // returning another function works like unmount. runs code one last time.
    return () => {
      console.log('Cleaning up...')
    }
  }, [props.selectedChar]) // passing props.selecetedChar in as second argument checks for update whenver we fetch data and change selectedChar

  const fetchData = () => {
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    // this.setState({ isLoading: true });
    setIsLoading(true)
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
        // this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
        setLoadedCharacter(loadedCharacter)
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      });
  };

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }


  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;

}

// React.memo - using memo only renders when the that Character component is changed. 
export default React.memo(Character);
