import './Card.css'

export default function Card({card}){

    return(
        <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front"/>
              <img className="back" src="/png/background.png" alt="card back"/>
            </div>
        </div>    
    )

}