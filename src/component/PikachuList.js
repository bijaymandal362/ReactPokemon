import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Pikachu from './Pikachu';

const PikachuList = () => {
const[allPokemon, setAllPokemon] = useState([]);
const[offset, setOffset] = useState(0);
const[hasNext, setHasNext] = useState(true);
const[hasPrevious, setHasPrevious] = useState(false);
const limit = 3;

useEffect(() => {
    fetchPokemon();
}, [offset]);

const fetchPokemon= async () => {   
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        setAllPokemon(response.data.results);
        setHasNext(response.data.next !== null);
        setHasPrevious(response.data.previous !== null);
    } catch (error) {
        console.error('Error fetching Pikachu data:', error);
    }

}   

const handleNextClick =()=>{
    setOffset((previosuValueOffset) => previosuValueOffset + limit);
}
const handlePreviousClick =()=>{
    setOffset((previosuValueOffset)=> previosuValueOffset - limit);
}
// Helper function to get Pokemon ID from URL
const getPokemonIdFromUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  }

return(
    <div>
        <div className="pikachu-container">
            {
            allPokemon.map((pikachu, index) => (
                <Pikachu key={pikachu.name} 
                name={pikachu.name}        
                url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(pikachu.url)}.png`} />
                 ))
            }
        </div>
        <div className="navigation">
          
            <button onClick={handlePreviousClick} disabled={!hasPrevious}>Previous</button>
            <button onClick={handleNextClick} disabled={!hasNext}>Next</button>
         </div>

    </div>
);
};
export default PikachuList

