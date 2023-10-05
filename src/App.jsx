import { useState, useEffect } from 'react'

function generateId() {
  const id = Math.floor(Math.random() * 1293)
  return (id > 1017) ? id + 8983: id
}

function Card({ name, imageUrl, dataKey, chooseCard }) {
  return (
    <>
      <button data-key={dataKey} onClick={chooseCard}>
      <img src={imageUrl} alt={name}/>
      <p>{name}</p>
      </button>
    </>
  )
}
function CardList({ data, chooseCard }) {  
  return data.map((obj) => {
    return (
      <div key={obj.id}>
        {(obj.imageUrl) ? <Card name={obj.name} imageUrl={obj.imageUrl} dataKey={obj.id} chooseCard={chooseCard}/> : <p>Loading...</p>}
      </div>
    );
  });
}

function App() {
  const [data, setData] = useState([]);
  const [seen, setSeen] = useState(new Set());
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(0);

  async function fetchPokemon() {
    const fetchedData = [];
    for (let i = 0; i < 2; i++) {
      let id = generateId();
      while (fetchedData.includes(id)) id = generateId();
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const pokeData = await response.json(); // Await the promise
        const obj = {
          id: id,
          name: pokeData.species.name,
          imageUrl: pokeData.sprites.front_default,
          position: null
        }
        fetchedData.push(obj);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    setData(fetchedData);
  }

  // Fetch data from pokeAPI
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Choose card
  function chooseCard(e) {
    const chosenId = e.currentTarget.dataset.key;

    if (seen.has(chosenId)) {
      setScore(0)
      setSeen(new Set())
    } else {
      const newScore = score + 1;
      seen.add(chosenId)
      setScore(newScore)
      if (newScore > high) setHigh(newScore)
    }

    shuffleData()   // Shuffle then sort Data
  }
  function shuffleData() {
    const copy = [...data]
    copy.forEach(obj => {
      obj.position = Math.random();
    })
    copy.sort((a, b) => a.position - b.position);
    setData(copy);
  }

  return (
    <>
      <div>
        <div>Score: {score}</div>
        <div>High Score: {high}</div>
      </div>
      <button onClick={fetchPokemon}>New Pokemon</button>
      <CardList data={data} chooseCard={chooseCard}/>
    </>
  )
}

export default App