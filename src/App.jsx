import { useState, useEffect } from 'react'

const data = {};

function generateId() {
  const id = Math.floor(Math.random() * 1293)
  return (id > 1017) ? id + 8983: id
}

// Fill data
(() => {
  for (let i = 0; i < 11; i++) {
    const obj = {
      id:
    }
  }
})();

function Card() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const id = generateId();
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const pokeData = await response.json();
        setImageUrl(pokeData.sprites.front_default);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchPokemon();
  },[]);

  
  return (
    <>
      <img src={imageUrl}/>
    </>
  );
}

function App() {
  return (
    <>
    <Card/>
    </>
  )
}

export default App
