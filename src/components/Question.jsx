import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Question(props){
    return(
        <div>
            <p>{props.question}</p>
            {props.answers.map(answer => (
                <button key={uuidv4()}>{answer}</button>
            ))}
        </div>
    )
}

export default Question;