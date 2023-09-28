import './Card.css'

export default function Card({card, handleChoice, flipped, disabled}){

    const handleClick = () => {
        if(!disabled){
            handleChoice(card);
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src} alt="card front"/>
              <img className="back" src="/png/background.png" onClick={handleClick} alt="card back"/>
            </div>
        </div>    
    )

}