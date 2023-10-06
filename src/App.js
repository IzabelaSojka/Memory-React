import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import ModalComponent from './components/ModalComponent';

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

const cardPngMid = [
  {"src": "/png1/png1.png", matched: false},
  {"src": "/png1/png2.png", matched: false},
  {"src": "/png1/png3.png", matched: false},
  {"src": "/png1/png4.png", matched: false},
  {"src": "/png1/png5.png", matched: false},
  {"src": "/png1/png6.png", matched: false},
  {"src": "/png1/png7.png", matched: false},
  {"src": "/png1/png8.png", matched: false},
  {"src": "/png1/png9.png", matched: false},
  {"src": "/png1/png10.png", matched: false},
  {"src": "/png1/png11.png", matched: false},
  {"src": "/png1/png12.png", matched: false},
  {"src": "/png1/png13.png", matched: false},
  {"src": "/png1/png14.png", matched: false},
  {"src": "/png1/png15.png", matched: false},
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

export default function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceFirst, setChoiceFirst] = useState(null);
  const [choiceSecond, setChoiceSecond] = useState(null);

  const [disabled, setDisabled] = useState(false);
  const [type, setType] = useState(0);

  const [time, setTime] = useState(0);
  const [onTime, setOnTime] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  var cardPng = [];

  const shuffle = (typeGame) => {
    if(typeGame === 1){
      setType(1);
      cardPng = cardPngEasy;
      setScore(localStorage.getItem(1));
    }else if(typeGame === 2){
      setType(2);
      cardPng = cardPngMid;
      setScore(localStorage.getItem(2));
    }else if(typeGame === 3){
      setType(3);
      cardPng = cardPngHard;
      setScore(localStorage.getItem(3));
    }
    setDisabled(false);
    const shuffled = [...cardPng, ...cardPng]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffled);
    setTurns(0);
    setTime(0);
    setOnTime(true)
    console.log(score);
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
  }, [choiceFirst,choiceSecond, onTime, score]);

  useEffect(() => {
    let interval = null;
    if(onTime){
      interval = setInterval(() =>{
        setTime(prevTime => prevTime + 10);
        if (cards.every((card) => card.matched)) {
          setOnTime(false); 
          setIsModalOpen(true);
          
        }
      }, 10)
    }
    if(!onTime){
      if(score === 0 || score > time){
        localStorage.setItem(type, time);
      }
      console.log(onTime, time);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[onTime, cards, time, type, score])

  const resetTurns = () => {
    setChoiceFirst(null);
    setChoiceSecond(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(true);
  }

  return (
    <div className="App">
      <h1>Memory    game</h1>
      <div className="button-container"> 
        <button onClick={() => shuffle(1)}>Easy</button>
        <button onClick={() => shuffle(2)}>Medium</button>
        <button onClick={() => shuffle(3)}>Hard</button>
      </div>
      <div className="the-best">
        The best time:   
        {("0"+Math.floor((score/60000)%60)).slice(-2)}:
        {("0"+Math.floor((score/1000)%60)).slice(-2)}:
        {("0"+((score/60000)%60)).slice(-2)}
      </div>
      <div className="time">
        {("0"+Math.floor((time/60000)%60)).slice(-2)}:
        {("0"+Math.floor((time/1000)%60)).slice(-2)}:
        {("0"+((time/60000)%60)).slice(-2)}
      </div>
      <div className={(type === 1) ? "card-grid" : ((type === 3) ? "card-grid-hard" : "card-grid-mid")}>
        {cards.map(card=>(
            <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card===choiceFirst || card===choiceSecond || card.matched} disabled={disabled}/>
        ))}
      </div>
      <div className="time">Turns: {turns}</div>
      {isModalOpen && <ModalComponent time={time} onClose={() => setIsModalOpen(false)} open={isModalOpen} turns={turns}/>}
    </div>  
  );
}