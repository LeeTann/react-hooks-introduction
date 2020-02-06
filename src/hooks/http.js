import { useState, useEffect } from 'react'

export const useHttp = (url, dependencies) => {

    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        // fetch('https://swapi.co/api/people/')
        setIsLoading(true)
        console.log('sending http request')
        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('Could not fetch person!');
            }
            return response.json();
        })
        .then(data => {
            // const loadedCharacter = charData.results.slice(0,5)

            // // this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
            // setLoadedCharacter(loadedCharacter)
            // setIsLoading(false)
            setIsLoading(false)
            setFetchedData(data)
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false)
        });
    }, dependencies)

 
    // can return anything: array, object, etc..
    return [isLoading, fetchedData]
}