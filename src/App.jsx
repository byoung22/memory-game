import { useState, useEffect } from 'react'

function generateId() {
  const id = Math.floor(Math.random() * 1293)
  return (id > 1017) ? id + 8983: id
}

function Card({ name, imageUrl, dataKey }) {
  return (
    <>
      <button data-key={dataKey}>
      <img src={imageUrl} alt={name}/>
      <p>{name}</p>
      </button>
    </>
  )
}
function CardList({ data }) {  
  return Object.keys(data).map((key) => {
    return (
      <div key={key}>
        {(data[key]) ? <Card name={data[key].name} imageUrl={data[key].imageUrl} dataKey={key}/> : <p>Loading...</p>}
      </div>
    );
  });
}

function App() {
  const [data, setDate] = useState({});
  // Fetch data from pokeAPI
  useEffect(() => {
    async function fetchPokemon() {
      const fetchedData = {};
      for (let i = 0; i < 2; i++) {
        let id = generateId();
        while (fetchedData[id]) id = generateId();
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const pokeData = await response.json(); // Await the promise
          fetchedData[id] = {
            name: pokeData.species.name,
            imageUrl: pokeData.sprites.front_default
          }
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
      setDate(fetchedData);
    }
    fetchPokemon(); // Call the async function
  }, []);

  return (
    <>
      <CardList data={data}/>
    </>
  )
}

export default App