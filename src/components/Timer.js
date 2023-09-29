import { useEffect, useState } from 'react';

export default function Timer(){
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [decySeconds, setDecySeconds] = useState(0);

    var timer;

    useEffect(() => {
        timer = setInterval(() => {
            setDecySeconds(decySeconds + 1);
            if(decySeconds === 99){
                setSeconds(seconds + 1);
                setDecySeconds(0);
            }
            if(seconds === 59){
                setMinutes(minutes + 1);
                setSeconds(0);
            }
        }, 10)
    })

    return(
        <div >
            
        </div>    
    )

}

