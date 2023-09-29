import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardPngEasy = [
  {"src": "/png/chameleon.png", matched: false},
  {"src": "/png/hen.png", matched: false},
  {"src": "/png/jellyfish.png", matched: false},
  {"src": "/png/penguin.png", matched: false},
  {"src": "/png/shark.png", matched: false},
  {"src": "/png/snake.png", matched: false},
  {"src": "/png/mouse.png", matched: false},
  {"src": "/png/elephant.png", matched: false},
]

const cardPngHard = [
  {"src": "/png2/png1.png", matched: false},
  {"src": "/png2/png2.png", matched: false},
  {"src": "/png2/png3.png", matched: false},
  {"src": "/png2/png4.png", matched: false},
  {"src": "/png2/png5.png", matched: false},
  {"src": "/png2/png6.png", matched: false},
  {"src": "/png2/png7.png", matched: false},
  {"src": "/png2/png8.png", matched: false},
  {"src": "/png2/png9.png", matched: false},
  {"src": "/png2/png10.png", matched: false},
  {"src": "/png2/png11.png", matched: false},
  {"src": "/png2/png12.png", matched: false},
  {"src": "/png2/png13.png", matched: false},
  {"src": "/png2/png14.png", matched: false},
  {"src": "/png2/png15.png", matched: false},
  {"src": "/png2/png16.png", matched: false},
  {"src": "/png2/png17.png", matched: false},
  {"src": "/png2/png18.png", matched: false},
  {"src": "/png2/png19.png", matched: false},
  {"src": "/png2/png20.png", matched: false},
  {"src": "/png2/png21.png", matched: false},
  {"src": "/png2/png22.png", matched: false},
  {"src": "/png2/png23.png", matched: false},
  {"src": "/png2/png24.png", matched: false},
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceFirst, setChoiceFirst] = useState(null);
  const [choiceSecond, setChoiceSecond] = useState(null);

  const [disabled, setDisabled] = useState(false);
  const [type, setType] = useState(false);

  var cardPng = [];

  const shuffle = (typeGame) => {
    if(typeGame === 1){
      setType(false);
      cardPng = cardPngEasy;
    }else if(typeGame === 3){
      setType(true);
      cardPng = cardPngHard;
    }
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
      <button onClick={() => shuffle(1)}>Easy</button>
      <button onClick={() => shuffle(3)}>Hard</button>
      <div className={type ? "card-grid-hard" : "card-grid-easy"}>
        {cards.map(card=>(
            <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceFirst || card===choiceSecond || card.matched} disabled={disabled}/>
        ))}
      </div>
    </div>
  );
}

export default App;
