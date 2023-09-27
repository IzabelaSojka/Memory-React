import { useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardPng = [
  {"src": "/png/frog.png"},
  {"src": "/png/hen.png"},
  {"src": "/png/jellyfish.png"},
  {"src": "/png/penguin.png"},
  {"src": "/png/shark.png"},
  {"src": "/png/snake.png"},
  {"src": "/png/mouse.png"},
  {"src": "/png/elephant.png"},
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const 

  const shuffle = () => {
    const shuffled = [...cardPng, ...cardPng]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffled);
    setTurns(0);
  }

  console.log(cards, turns);

  return (
    <div className="App">
      <button onClick={shuffle}>New Game</button>

      <div className="card-grid">
        {cards.map(card=>(
            <Card key={card.id} card={card}/>
        ))}
      </div>
    </div>
  );
}

export default App;
