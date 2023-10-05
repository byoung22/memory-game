import React, { useState, useEffect } from 'react'

function generateId() {
  const id = Math.floor(Math.random() * 1293)
  return (id > 1017) ? id + 8983: id
}

function Card() {  
  return (
    <>
      <img/>
    </>
  );
}

function App() {
  const [data, setDate] = useState([]);
  // Fill data once
  useEffect(() => {
    async function fetchPokemon() {
      for (let i = 0; i < 2; i++) {
        const id = generateId();
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const pokeData = await response.json(); // Await the promise
          const obj = {
            id: id,
            pokeData: pokeData,
          }
          const copy = [...data]
          copy.push(obj);
          setDate(copy)
          console.log(data); // Log the new data
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
    }
    fetchPokemon(); // Call the async function
  }, []);

  return (
    <>
      <Card/>
    </>
  )
}

export default App
