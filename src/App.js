import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardPng = [
  {"src": "/png/frog.png", matched: false},
  {"src": "/png/hen.png", matched: false},
  {"src": "/png/jellyfish.png", matched: false},
  {"src": "/png/penguin.png", matched: false},
  {"src": "/png/shark.png", matched: false},
  {"src": "/png/snake.png", matched: false},
  {"src": "/png/mouse.png", matched: false},
  {"src": "/png/elephant.png", matched: false},
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceFirst, setChoiceFirst] = useState(null);
  const [choiceSecond, setChoiceSecond] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const shuffle = () => {
    setDisabled(false);
    const shuffled = [...cardPng, ...cardPng]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffled);
    setTurns(0);
  }

  const handleChoice = (card) => {
    choiceFirst ? setChoiceSecond(card) : setChoiceFirst(card);
  }

  useEffect(() => {
    setDisabled(false);
    if(choiceFirst && choiceSecond){
      if(choiceFirst.src === choiceSecond.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceFirst.src){
              return {...card, matched: true}
            }else{
              return card;
            }
          })
        })
        resetTurns();
      }else{
        setTimeout(() => resetTurns(), 500);
      }
    }
  }, [choiceFirst,choiceSecond]);

  const resetTurns = () => {
    setChoiceFirst(null);
    setChoiceSecond(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(true);
  }

  return (
    <div className="App">
      <button onClick={shuffle}>New Game</button>
      <div className="card-grid">
        {cards.map(card=>(
            <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceFirst || card===choiceSecond || card.matched} disabled={disabled}/>
        ))}
      </div>
    </div>
  );
}

export default App;
